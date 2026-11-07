/**
 * MoviSabio Enterprise Shared Application Runtime
 * Mobile navigation, modal dialogues, cross-page smooth scrolling, and accessibility.
 */

(function () {
    'use strict';

    // 1. Mobile Navigation Toggle
    window.toggleMobileNav = function () {
        const menu = document.getElementById('nav-menu');
        const btn = document.querySelector('.mobile-toggle-btn') || document.querySelector('.mobile-menu-btn');
        if (!menu) return;

        const isExpanded = menu.classList.contains('active') || menu.classList.contains('open');
        if (isExpanded) {
            menu.classList.remove('active', 'open');
            if (btn) btn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        } else {
            menu.classList.add('active', 'open');
            if (btn) btn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    };

    // Close mobile nav when clicking a link or dropdown item (excluding dropdown toggles)
    document.addEventListener('click', function (e) {
        const link = e.target.closest('.nav-link, .dropdown-item');
        if (link && !link.classList.contains('dropdown-toggle')) {
            const menu = document.getElementById('nav-menu');
            const btn = document.querySelector('.mobile-toggle-btn') || document.querySelector('.mobile-menu-btn');
            if (menu && (menu.classList.contains('active') || menu.classList.contains('open'))) {
                menu.classList.remove('active', 'open');
                if (btn) btn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Dropdown toggle handling (touch & click accessible)
    document.addEventListener('click', function (e) {
        const toggle = e.target.closest('.dropdown-toggle');
        const dropdown = toggle ? toggle.closest('.nav-item-dropdown') : null;

        // Close other dropdowns
        document.querySelectorAll('.nav-item-dropdown.active').forEach(function (item) {
            if (item !== dropdown) {
                item.classList.remove('active');
                const b = item.querySelector('.dropdown-toggle');
                if (b) b.setAttribute('aria-expanded', 'false');
            }
        });

        if (toggle && dropdown) {
            e.preventDefault();
            const isOpen = dropdown.classList.toggle('active');
            toggle.setAttribute('aria-expanded', String(isOpen));
        } else if (!dropdown) {
            // Click outside closes dropdowns
            document.querySelectorAll('.nav-item-dropdown.active').forEach(function (item) {
                item.classList.remove('active');
                const b = item.querySelector('.dropdown-toggle');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
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
            document.querySelectorAll('.nav-item-dropdown.active').forEach(function (item) {
                item.classList.remove('active');
                const b = item.querySelector('.dropdown-toggle');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
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
