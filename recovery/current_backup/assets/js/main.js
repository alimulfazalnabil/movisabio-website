/**
 * MoviSabio Enterprise Shared Application Runtime
 * Mobile navigation, modal dialogues, cross-page smooth scrolling, and accessibility.
 */

(function () {
    'use strict';

    // 1. Mobile Navigation Toggle
    window.toggleMobileNav = function () {
        const menu = document.getElementById('nav-menu');
        const btn = document.querySelector('.mobile-toggle-btn');
        if (!menu) return;

        const isExpanded = menu.classList.contains('active');
        if (isExpanded) {
            menu.classList.remove('active');
            if (btn) btn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        } else {
            menu.classList.add('active');
            if (btn) btn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    };

    // Close mobile nav when clicking a link
    document.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('nav-link')) {
            const menu = document.getElementById('nav-menu');
            const btn = document.querySelector('.mobile-toggle-btn');
            if (menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
                if (btn) btn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // 2. Cross-Page Smart Scroll / Redirect
    window.scrollToSection = function (sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        } else {
            // If on a sub-page, navigate to homepage section
            window.location.href = `index.html#${sectionId}`;
        }
    };

    // 3. Modals & Dialogues (ESC key & backdrop close)
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (typeof window.closeVideoModal === 'function') window.closeVideoModal();
            if (typeof window.closeLeaderModal === 'function') window.closeLeaderModal();
            const modals = document.querySelectorAll('.modal-enterprise.active');
            modals.forEach(m => m.classList.remove('active'));
            document.body.style.overflow = 'auto';
        }
    });

    // Backdrop click delegator
    window.handleBackdropClick = function (event, modalId) {
        if (event.target && event.target.id === modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (modalId === 'video-modal' && typeof window.closeVideoModal === 'function') {
                window.closeVideoModal();
            }
        }
    };

})();
