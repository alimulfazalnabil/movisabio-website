# MoviSabio Career Portal — Backend Architecture & Integration Specification

**Document ID:** `MOVI-CAREER-SPEC-2026-01`  
**Parent System:** MoviSabio Territorial Intelligence Platform  
**Target Module:** Career Portal & Candidate Talent Acquisition Gateway  
**Date:** November 2026  
**Status:** Implemented & Verified Microservice  

---

## 1. Executive Summary

This document specifies the backend architecture, security controls, server-side validation rules, file isolation procedures, and production deployment options for the MoviSabio Career Portal (`career.html`).

Prior to this implementation, the MoviSabio website operated as a purely static GitHub Pages repository with client-side forms falling back to direct institutional mailto channels. To satisfy enterprise security, GDPR/LGPD compliance, and recruitment confidentiality without exposing applicant CVs through public URLs, this specification establishes:

1. **A Standalone, Zero-Dependency Node.js Microservice** (`server/career_api_server.js`).
2. **Server-Side Validation Engine** enforcing file-type magic bytes, byte-size caps, and mandatory fields.
3. **Isolated Cryptographic Storage** storing candidate CV documents and audit logs outside the public web root.
4. **Anti-Spam & Rate Limiting Controls** preventing automated bot submissions and denial-of-service attempts.
5. **Production Deployment Topologies** across Docker, Cloudflare Workers, and cloud serverless architectures.

---

## 2. Infrastructure Inventory & Missing Components Analysis

| Infrastructure Component | Pre-Implementation State | Implemented / Proposed Solution |
|:---|:---|:---|
| **Hosting Platform** | GitHub Pages (`www.movisabio.com`) | Static web frontend hosted via CDN / GitHub Pages |
| **API Gateway** | None in repository | Native HTTP microservice (`server/career_api_server.js`) |
| **CV File Storage** | None (public web root only) | Isolated `/data/secure_uploads/applications/` outside web root |
| **Application Database** | None | Append-only structured JSONL datastore (`/data/applications.jsonl`) |
| **File Verification** | None | Binary magic bytes verification (`%PDF-`, `PK\x03\x04`) |
| **Rate Limiting** | None | In-memory token bucket (5 requests/hour/IP) + IP hashing |
| **Spam Defense** | Basic client-side timer | Dual honeypot (`_bot_filter`) + minimum 2-second client latency |

---

## 3. Microservice API Specification

### Endpoint: `POST /api/career/apply`

Accepts candidate applications via either `multipart/form-data` (standard browser file upload) or `application/json` (base64-encoded CV).

#### Request Headers:
- `Content-Type: multipart/form-data; boundary=...` or `application/json`
- `Accept: application/json`

#### Form Fields:
| Field Identifier | Type | Required? | Validation Rules | Description |
|:---|:---|:---:|:---|:---|
| `name` | String | **Yes** | Min 2 chars, sanitized | Candidate full name |
| `email` | String | **Yes** | RFC 5322 email regex | Primary contact email |
| `phone` | String | **Yes** | Min 5 chars, digits/plus | Contact telephone |
| `country` | String | **Yes** | Min 2 chars | Country of residence |
| `city` | String | No | Sanitized | City / Municipality |
| `linkedin` | URL | No | Valid URL | LinkedIn profile |
| `portfolio` | URL | No | Valid URL | Portfolio / Personal website |
| `github` | URL | No | Valid URL | GitHub / GitLab profile |
| `jobTitle` | String | No | Sanitized | Current professional title |
| `organization` | String | No | Sanitized | Current employer / university |
| `experience` | Number | **Yes** | $\ge 0$ | Years of experience |
| `expertise` | String | **Yes** | Allowed areas list | Primary discipline |
| `secondarySkills` | String | No | Sanitized | Secondary technical skills |
| `education` | String | No | Sanitized | Highest academic degree |
| `university` | String | No | Sanitized | Academic institution |
| `employmentType` | String | No | Full-time/Part-time/etc. | Preferred work format |
| `positionInterest`| String | No | Sanitized | Specific role target |
| `salary` | String | No | Sanitized | Compensation expectation |
| `availability` | String | No | Sanitized | Notice period / availability |
| `whyJoin` | String | **Yes** | Min 15 chars | Statement of motivation |
| `additionalInfo` | String | No | Sanitized | Research notes / patents |
| `consent` | Boolean| **Yes** | Must be `true` | Data processing confirmation |
| `cv` (file) | Binary | **Yes** | Max 5 MB, PDF/DOCX only | Resume document |
| `_bot_filter` | String | No | Must be empty | Anti-spam honeypot |

