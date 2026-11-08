/**
 * MOVISABIO — HOMEPAGE PHOTO & VIDEO SHOWCASE SLIDER
 * Continuous Right-to-Left Infinite Showcase Engine
 * 
 * Implements smooth right-to-left marquee motion (25–35 px/sec),
 * infinite seamless wrapping, hover pause, mouse drag, touch swipe,
 * keyboard controls, video modal playback, and photo lightbox.
 */

(function () {
    'use strict';

    // --- 1. MEDIA SHOWCASE DATASET ---
    const SHOWCASE_PROJECTS = [
        {
            id: 1,
            title: "AI Traffic Signal Demo - Campinas",
            category: "Flagship Simulation",
            location: "Campinas, Brazil 🇧🇷",
            date: "March 2026",
            description: "Watch our AI-powered traffic signal coordination system in action at Campinas, Brazil. Cuts corridor delays by up to 45% using Deep Reinforcement Learning while strictly maintaining classical MAXBAND safety bounds.",
            image: "AI Traffic Coordination at Sunset.png",
            alt: "AI-powered adaptive traffic signal coordination in Campinas at sunset",
            type: "video",
            youtubeId: "4Gexo2-tHFs",
            localVideo: "AI Traffic Signal.mp4",
            badgeColor: "#78DFB0",
            badgeBg: "rgba(120, 223, 176, 0.15)",
            badgeBorder: "rgba(120, 223, 176, 0.4)"
        },
        {
            id: 2,
            title: "Digital Twin Technology Explanation",
            category: "3D Digital Twin",
            location: "OpenStreetMap & Sensor Mesh 🌐",
            date: "February 2026",
            description: "Learn how MoviSabio builds highly accurate digital twins using OpenStreetMap data and municipal sensors to predict traffic flow patterns and optimize signal timing in real-time.",
            image: "MoviSabio GIS Command Centre.png",
            alt: "3D digital twin simulation and municipal GIS command visualization",
            type: "video",
            youtubeId: "",
            localVideo: "",
            badgeColor: "#55D7E8",
            badgeBg: "rgba(85, 215, 232, 0.15)",
            badgeBorder: "rgba(85, 215, 232, 0.4)"
        },
        {
            id: 3,
            title: "Montevideo Pilot Benchmark",
            category: "Transit Signal Priority",
            location: "Montevideo, Uruguay 🇺🇾",
            date: "January 2026",
            description: "SUMO-based municipal corridor simulation and transit signal priority benchmarking in Montevideo, Uruguay. Models arterial transit grids for bus headway optimization.",
            image: "Smart BRT City Mobility Dashboard.png",
            alt: "SUMO municipal corridor simulation and BRT transit priority dashboard",
            type: "photo",
            youtubeId: "",
            localVideo: "",
            badgeColor: "#6C9CFF",
            badgeBg: "rgba(108, 156, 255, 0.15)",
            badgeBorder: "rgba(108, 156, 255, 0.4)"
        },
        {
            id: 4,
            title: "Computer Vision Vehicle Detection",
            category: "Edge AI Vision",
            location: "CCTV Camera Mesh 👁️",
            date: "December 2025",
            description: "YOLOv8-based vehicle detection and traffic density monitoring using CCTV feeds. Processes real-time camera streams for vehicle classification, counting, and standing queue estimation.",
            image: "MoviSabio Smart City Detection.png",
            alt: "YOLOv8 edge computer vision vehicle detection, classification and density tracking",
            type: "video",
            youtubeId: "",
            localVideo: "",
            badgeColor: "#F5B842",
            badgeBg: "rgba(245, 184, 66, 0.15)",
            badgeBorder: "rgba(245, 184, 66, 0.4)"
        },
        {
            id: 5,
            title: "Sustainability & ESG Impact",
            category: "Climate & ESG Analytics",
            location: "Urban Climate Action 🌱",
            date: "November 2025",
            description: "MoviSabio's contribution to sustainable urban mobility and UN Sustainable Development Goals 11 and 13 through reduced idling emissions and automated low-emission zone monitoring.",
            image: "MoviSabio Sustainable Smart City at Sunset.png",
            alt: "Sustainable smart city corridor at sunset highlighting UN SDG 11 and 13 impact",
            type: "photo",
            youtubeId: "",
            localVideo: "",
            badgeColor: "#78DFB0",
            badgeBg: "rgba(120, 223, 176, 0.15)",
            badgeBorder: "rgba(120, 223, 176, 0.4)"
        },
        {
            id: 6,
            title: "Executive Leadership Introduction",
            category: "Leadership & Vision",
            location: "Corporate Leadership 🏛️",
            date: "October 2025",
            description: "Meet the engineering leadership behind MoviSabio and our vision for intelligent territorial infrastructure, multi-agent AI, and quantum-ready urban computing ecosystems.",
            image: "MoviSabio Leadership Team Overview.png",
            alt: "MoviSabio executive leadership team and territorial infrastructure vision",
            type: "video",
            youtubeId: "",
            localVideo: "",
            badgeColor: "#E01E5A",
            badgeBg: "rgba(224, 30, 90, 0.15)",
            badgeBorder: "rgba(224, 30, 90, 0.4)"
        }
    ];

    // --- 2. ENGINE STATE VARIABLES ---
    let trackEl = null;
    let viewportEl = null;
    let playPauseBtn = null;
    let statusTextEl = null;
    let statusDotEl = null;

    let currentOffset = 0;
    let singleSetWidth = 0;
    let speed = 30; // 30 pixels per second (user specified 25–35 px/sec)
    let isPlaying = true;
    let isHovered = false;
    let isDragging = false;
    let isModalOpen = false;

    let lastTimestamp = null;
    let animFrameId = null;

    // Pointer / Drag State
    let pointerStartX = 0;
    let pointerInitialOffset = 0;
    let isPointerDown = false;
    let dragThresholdExceeded = false;

    // Reduced Motion Detection
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- 3. DOM READY INITIALIZATION ---
    document.addEventListener('DOMContentLoaded', initMediaShowcase);

    function initMediaShowcase() {
        trackEl = document.getElementById('media-showcase-track');
        viewportEl = document.getElementById('media-showcase-viewport');
        playPauseBtn = document.getElementById('showcase-play-pause-btn');
        statusTextEl = document.getElementById('showcase-status-text');
        statusDotEl = document.getElementById('showcase-status-dot');

        if (!trackEl || !viewportEl) return;

        // Render card sets (2 identical sets for continuous infinite wrap)
        renderShowcaseCards();

        // Calculate dimensions
        measureTrackDimensions();
        window.addEventListener('resize', measureTrackDimensions);

        // Check reduced motion
        if (prefersReducedMotion) {
            isPlaying = false;
            updatePlayPauseButtonUI();
        }

        // Event Listeners: Hover Pause / Resume
        viewportEl.addEventListener('mouseenter', () => { isHovered = true; });
        viewportEl.addEventListener('mouseleave', () => { isHovered = false; });

        // Event Listeners: Navigation Controls
        const prevBtn = document.getElementById('showcase-prev-btn');
        const nextBtn = document.getElementById('showcase-next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                stepSlide(-1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                stepSlide(1);
            });
        }

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleShowcasePlayPause();
            });
        }

        // Pointer / Touch Drag Gestures
        initDragGestures();

        // Keyboard Navigation (ArrowLeft / ArrowRight / Space to toggle)
        viewportEl.setAttribute('tabindex', '0');
        viewportEl.setAttribute('role', 'region');
        viewportEl.setAttribute('aria-roledescription', 'carousel');
        viewportEl.setAttribute('aria-label', 'Project Media Showcase Continuous Carousel');

        viewportEl.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                stepSlide(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                stepSlide(1);
            } else if (e.key === ' ' && document.activeElement === viewportEl) {
                e.preventDefault();
                toggleShowcasePlayPause();
            }
        });

        // Start Animation Loop
        lastTimestamp = performance.now();
        animFrameId = requestAnimationFrame(animationLoop);
    }

    // --- 4. RENDER SHOWCASE CARDS (DUPLICATED FOR INFINITE LOOP) ---
    function renderShowcaseCards() {
        trackEl.innerHTML = '';

        // Generate 2 sets of identical cards to seamlessly loop
        const fullList = [...SHOWCASE_PROJECTS, ...SHOWCASE_PROJECTS];

        fullList.forEach((item, index) => {
            const card = document.createElement('article');
            card.className = 'media-showcase-card';
            card.setAttribute('data-id', item.id);
            card.setAttribute('role', 'group');
            card.setAttribute('aria-roledescription', 'slide');
            card.setAttribute('aria-label', `${item.title} (${item.date})`);

            const isVideo = item.type === 'video' || item.youtubeId || item.localVideo;
            const primaryActionText = isVideo ? 'Watch Video ▶' : 'View Photo 🔍';

            card.innerHTML = `
                <div class="media-card-thumbnail-wrap" onclick="window.MoviSabioShowcase.handleCardMediaClick(event, ${item.id})" tabindex="0" role="button" aria-label="Open ${item.title} ${isVideo ? 'video' : 'photograph'}">
                    <img src="${item.image}" alt="${item.alt}" class="media-card-img" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='Smart City Mobility Collage.png';">
                    
                    ${isVideo ? `
                    <div class="media-card-play-overlay">
                        <div class="media-play-pill" title="Play demonstration video">▶</div>
                    </div>` : ''}

                    <div class="media-card-badge-top-left">
                        <span class="media-badge-pill" style="background: ${item.badgeBg}; color: ${item.badgeColor}; border: 1px solid ${item.badgeBorder};">
                            ${item.category}
                        </span>
                    </div>

                    <div class="media-card-badge-top-right">
                        <span class="media-badge-pill" style="background: rgba(10, 3, 20, 0.75); color: #FFFFFF; border: 1px solid rgba(255, 255, 255, 0.2);">
                            ${isVideo ? '📹 Video' : '📷 Photo'}
                        </span>
                    </div>
                </div>

                <div class="media-card-body">
                    <div class="media-card-meta">
                        <span class="media-card-date">📅 ${item.date}</span>
                        <span>${item.location}</span>
                    </div>

                    <h3 class="media-card-title">${item.title}</h3>
                    <p class="media-card-desc">${item.description}</p>

                    <div class="media-card-footer">
                        <button type="button" class="media-action-link" onclick="window.MoviSabioShowcase.openVideoModal(${item.id})">
                            ${primaryActionText}
                        </button>
                        <button type="button" class="media-action-photo-btn" onclick="window.MoviSabioShowcase.openPhotoModal(${item.id})" title="View high-resolution photograph">
                            📷 High-Res
                        </button>
                    </div>
                </div>
            `;

            trackEl.appendChild(card);
        });
    }

    // --- 5. MEASURE DIMENSIONS FOR SEAMLESS WRAP ---
    function measureTrackDimensions() {
        if (!trackEl) return;
        // Total track scroll width divided by 2 gives the exact single set span
        singleSetWidth = trackEl.scrollWidth / 2;
    }

    // --- 6. CONTINUOUS RIGHT-TO-LEFT ANIMATION LOOP ---
    function animationLoop(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const deltaTime = (timestamp - lastTimestamp) / 1000;
        lastTimestamp = timestamp;

        // Advance translation from right to left (increasing offset)
        if (isPlaying && !isHovered && !isDragging && !isModalOpen && !prefersReducedMotion) {
            currentOffset += speed * deltaTime;

            // Infinite Seamless Wrap
            if (singleSetWidth > 0 && currentOffset >= singleSetWidth) {
                currentOffset -= singleSetWidth;
            }
        }

        // Apply hardware-accelerated 3D transform
        if (trackEl) {
            trackEl.style.transform = `translate3d(-${currentOffset}px, 0, 0)`;
        }

        animFrameId = requestAnimationFrame(animationLoop);
    }

    // --- 7. STEPPING NAVIGATION (PREV / NEXT) ---
    function stepSlide(direction) {
        // Calculate average card step: card width (380 or responsive) + gap (24)
        const firstCard = trackEl ? trackEl.querySelector('.media-showcase-card') : null;
        const cardStep = firstCard ? (firstCard.offsetWidth + 24) : 404;

        currentOffset += direction * cardStep;

        if (singleSetWidth > 0) {
            if (currentOffset >= singleSetWidth) {
                currentOffset -= singleSetWidth;
            } else if (currentOffset < 0) {
                currentOffset += singleSetWidth;
            }
        }
    }

    // --- 8. PLAY / PAUSE TOGGLE ---
    function toggleShowcasePlayPause() {
        isPlaying = !isPlaying;
        updatePlayPauseButtonUI();
    }

    function updatePlayPauseButtonUI() {
        if (!playPauseBtn) return;
        if (isPlaying) {
            playPauseBtn.innerHTML = '<span>⏸</span> <span>Pause</span>';
            playPauseBtn.setAttribute('aria-label', 'Pause Continuous Slider');
            if (statusTextEl) statusTextEl.textContent = 'Continuous Stream (R → L)';
            if (statusDotEl) statusDotEl.style.background = '#2EB67D';
        } else {
            playPauseBtn.innerHTML = '<span>▶</span> <span>Play</span>';
            playPauseBtn.setAttribute('aria-label', 'Resume Continuous Slider');
            if (statusTextEl) statusTextEl.textContent = 'Stream Paused (Manual Mode)';
            if (statusDotEl) statusDotEl.style.background = '#ECB22E';
        }
    }

    // --- 9. POINTER & TOUCH DRAG GESTURES ---
    function initDragGestures() {
        if (!viewportEl) return;

        // Pointer Down (Mouse or Touch)
        viewportEl.addEventListener('pointerdown', (e) => {
            // Ignore if clicking on interactive buttons inside cards
            if (e.target.closest('button') || e.target.closest('a')) return;

            isPointerDown = true;
            isDragging = true;
            dragThresholdExceeded = false;
            pointerStartX = e.clientX;
            pointerInitialOffset = currentOffset;

            if (trackEl) trackEl.classList.add('is-dragging');
        });

        // Pointer Move
        window.addEventListener('pointermove', (e) => {
            if (!isPointerDown) return;

            const deltaX = e.clientX - pointerStartX;
            if (Math.abs(deltaX) > 6) {
                dragThresholdExceeded = true;
            }

            // Moving pointer to the left drags content leftward (increases offset)
            currentOffset = pointerInitialOffset - deltaX;

            if (singleSetWidth > 0) {
                if (currentOffset >= singleSetWidth) {
                    currentOffset -= singleSetWidth;
                    pointerInitialOffset -= singleSetWidth;
                } else if (currentOffset < 0) {
                    currentOffset += singleSetWidth;
                    pointerInitialOffset += singleSetWidth;
                }
            }
        });

        // Pointer Up / Cancel
        const endDrag = () => {
            if (!isPointerDown) return;
            isPointerDown = false;
            isDragging = false;
            if (trackEl) trackEl.classList.remove('is-dragging');
        };

        window.addEventListener('pointerup', endDrag);
        window.addEventListener('pointercancel', endDrag);
    }

    // --- 10. MODAL HANDLING & PLAYBACK MANAGEMENT ---
    function openShowcaseVideo(id) {
        const item = SHOWCASE_PROJECTS.find(p => p.id === id);
        if (!item) return;

        isModalOpen = true;

        // Reuse existing #video-modal engine from index.html if available
        if (typeof window.openVideoModal === 'function') {
            window.openVideoModal(id);
        } else {
            fallbackOpenVideoModal(item);
        }
    }

    function openShowcasePhoto(id) {
        const item = SHOWCASE_PROJECTS.find(p => p.id === id);
        if (!item) return;

        isModalOpen = true;

        const modal = document.getElementById('photo-lightbox-modal');
        const img = document.getElementById('lightbox-img');
        const title = document.getElementById('lightbox-title');
        const desc = document.getElementById('lightbox-desc');
        const meta = document.getElementById('lightbox-meta');

        if (modal && img && title) {
            img.src = item.image;
            img.alt = item.alt;
            title.textContent = item.title;
            if (desc) desc.textContent = item.description;
            if (meta) meta.textContent = `📅 ${item.date} • ${item.location} • ${item.category}`;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeShowcasePhoto() {
        const modal = document.getElementById('photo-lightbox-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        isModalOpen = false;
    }

    function handleCardMediaClick(e, id) {
        // If the user was dragging the slider, don't trigger the click!
        if (dragThresholdExceeded) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        const item = SHOWCASE_PROJECTS.find(p => p.id === id);
        if (!item) return;

        if (item.type === 'video' || item.youtubeId || item.localVideo) {
            openShowcaseVideo(id);
        } else {
            openShowcasePhoto(id);
        }
    }

    // Fallback in-page modal opener in case global openVideoModal is not in scope
    function fallbackOpenVideoModal(item) {
        const modal = document.getElementById('video-modal');
        if (!modal) return;

        const titleEl = document.getElementById('modal-video-title');
        const descEl = document.getElementById('modal-video-description');
        const iframe = document.getElementById('modal-video-iframe');
        const localVideo = document.getElementById('modal-local-video');
        const placeholder = document.getElementById('modal-placeholder');
        const switcher = document.getElementById('video-source-switcher');

        if (titleEl) titleEl.innerText = item.title;
        if (descEl) descEl.innerText = item.description;

        if (iframe) { iframe.style.display = 'none'; iframe.src = ''; }
        if (localVideo) { localVideo.style.display = 'none'; localVideo.pause(); localVideo.src = ''; }
        if (placeholder) placeholder.style.display = 'none';
        if (switcher) { switcher.innerHTML = ''; switcher.style.display = 'none'; }

        if (item.localVideo) {
            localVideo.src = encodeURI(item.localVideo);
            localVideo.style.display = 'block';

            if (item.youtubeId) {
                switcher.style.display = 'flex';
                switcher.innerHTML = `
                    <button type="button" class="btn btn-outline btn-sm active" onclick="switchVideoSource('local', '${encodeURI(item.localVideo)}', '${item.youtubeId}', this)">📼 Local HD Video</button>
                    <button type="button" class="btn btn-outline btn-sm" onclick="switchVideoSource('youtube', '${encodeURI(item.localVideo)}', '${item.youtubeId}', this)">▶️ YouTube Stream</button>
                `;
            }
        } else if (item.youtubeId) {
            iframe.src = `https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`;
            iframe.style.display = 'block';
        } else {
            if (placeholder) placeholder.style.display = 'block';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Modal close listeners to resume slider
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeShowcasePhoto();
            isModalOpen = false;
        }
    });

    // Listen to video-modal close button
    document.addEventListener('click', (e) => {
        if (e.target.matches('.modal-close-btn') || e.target.matches('.photo-lightbox-close')) {
            isModalOpen = false;
        }
    });

    // Global Window API
    window.MoviSabioShowcase = {
        openVideoModal: openShowcaseVideo,
        openPhotoModal: openShowcasePhoto,
        closePhotoModal: closeShowcasePhoto,
        handleCardMediaClick: handleCardMediaClick,
        togglePlayPause: toggleShowcasePlayPause,
        stepSlide: stepSlide,
        setModalOpenState: function (state) { isModalOpen = Boolean(state); }
    };

})();
