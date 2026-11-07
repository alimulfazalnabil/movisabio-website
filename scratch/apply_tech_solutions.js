const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf-8');
const historicalTech = fs.readFileSync('scratch/historical_techSolutions.js', 'utf-8').trim();

// 1. Locate techSolutions in index.html
const startMarker = 'const techSolutions = [';
const endMarker = 'const projectVideos = [';

const sIdx = indexHtml.indexOf(startMarker);
const eIdx = indexHtml.indexOf(endMarker);

if (sIdx === -1 || eIdx === -1) {
  console.error('Markers for techSolutions not found!');
  process.exit(1);
}

// Ensure historicalTech is formatted properly as `const techSolutions = [...]`
let newTechSolutions = historicalTech;
if (!newTechSolutions.endsWith(';')) {
  newTechSolutions += ';';
}

// 2. Locate renderSolutions in index.html
const renderSolMarker = 'function renderSolutions() {';
const renderSolEndMarker = 'function renderVideos() {';

const rsIdx = indexHtml.indexOf(renderSolMarker);
const reIdx = indexHtml.indexOf(renderSolEndMarker);

if (rsIdx === -1 || reIdx === -1) {
  console.error('Markers for renderSolutions not found!');
  process.exit(1);
}

const newRenderSolutions = `function renderSolutions() {
            const grid = document.getElementById('dynamic-project-grid');
            if (!grid) return;
            grid.innerHTML = '';

            const badgeStyles = {
                'Enterprise Platform': { bg: 'rgba(85, 215, 232, 0.15)', text: 'var(--accent-primary)', border: 'rgba(85, 215, 232, 0.4)' },
                'Core Ecosystem': { bg: 'rgba(108, 156, 255, 0.15)', text: 'var(--accent-secondary)', border: 'rgba(108, 156, 255, 0.4)' },
                'Flagship Product': { bg: 'rgba(120, 223, 176, 0.15)', text: 'var(--accent-success)', border: 'rgba(120, 223, 176, 0.4)' },
                'Phase 2 Initiative': { bg: 'rgba(224, 30, 90, 0.15)', text: 'var(--accent-danger)', border: 'rgba(224, 30, 90, 0.4)' },
                'In Concept': { bg: 'rgba(54, 197, 240, 0.15)', text: '#36C5F0', border: 'rgba(54, 197, 240, 0.4)' },
                'AgriTech Solution': { bg: 'rgba(245, 184, 66, 0.15)', text: 'var(--accent-warning)', border: 'rgba(245, 184, 66, 0.4)' },
                'Investor Thesis': { bg: 'linear-gradient(135deg, rgba(224, 30, 90, 0.2), rgba(108, 156, 255, 0.2))', text: '#FF94B4', border: 'rgba(224, 30, 90, 0.4)' }
            };

            const icons = {
                5: '🏙️',
                0: '⚛️',
                1: '🚦',
                2: '👁️',
                3: '🚌',
                4: '🌾',
                101: '📊'
            };

            techSolutions.forEach(project => {
                const card = document.createElement('div');
                card.className = 'card-enterprise';
                card.onclick = () => openProject(project.id);
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
                card.setAttribute('aria-label', \`View details for \${project.title}\`);
                card.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(project.id); } };
                card.style.cursor = 'pointer';

                const style = badgeStyles[project.badge] || { bg: 'rgba(255, 255, 255, 0.08)', text: 'var(--text-primary)', border: 'var(--border-subtle)' };
                const icon = icons[project.id] || '💡';

                card.innerHTML = \`
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-md);">
                        <span class="status-pill" style="background: \${style.bg}; color: \${style.text}; border: 1px solid \${style.border}; font-weight: 700;">
                            <span class="status-dot" style="background: \${style.text};"></span> \${project.badge}
                        </span>
                        <span style="font-size: 1.4rem;">\${icon}</span>
                    </div>
                    <h3 class="card-title" style="margin-bottom: var(--space-sm);">\${project.title}</h3>
                    <p class="card-desc" style="margin-bottom: var(--space-lg); line-height: 1.6; color: var(--text-secondary);">\${project.shortDesc}</p>
                    <div style="margin-top: auto; padding-top: var(--space-md); border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
                        <span style="font-size: var(--font-size-xs); color: var(--accent-primary); font-weight: var(--font-weight-bold); display: inline-flex; align-items: center; gap: 4px;">
                            View Details →
                        </span>
                        <span style="color: var(--text-muted); font-size: 0.8rem;">Architecture & Deck</span>
                    </div>
                \`;
                grid.appendChild(card);
            });
        }

        `;