#### Success Response (`201 Created`):
```json
{
  "success": true,
  "referenceId": "MS-CAREER-2026-X87CF",
  "message": "Application received, validated, and securely logged for recruitment review.",
  "timestamp": "2026-11-08T03:10:00.000Z"
}
```

#### Error Response (`400 Bad Request` / `429 Too Many Requests`):
```json
{
  "success": false,
  "error": "CV file exceeds the maximum permitted size of 5 MB."
}
```

---

## 4. Security & Compliance Controls

### 4.1 Strict File Isolation
- Uploaded CV files are **never written to publicly accessible directories**.
- Files are saved directly to `data/secure_uploads/applications/` with randomized cryptographic filenames:
  `${refId}_${crypto.randomBytes(8).toString('hex')}.pdf`
- Operating system file permissions are initialized to `0o600` (read/write only by the application process owner).
- Direct HTTP requests to `/data/*` or `/uploads/*` return `403 Forbidden`.

### 4.2 Binary Magic Bytes Verification
File extensions can be spoofed; therefore, the server inspects the first 4 bytes of every uploaded file:
- **PDF Documents:** Must begin with `%PDF` (`0x25 0x50 0x44 0x46`).
- **DOCX Documents:** Must begin with `PK\x03\x04` (`0x50 0x4B 0x03 0x04` - OpenXML ZIP container).
Any file failing magic bytes verification is rejected immediately with HTTP 400.

### 4.3 Git Data Leakage Prevention
The repository `.gitignore` explicitly excludes:
```gitignore
data/
uploads/
```
Ensuring candidate personal data and resumes cannot be committed to source control.

### 4.4 GDPR & Brazilian LGPD Compliance
- **Consent Gate:** Submissions require explicit user affirmation before processing.
- **Data Minimization:** Only relevant professional credentials and contact details are collected.
- **Privacy Notice:** Transparent declaration that profiles are retained strictly for recruitment consideration.

---

## 5. Running the Microservice Locally

### Development / Local Execution:
```bash
# Launch on default port 8080:
node server/career_api_server.js

# Launch on custom port:
PORT=3001 node server/career_api_server.js
```

### Health Verification:
```bash
curl http://localhost:8080/api/career/health
```

---

## 6. Production Deployment Architectures

### Option A: Co-located Docker Container (Recommended alongside OSIRIS)
Deploy as a lightweight Node.js Alpine container orchestrated via `docker-compose.yml`:
```yaml
services:
  career-api:
    image: node:22-alpine
    restart: unless-stopped
    working_dir: /app
    volumes:
      - ./server:/app/server:ro
      - ./data:/app/data:rw
    command: ["node", "server/career_api_server.js"]
    environment:
      - PORT=8080
      - HOST=0.0.0.0
    ports:
      - "8080:8080"
```

### Option B: Cloudflare Workers + R2 Bucket (Serverless Edge)
- Route `https://www.movisabio.com/api/career/apply` to a Cloudflare Worker.
- Stream candidate CV files directly to a private Cloudflare R2 bucket (`movisabio-applicant-cvs`).
- Write metadata to Cloudflare D1 (serverless SQLite) or dispatch webhook notifications to the MoviSabio recruitment Slack/Discord channel.

### Option C: AWS Lambda + Amazon S3
- API Gateway endpoint routes to an AWS Lambda function running Node.js.
- CV files are written to a private S3 bucket with server-side KMS encryption (`aws:kms`) and a 180-day lifecycle expiration rule.
