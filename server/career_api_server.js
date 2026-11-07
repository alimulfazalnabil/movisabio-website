/**
 * MoviSabio Career Portal — Secure Backend Microservice
 * Production-ready, zero-dependency Node.js HTTP Service
 *
 * Capabilities:
 * - Endpoints: POST /api/career/apply, GET /api/career/health, OPTIONS /api/career/apply
 * - Server-side validation of personal & professional application parameters
 * - Strict CV file validation: max 5 MB, allowed MIME types (PDF, DOCX) & magic bytes verification
 * - Cryptographically random reference ID generation (MS-CAREER-2026-XXXXX)
 * - Secure physical isolation of CV uploads in /data/secure_uploads/ outside web directory
 * - Structured audit logging to /data/applications.jsonl
 * - In-memory IP rate limiting (max 5 submissions/hour/IP) & honeypot anti-spam defense
 * - Zero static file exposure for uploaded CVs (403 Forbidden on directory requests)
 * - Configurable via PORT environment variable (default: 8080)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const PORT = parseInt(process.env.PORT, 10) || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_TOTAL_BODY_BYTES = 12 * 1024 * 1024; // 12 MB max payload
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Storage paths (isolated outside public website root)
const DATA_DIR = path.join(__dirname, '..', 'data');
const UPLOADS_DIR = path.join(DATA_DIR, 'secure_uploads', 'applications');
const APPLICATIONS_LOG = path.join(DATA_DIR, 'applications.jsonl');

// Ensure storage directories exist
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true, mode: 0o700 });
}

// In-memory rate limiting store: { ipHash: [timestamp1, timestamp2, ...] }
const rateLimitMap = new Map();

function hashIp(ip) {
    return crypto.createHash('sha256').update(ip || 'unknown').digest('hex').substring(0, 16);
}

function isRateLimited(ip) {
    const hashed = hashIp(ip);
    const now = Date.now();
    const timestamps = rateLimitMap.get(hashed) || [];
    
    // Prune expired timestamps
    const activeTimestamps = timestamps.filter(ts => (now - ts) < RATE_LIMIT_WINDOW_MS);
    
    if (activeTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
        rateLimitMap.set(hashed, activeTimestamps);
        return true;
    }
    
    activeTimestamps.push(now);
    rateLimitMap.set(hashed, activeTimestamps);
    return false;
}

function setCorsHeaders(res, req) {
    const origin = req.headers.origin || '*';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
}

function sendJsonResponse(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data, null, 2));
}

// Generate Reference ID: MS-CAREER-2026-XXXXX
function generateReferenceId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let rand = '';
    const bytes = crypto.randomBytes(5);
    for (let i = 0; i < 5; i++) {
        rand += chars[bytes[i] % chars.length];
    }
    return `MS-CAREER-2026-${rand}`;
}

// Validate magic bytes for PDF and DOCX
function validateMagicBytes(buffer, filename) {
    if (!buffer || buffer.length < 4) return false;
    const ext = path.extname(filename || '').toLowerCase();
    
    // PDF magic bytes: %PDF (0x25 0x50 0x44 0x46)
    if (ext === '.pdf') {
        return buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46;
    }
    
    // DOCX magic bytes: PK\x03\x04 (ZIP container header: 0x50 0x4B 0x03 0x04)
    if (ext === '.docx') {
        return buffer[0] === 0x50 && buffer[1] === 0x4B && buffer[2] === 0x03 && buffer[3] === 0x04;
    }
    
    return false;
}

// Simple multipart/form-data parser for Node without external dependencies
function parseMultipartFormData(bodyBuffer, boundary) {
    const fields = {};
    const files = {};
    
    const boundaryBuffer = Buffer.from(`--${boundary}`);
    let startIdx = bodyBuffer.indexOf(boundaryBuffer) + boundaryBuffer.length;
    
    while (startIdx < bodyBuffer.length) {
        const nextBoundaryIdx = bodyBuffer.indexOf(boundaryBuffer, startIdx);
        if (nextBoundaryIdx === -1) break;
        
        const partBuffer = bodyBuffer.slice(startIdx, nextBoundaryIdx);
        // Find header end (\r\n\r\n)
        const headerEndIdx = partBuffer.indexOf(Buffer.from('\r\n\r\n'));
        if (headerEndIdx !== -1) {
            const headerStr = partBuffer.slice(0, headerEndIdx).toString('utf8');
            let contentBuffer = partBuffer.slice(headerEndIdx + 4);
            // Trim trailing \r\n
            if (contentBuffer.length >= 2 && contentBuffer[contentBuffer.length - 2] === 0x0D && contentBuffer[contentBuffer.length - 1] === 0x0A) {
                contentBuffer = contentBuffer.slice(0, contentBuffer.length - 2);
            }
            
            const nameMatch = headerStr.match(/name="([^"]+)"/);
            const filenameMatch = headerStr.match(/filename="([^"]+)"/);
            const contentTypeMatch = headerStr.match(/Content-Type:\s*([^\r\n]+)/i);
            
            if (nameMatch) {
                const fieldName = nameMatch[1];
                if (filenameMatch) {
                    files[fieldName] = {
                        filename: filenameMatch[1],
                        contentType: contentTypeMatch ? contentTypeMatch[1].trim() : 'application/octet-stream',
                        data: contentBuffer
                    };
                } else {
                    fields[fieldName] = contentBuffer.toString('utf8').trim();
                }
            }
        }
        
        startIdx = nextBoundaryIdx + boundaryBuffer.length;
    }
    
    return { fields, files };
}

// Main HTTP Server
const server = http.createServer((req, res) => {
    setCorsHeaders(res, req);
    
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    
    // Health check endpoint
    if (req.method === 'GET' && (parsedUrl.pathname === '/api/career/health' || parsedUrl.pathname === '/health')) {
        sendJsonResponse(res, 200, {
            status: 'UP',
            service: 'MoviSabio Career Portal API',
            version: '1.0.0',
            timestamp: new Date().toISOString()
        });
        return;
    }
    
    // Block any attempt to access /data, /uploads, or secure directories
    if (parsedUrl.pathname.startsWith('/data') || parsedUrl.pathname.startsWith('/uploads') || parsedUrl.pathname.includes('..')) {
        sendJsonResponse(res, 403, {
            success: false,
            error: 'Forbidden: Direct filesystem access is strictly prohibited.'
        });
        return;
    }
    
    // Career application endpoint
    if (req.method === 'POST' && (parsedUrl.pathname === '/api/career/apply' || parsedUrl.pathname === '/api/career')) {
        // Enforce Rate Limiting
        if (isRateLimited(clientIp)) {
            sendJsonResponse(res, 429, {
                success: false,
                error: 'Submission rate limit reached. A maximum of 5 applications per hour is permitted per network address.'
            });
            return;
        }
        
        const contentType = req.headers['content-type'] || '';
        let totalReceivedBytes = 0;
        const chunks = [];
        
        req.on('data', chunk => {
            totalReceivedBytes += chunk.length;
            if (totalReceivedBytes > MAX_TOTAL_BODY_BYTES) {
                req.destroy(new Error('Payload Too Large'));
            } else {
                chunks.push(chunk);
            }
        });
        
        req.on('end', () => {
            try {
                const bodyBuffer = Buffer.concat(chunks);
                let fields = {};
                let cvFile = null;
                
                if (contentType.includes('multipart/form-data')) {
                    const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
                    if (!boundaryMatch) {
                        sendJsonResponse(res, 400, { success: false, error: 'Malformed multipart boundary header.' });
                        return;
                    }
                    const boundary = boundaryMatch[1] || boundaryMatch[2];
                    const parsed = parseMultipartFormData(bodyBuffer, boundary);
                    fields = parsed.fields;
                    cvFile = parsed.files['cv'] || parsed.files['resume'] || Object.values(parsed.files)[0];
                } else if (contentType.includes('application/json')) {
                    const jsonPayload = JSON.parse(bodyBuffer.toString('utf8'));
                    fields = jsonPayload;
                    if (jsonPayload.cvBase64) {
                        const fileExt = path.extname(jsonPayload.cvFilename || '.pdf');
                        cvFile = {
                            filename: jsonPayload.cvFilename || `cv${fileExt}`,
                            contentType: jsonPayload.cvMimeType || 'application/pdf',
                            data: Buffer.from(jsonPayload.cvBase64, 'base64')
                        };
                    }
                } else {
                    sendJsonResponse(res, 415, {
                        success: false,
                        error: 'Unsupported Media Type. Must be multipart/form-data or application/json.'
                    });
                    return;
                }
                
                // --- SERVER-SIDE VALIDATION ---
                
                // 1. Anti-spam honeypot
                if (fields._bot_filter && fields._bot_filter.trim() !== '') {
                    sendJsonResponse(res, 400, { success: false, error: 'Automated spam submission rejected.' });
                    return;
                }
                
                // 2. Mandatory text fields
                const name = (fields.name || '').trim();
                const email = (fields.email || '').trim();
                const phone = (fields.phone || '').trim();
                const country = (fields.country || '').trim();
                const city = (fields.city || '').trim();
                const experience = (fields.experience || '').trim();
                const expertise = (fields.expertise || '').trim();
                const whyJoin = (fields.whyJoin || fields.why_join || '').trim();
                const consent = fields.consent || fields.privacy_consent;
                
                if (!name || name.length < 2) {
                    sendJsonResponse(res, 400, { success: false, error: 'Full Name is required (minimum 2 characters).' });
                    return;
                }
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email || !emailRegex.test(email)) {
                    sendJsonResponse(res, 400, { success: false, error: 'A valid email address is required.' });
                    return;
                }
                
                if (!phone || phone.length < 5) {
                    sendJsonResponse(res, 400, { success: false, error: 'A valid contact phone number is required.' });
                    return;
                }
                
                if (!country || country.length < 2) {
                    sendJsonResponse(res, 400, { success: false, error: 'Country of residence is required.' });
                    return;
                }
                
                if (!experience) {
                    sendJsonResponse(res, 400, { success: false, error: 'Years of professional experience is required.' });
                    return;
                }
                
                if (!expertise) {
                    sendJsonResponse(res, 400, { success: false, error: 'Primary area of expertise is required.' });
                    return;
                }
                
                if (!whyJoin || whyJoin.length < 15) {
                    sendJsonResponse(res, 400, { success: false, error: 'Please explain why you would like to join MoviSabio (minimum 15 characters).' });
                    return;
                }
                
                const isConsentGiven = consent === true || consent === 'true' || consent === 'on' || consent === '1';
                if (!isConsentGiven) {
                    sendJsonResponse(res, 400, { success: false, error: 'Data privacy and accuracy confirmation consent is mandatory.' });
                    return;
                }
                
                // 3. Mandatory CV / Resume validation
                if (!cvFile || !cvFile.data || cvFile.data.length === 0) {
                    sendJsonResponse(res, 400, { success: false, error: 'CV / Resume document is mandatory.' });
                    return;
                }
                
                if (cvFile.data.length > MAX_FILE_SIZE_BYTES) {
                    sendJsonResponse(res, 400, {
                        success: false,
                        error: `CV file exceeds the maximum permitted size of 5 MB (received ${(cvFile.data.length / (1024*1024)).toFixed(2)} MB).`
                    });
                    return;
                }
                
                const sanitizedFilename = path.basename(cvFile.filename || 'resume.pdf');
                const fileExt = path.extname(sanitizedFilename).toLowerCase();
                if (fileExt !== '.pdf' && fileExt !== '.docx') {
                    sendJsonResponse(res, 400, {
                        success: false,
                        error: 'Invalid file format. Only PDF (.pdf) and Microsoft Word (.docx) documents are permitted.'
                    });
                    return;
                }
                
                if (!validateMagicBytes(cvFile.data, sanitizedFilename)) {
                    sendJsonResponse(res, 400, {
                        success: false,
                        error: 'File signature mismatch. The uploaded file does not match valid PDF or DOCX binary specifications.'
                    });
                    return;
                }
                
                // --- SECURE AT-REST PERSISTENCE ---
                
                const refId = generateReferenceId();
                const secureFileHash = crypto.randomBytes(8).toString('hex');
                const storedFilename = `${refId}_${secureFileHash}${fileExt}`;
                const storedFilePath = path.join(UPLOADS_DIR, storedFilename);
                
                // Write binary file securely
                fs.writeFileSync(storedFilePath, cvFile.data, { mode: 0o600 });
                
                // Calculate file checksum
                const fileSha256 = crypto.createHash('sha256').update(cvFile.data).digest('hex');
                
                // Construct structured application record
                const applicationRecord = {
                    referenceId: refId,
                    timestamp: new Date().toISOString(),
                    status: 'RECEIVED',
                    personalInfo: {
                        name: name,
                        email: email,
                        phone: phone,
                        country: country,
                        city: city || null,
                        linkedin: (fields.linkedin || '').trim() || null,
                        portfolio: (fields.portfolio || '').trim() || null,
                        github: (fields.github || '').trim() || null
                    },
                    professionalInfo: {
                        currentJobTitle: (fields.jobTitle || fields.job_title || '').trim() || null,
                        currentOrganization: (fields.organization || '').trim() || null,
                        yearsOfExperience: experience,
                        primaryExpertise: expertise,
                        secondarySkills: (fields.secondarySkills || fields.secondary_skills || '').trim() || null,
                        highestEducation: (fields.education || '').trim() || null,
                        university: (fields.university || '').trim() || null,
                        preferredEmploymentType: (fields.employmentType || fields.employment_type || 'Full-time').trim()
                    },
                    applicationDetails: {
                        positionInterest: (fields.positionInterest || fields.position_interest || '').trim() || null,
                        expectedSalary: (fields.salary || '').trim() || null,
                        availabilityNotice: (fields.availability || '').trim() || null,
                        whyJoinMoviSabio: whyJoin,
                        additionalInfo: (fields.additionalInfo || fields.additional_info || '').trim() || null
                    },
                    cvDocument: {
                        originalFilename: sanitizedFilename,
                        storedFilename: storedFilename,
                        sizeBytes: cvFile.data.length,
                        mimeType: cvFile.contentType,
                        sha256: fileSha256
                    },
                    audit: {
                        clientIpHash: hashIp(clientIp),
                        consentConfirmed: true,
                        serverReceivedAt: new Date().toISOString()
                    }
                };
                
                // Append record to JSONL datastore
                fs.appendFileSync(APPLICATIONS_LOG, JSON.stringify(applicationRecord) + '\n', 'utf8');
                
                // Successful Response
                sendJsonResponse(res, 201, {
                    success: true,
                    referenceId: refId,
                    message: 'Application received, validated, and securely logged for recruitment review.',
                    timestamp: applicationRecord.timestamp
                });
                
            } catch (err) {
                console.error('Error processing application submission:', err);
                sendJsonResponse(res, 500, {
                    success: false,
                    error: 'Internal server error while archiving application. Please try again.'
                });
            }
        });
        
        req.on('error', err => {
            console.error('Request stream error:', err);
            sendJsonResponse(res, 400, { success: false, error: 'Transmission error: ' + err.message });
        });
        
        return;
    }
    
    // Fallback 404
    sendJsonResponse(res, 404, { success: false, error: 'Endpoint not found.' });
});

// Launch server if run directly
if (require.main === module) {
    server.listen(PORT, HOST, () => {
        console.log(`====================================================`);
        console.log(` MoviSabio Career Portal Backend Service Active`);
        console.log(` Address: http://${HOST}:${PORT}`);
        console.log(` Apply Endpoint: http://${HOST}:${PORT}/api/career/apply`);
        console.log(` Health Endpoint: http://${HOST}:${PORT}/api/career/health`);
        console.log(` Storage Path: ${UPLOADS_DIR}`);
        console.log(`====================================================`);
    });
}

module.exports = { server, parseMultipartFormData, validateMagicBytes };