// 3. Slider JavaScript Engine
const sliderScript = `
        // --- PHOTO SLIDER ENGINE (MOVISABIO SMART CITY FLAGSHIP) ---
        let currentSlide = 0;
        const totalSlides = 6;
        let sliderAutoplayTimer = null;
        let isSliderPlaying = true;

        function initSmartCitySlider() {
            const track = document.getElementById('smart-city-slider-track');
            const slider = document.querySelector('.smart-city-slider');
            if (!track || !slider) return;

            updateSliderUI();
            startSliderAutoplay();

            // Hover pause
            slider.addEventListener('mouseenter', pauseSliderAutoplay);
            slider.addEventListener('mouseleave', () => { if (isSliderPlaying) startSliderAutoplay(); });

            // Keyboard navigation when slider is focused
            slider.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') { prevSlide(); }
                else if (e.key === 'ArrowRight') { nextSlide(); }
            });

            // Touch / Swipe support
            let touchStartX = 0;
            let touchEndX = 0;

            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });

            function handleSwipe() {
                const diff = touchEndX - touchStartX;
                if (Math.abs(diff) > 40) {
                    if (diff > 0) { prevSlide(); }
                    else { nextSlide(); }
                }
            }
        }

        function updateSliderUI() {
            const track = document.getElementById('smart-city-slider-track');
            const counter = document.getElementById('slider-counter');
            const dots = document.querySelectorAll('.slider-dot');
            if (track) {
                track.style.transform = \`translateX(-\${currentSlide * 100}%)\`;
            }
            if (counter) {
                counter.innerText = \`\${currentSlide + 1} / \${totalSlides}\`;
            }
            dots.forEach((dot, idx) => {
                if (idx === currentSlide) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-current', 'true');
                } else {
                    dot.classList.remove('active');
                    dot.removeAttribute('aria-current');
                }
            });
        }

        function goToSlide(index) {
            currentSlide = (index + totalSlides) % totalSlides;
            updateSliderUI();
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        function startSliderAutoplay() {
            stopSliderAutoplay();
            sliderAutoplayTimer = setInterval(() => {
                nextSlide();
            }, 6000);
        }

        function pauseSliderAutoplay() {
            stopSliderAutoplay();
        }

        function stopSliderAutoplay() {
            if (sliderAutoplayTimer) {
                clearInterval(sliderAutoplayTimer);
                sliderAutoplayTimer = null;
            }
        }

        function toggleSliderAutoplay() {
            const btn = document.getElementById('slider-play-pause-btn');
            isSliderPlaying = !isSliderPlaying;
            if (isSliderPlaying) {
                startSliderAutoplay();
                if (btn) btn.innerText = '⏸';
                if (btn) btn.setAttribute('aria-label', 'Pause Autoplay');
            } else {
                stopSliderAutoplay();
                if (btn) btn.innerText = '▶';
                if (btn) btn.setAttribute('aria-label', 'Resume Autoplay');
            }
        }
`;

// Perform replacements:
// Replace renderSolutions
let updated = indexHtml.substring(0, rsIdx) + newRenderSolutions + indexHtml.substring(reIdx);

// Recalculate sIdx and eIdx on updated text
const newSIdx = updated.indexOf(startMarker);
const newEIdx = updated.indexOf(endMarker);

// Replace techSolutions
updated = updated.substring(0, newSIdx) + newTechSolutions + '\n\n        // --- 3. PRESERVED VIDEO DATABASE ---\n        ' + updated.substring(newEIdx + endMarker.length);

// Insert sliderScript right before window.addEventListener('DOMContentLoaded'
const domReadyMarker = "window.addEventListener('DOMContentLoaded', () => {";
const domIdx = updated.indexOf(domReadyMarker);

if (domIdx === -1) {
  console.error('DOMContentLoaded marker not found!');
  process.exit(1);
}

// In DOMContentLoaded, call initSmartCitySlider()
const updatedDomReady = `window.addEventListener('DOMContentLoaded', () => {
            renderSolutions();
            renderVideos();
            initTerritorialMap();
            initSmartCitySlider();
        });`;

const domReadyEndMarker = "});";
const domReadyEndIdx = updated.indexOf(domReadyEndMarker, domIdx);

updated = updated.substring(0, domIdx) + sliderScript + '\n        ' + updatedDomReady + updated.substring(domReadyEndIdx + domReadyEndMarker.length);

fs.writeFileSync('index.html', updated, 'utf-8');
console.log('Successfully updated index.html with techSolutions, renderSolutions, and slider script!');
