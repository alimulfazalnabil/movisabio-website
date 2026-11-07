/**
 * MoviSabio Enterprise Career Portal Application Engine
 * Handles client-side validation, CV file verification, asynchronous secure submission,
 * reference ID presentation, and graceful failover.
 *
 * Fully accessible, WCAG 2.1 AA compliant, zero fake-success responses.
 */

(function () {
    'use strict';

    // Configurable API endpoint
    // In production or Docker, set window.MOVISABIO_CAREER_API = "https://api.movisabio.com/api/career/apply";
    const CAREER_API_ENDPOINT = window.MOVISABIO_CAREER_API || '/api/career/apply';
    const CAREER_EMAIL = "careers@movisabio.com";
    const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
    const PAGE_LOAD_TIME = Date.now();

    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function generateClientReference() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let rand = '';
        for (let i = 0; i < 5; i++) {
            rand += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `MS-CAREER-2026-${rand}`;
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
        return re.test(String(email).toLowerCase());
    }

    function getTranslation(key, fallback) {
        if (window.MoviSabioI18n && typeof window.MoviSabioI18n.t === 'function') {
            return window.MoviSabioI18n.t(key, fallback);
        }
        return fallback;
    }

    function renderInlineError(field, message) {
        if (!field) return;
        field.setAttribute('aria-invalid', 'true');
        field.classList.add('input-error');

        const parent = field.closest('.form-group') || field.parentElement;
        let errorEl = parent.querySelector('.field-error-msg');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'field-error-msg';
            errorEl.style.cssText = 'color: #ff6b6b; font-size: 0.82rem; margin-top: 6px; font-weight: 500; display: flex; align-items: center; gap: 4px;';
            parent.appendChild(errorEl);
        }
        errorEl.innerHTML = `<span>⚠</span> <span>${message}</span>`;
        errorEl.setAttribute('role', 'alert');
    }

    function clearInlineError(field) {
        if (!field) return;
        field.removeAttribute('aria-invalid');
        field.classList.remove('input-error');
        const parent = field.closest('.form-group') || field.parentElement;
        const errorEl = parent.querySelector('.field-error-msg');
        if (errorEl) {
            errorEl.remove();
        }
    }

    // Initialize CV File Drop Zone and Live Info Display
    function initFileUpload() {
        const fileInput = document.getElementById('career-cv');
        const fileInfoBox = document.getElementById('cv-file-info');
        const fileNameEl = document.getElementById('cv-file-name');
        const fileSizeEl = document.getElementById('cv-file-size');
        const dropZone = document.getElementById('cv-drop-zone');

        if (!fileInput) return;

        fileInput.addEventListener('change', function () {
            clearInlineError(fileInput);
            if (!this.files || this.files.length === 0) {
                if (fileInfoBox) fileInfoBox.style.display = 'none';
                return;
            }

            const file = this.files[0];
            const ext = file.name.split('.').pop().toLowerCase();
            const allowedExts = ['pdf', 'docx'];

            if (!allowedExts.includes(ext)) {
                renderInlineError(fileInput, 'Invalid document format. Please upload a PDF or Microsoft Word (.docx) file.');
                this.value = '';
                if (fileInfoBox) fileInfoBox.style.display = 'none';
                return;
            }

            if (file.size > MAX_FILE_SIZE_BYTES) {
                renderInlineError(fileInput, `Document exceeds maximum 5 MB limit (file size: ${formatBytes(file.size)}).`);
                this.value = '';
                if (fileInfoBox) fileInfoBox.style.display = 'none';
                return;
            }

            // Valid file selected
            if (fileInfoBox && fileNameEl && fileSizeEl) {
                fileNameEl.textContent = file.name;
                fileSizeEl.textContent = `(${formatBytes(file.size)})`;
                fileInfoBox.style.display = 'flex';
            }
        });

        // Drag & drop visuals
        if (dropZone) {
            ['dragenter', 'dragover'].forEach(eventName => {
                dropZone.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dropZone.classList.add('drop-zone-active');
                }, false);
            });

            ['dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dropZone.classList.remove('drop-zone-active');
                }, false);
            });

            dropZone.addEventListener('drop', (e) => {
                const dt = e.dataTransfer;
                if (dt.files && dt.files.length > 0) {
                    fileInput.files = dt.files;
                    const event = new Event('change', { bubbles: true });
                    fileInput.dispatchEvent(event);
                }
            });
        }
    }

    // Submit handler
    function handleCareerSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = document.getElementById('career-submit-btn');
        const statusBox = document.getElementById('career-status-box');

        // 1. Honeypot check
        const honeypot = form.querySelector('input[name="_bot_filter"]');
        if (honeypot && honeypot.value.trim() !== "") {
            console.warn("Honeypot triggered");
            return;
        }

        // 2. Submission speed check (sub-2 second rejection)
        if (Date.now() - PAGE_LOAD_TIME < 2000) {
            console.warn("Suspicious rapid submission");
            showStatusError(statusBox, 'Submission rejected: Automated submission pattern detected. Please wait a moment and try again.');
            return;
        }

        // Form Fields
        const nameField = document.getElementById('career-name');
        const emailField = document.getElementById('career-email');
        const phoneField = document.getElementById('career-phone');
        const countryField = document.getElementById('career-country');
        const cityField = document.getElementById('career-city');
        const linkedinField = document.getElementById('career-linkedin');
        const portfolioField = document.getElementById('career-portfolio');
        const githubField = document.getElementById('career-github');
        const jobTitleField = document.getElementById('career-title');
        const orgField = document.getElementById('career-org');
        const experienceField = document.getElementById('career-experience');
        const expertiseField = document.getElementById('career-expertise');
        const secondarySkillsField = document.getElementById('career-secondary-skills');
        const educationField = document.getElementById('career-education');
        const universityField = document.getElementById('career-university');
        const employmentTypeField = document.getElementById('career-employment-type');
        const positionInterestField = document.getElementById('career-position-interest');
        const salaryField = document.getElementById('career-salary');
        const availabilityField = document.getElementById('career-availability');
        const whyJoinField = document.getElementById('career-why-join');
        const additionalInfoField = document.getElementById('career-additional-info');
        const cvField = document.getElementById('career-cv');
        const consentField = document.getElementById('career-consent');

        // Clear previous inline errors
        [
            nameField, emailField, phoneField, countryField, experienceField,
            expertiseField, whyJoinField, cvField, consentField
        ].forEach(f => { if (f) clearInlineError(f); });

        let isValid = true;

        if (!nameField || !nameField.value.trim()) {
            renderInlineError(nameField, getTranslation('career_err_name', 'Full name is mandatory.'));
            isValid = false;
        }

        if (!emailField || !emailField.value.trim()) {
            renderInlineError(emailField, getTranslation('career_err_email', 'Email address is mandatory.'));
            isValid = false;
        } else if (!validateEmail(emailField.value.trim())) {
            renderInlineError(emailField, getTranslation('career_err_email_invalid', 'Please enter a valid email address.'));
            isValid = false;
        }

        if (!phoneField || !phoneField.value.trim()) {
            renderInlineError(phoneField, getTranslation('career_err_phone', 'Contact telephone number is mandatory.'));
            isValid = false;
        }

        if (!countryField || !countryField.value.trim()) {
            renderInlineError(countryField, getTranslation('career_err_country', 'Country of residence is mandatory.'));
            isValid = false;
        }

        if (!experienceField || !experienceField.value.trim()) {
            renderInlineError(experienceField, getTranslation('career_err_exp', 'Years of experience is mandatory.'));
            isValid = false;
        }

        if (!expertiseField || !expertiseField.value) {
            renderInlineError(expertiseField, getTranslation('career_err_expertise', 'Please select your primary area of expertise.'));
            isValid = false;
        }

        if (!whyJoinField || !whyJoinField.value.trim() || whyJoinField.value.trim().length < 15) {
            renderInlineError(whyJoinField, getTranslation('career_err_why', 'Please share why you want to join MoviSabio (at least 15 characters).'));
            isValid = false;
        }

        if (!cvField || !cvField.files || cvField.files.length === 0) {
            renderInlineError(cvField, getTranslation('career_err_cv', 'CV / Resume document is mandatory (PDF or DOCX, max 5 MB).'));
            isValid = false;
        }

        if (consentField && !consentField.checked) {
            renderInlineError(consentField, getTranslation('career_err_consent', 'You must confirm information accuracy and consent to data processing for recruitment purposes.'));
            isValid = false;
        }

        if (!isValid) {
            const firstError = form.querySelector('.input-error');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Prepare FormData
        const formData = new FormData();
        formData.append('name', nameField.value.trim());
        formData.append('email', emailField.value.trim());
        formData.append('phone', phoneField.value.trim());
        formData.append('country', countryField.value.trim());
        if (cityField) formData.append('city', cityField.value.trim());
        if (linkedinField) formData.append('linkedin', linkedinField.value.trim());
        if (portfolioField) formData.append('portfolio', portfolioField.value.trim());
        if (githubField) formData.append('github', githubField.value.trim());
        if (jobTitleField) formData.append('jobTitle', jobTitleField.value.trim());
        if (orgField) formData.append('organization', orgField.value.trim());
        formData.append('experience', experienceField.value.trim());
        formData.append('expertise', expertiseField.value);
        if (secondarySkillsField) formData.append('secondarySkills', secondarySkillsField.value.trim());
        if (educationField) formData.append('education', educationField.value);
        if (universityField) formData.append('university', universityField.value.trim());
        if (employmentTypeField) formData.append('employmentType', employmentTypeField.value);
        if (positionInterestField) formData.append('positionInterest', positionInterestField.value.trim());
        if (salaryField) formData.append('salary', salaryField.value.trim());
        if (availabilityField) formData.append('availability', availabilityField.value);
        formData.append('whyJoin', whyJoinField.value.trim());
        if (additionalInfoField) formData.append('additionalInfo', additionalInfoField.value.trim());
        formData.append('consent', 'true');
        formData.append('cv', cvField.files[0]);

        // Submitting State
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.setAttribute('data-original-text', submitBtn.innerHTML);
            submitBtn.innerHTML = `<span>⏳ ${getTranslation('career_submitting', 'Transmitting Candidate Application Securely...')}</span>`;
        }

        // Execute asynchronous backend transmission
        fetch(CAREER_API_ENDPOINT, {
            method: 'POST',
            body: formData
        })
        .then(async res => {
            const data = await res.json().catch(() => null);
            if (!res.ok) {
                const errMsg = (data && data.error) ? data.error : `Transmission error (HTTP ${res.status})`;
                throw new Error(errMsg);
            }
            return data;
        })
        .then(data => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = submitBtn.getAttribute('data-original-text') || 'Submit Application';
            }
            showStatusSuccess(statusBox, data.referenceId, form);
        })
        .catch(err => {
            console.error("Career backend submission error:", err);
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = submitBtn.getAttribute('data-original-text') || 'Submit Application';
            }
            // Real failure presentation — never create fake success!
            showSubmissionFailure(statusBox, err.message, {
                name: nameField.value.trim(),
                email: emailField.value.trim(),
                phone: phoneField.value.trim(),
                country: countryField.value.trim(),
                expertise: expertiseField.value,
                experience: experienceField.value.trim(),
                whyJoin: whyJoinField.value.trim()
            });
        });
    }

    function showStatusSuccess(container, refId, form) {
        if (!container) return;
        container.style.display = 'block';
        container.innerHTML = `
            <div class="career-confirmation-card" role="status" style="
                background: rgba(120, 223, 176, 0.08);
                border: 1px solid var(--accent-success, #78DFB0);
                border-radius: var(--radius-lg, 12px);
                padding: var(--space-2xl, 32px);
                margin-top: var(--space-xl, 24px);
                text-align: center;
                animation: fadeIn 0.4s ease;
            ">
                <div style="font-size: 3rem; margin-bottom: var(--space-md);">✓</div>
                <h3 style="color: var(--accent-success, #78DFB0); font-size: 1.4rem; margin-bottom: var(--space-sm); font-weight: 700;">
                    Application Received & Confirmed
                </h3>
                <p style="color: var(--text-secondary, #A7B8CA); font-size: 1rem; line-height: 1.6; max-width: 600px; margin: 0 auto var(--space-lg);">
                    Thank you for your interest in joining MoviSabio. Your profile and CV have been securely logged into our confidential talent acquisition registry.
                </p>
                <div style="
                    background: var(--bg-secondary, #0c1827);
                    border: 1px solid var(--border-subtle, #20364D);
                    border-radius: var(--radius-md, 8px);
                    padding: 12px 20px;
                    display: inline-block;
                    margin-bottom: var(--space-xl);
                ">
                    <span style="font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">
                        Application Reference ID
                    </span>
                    <strong style="font-family: var(--font-mono, monospace); font-size: 1.25rem; color: var(--accent-primary, #55D7E8);">
                        ${refId}
                    </strong>
                </div>
                <div style="color: var(--text-muted, #72849A); font-size: 0.88rem; line-height: 1.5; margin-bottom: var(--space-xl);">
                    Our technical and scientific leadership team reviews all incoming submissions. Should your background align with our active pilots or upcoming expansion grants, our team will reach out directly.
                </div>
                <div style="display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap;">
                    <a href="index.html" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px;">
                        <span>← Return to MoviSabio Homepage</span>
                    </a>
                </div>
            </div>
        `;
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        form.reset();
        const fileInfoBox = document.getElementById('cv-file-info');
        if (fileInfoBox) fileInfoBox.style.display = 'none';
    }

    function showSubmissionFailure(container, errorMessage, summary) {
        if (!container) return;
        const tempRef = generateClientReference();
        const mailSubject = encodeURIComponent(`[${tempRef}] Candidate Application - ${summary.name} (${summary.expertise})`);
        const mailBody = encodeURIComponent(
            `MoviSabio Career Portal Application\n` +
            `Reference: ${tempRef}\n` +
            `Candidate: ${summary.name}\n` +
            `Email: ${summary.email}\n` +
            `Phone: ${summary.phone}\n` +
            `Country: ${summary.country}\n` +
            `Expertise: ${summary.expertise}\n` +
            `Years of Experience: ${summary.experience}\n\n` +
            `Motivation:\n${summary.whyJoin}\n\n` +
            `[PLEASE ATTACH YOUR CV/RESUME DOCUMENT (PDF OR DOCX) TO THIS EMAIL BEFORE SENDING]\n`
        );
        const mailtoLink = `mailto:${CAREER_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

        container.style.display = 'block';
        container.innerHTML = `
            <div class="career-error-card" role="alert" style="
                background: rgba(255, 107, 107, 0.08);
                border: 1px solid #ff6b6b;
                border-radius: var(--radius-lg, 12px);
                padding: var(--space-xl, 24px);
                margin-top: var(--space-xl, 24px);
                animation: fadeIn 0.3s ease;
            ">
                <div style="display: flex; align-items: flex-start; gap: 16px;">
                    <span style="font-size: 2rem; color: #ff6b6b; line-height: 1;">⚠</span>
                    <div style="flex: 1;">
                        <h4 style="color: #ff6b6b; font-size: 1.15rem; font-weight: 700; margin: 0 0 8px 0;">
                            Transmission Notice: Direct Server Connection Unavailable
                        </h4>
                        <p style="color: var(--text-secondary, #A7B8CA); font-size: 0.95rem; line-height: 1.6; margin: 0 0 12px 0;">
                            ${errorMessage.includes('Failed to fetch') || errorMessage.includes('Network') 
                                ? 'The automated API backend is currently offline or unreachable from your network. Your input data has been safely preserved on this page.' 
                                : errorMessage}
                        </p>
                        <div style="background: var(--bg-secondary, #0c1827); border: 1px solid var(--border-subtle, #20364D); border-radius: 6px; padding: 10px 14px; margin-bottom: 16px;">
                            <span style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 2px;">Offline Reference Code:</span>
                            <code style="color: var(--accent-primary, #55D7E8); font-size: 0.95rem;">${tempRef}</code>
                        </div>
                        <p style="color: var(--text-secondary, #A7B8CA); font-size: 0.9rem; margin-bottom: 16px;">
                            You may retry submitting this form, or dispatch your application directly to our institutional recruitment desk with your CV attached:
                        </p>
                        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                            <a href="${mailtoLink}" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 8px;">
                                <span>✉ Open Email Client (Pre-Filled)</span>
                            </a>
                            <button type="button" onclick="document.getElementById('career-submit-btn').click()" class="btn btn-primary btn-sm">
                                <span>↻ Retry Transmission</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function init() {
        initFileUpload();
        const careerForm = document.getElementById('career-form');
        if (careerForm) {
            careerForm.addEventListener('submit', handleCareerSubmit);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
