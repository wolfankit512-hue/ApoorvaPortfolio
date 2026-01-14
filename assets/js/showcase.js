/**
 * Showcase Gallery V2 - Industry Level
 * Features: Bento Grid, 3D Effects, Smooth Filtering
 */

class ShowcaseGallery {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.currentTheaterIndex = 0;
        this.grid = document.getElementById('bento-grid');
        this.theaterOverlay = document.getElementById('theater-overlay');

        this.init();
    }

    async init() {
        await this.loadProjects();
        this.setupFilters();
        this.setupTheater();
        this.setupScrollProgress();
        this.setupKeyboardNav();
        this.observeCards();
        this.setup3DTilt();
    }

    async loadProjects() {
        try {
            const response = await fetch('projects.json?v=' + Date.now());
            this.projects = await response.json();
            this.filteredProjects = [...this.projects];
            this.renderBentoGrid();
            this.updateFilterCounts();
        } catch (error) {
            console.error('Error loading projects:', error);
            this.grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:4rem; color: var(--text-body);"><h3>No projects found</h3><p>Add images to the assets/img folders.</p></div>';
        }
    }

    // Assign sizes for bento layout pattern
    getSizeClass(index, total) {
        // Create visual interest with mixed sizes
        // Pattern: hero, medium, small, large, tall, medium, small, small...
        const patterns = [
            'size-hero',    // First item - big impact
            'size-medium',
            'size-tall',
            'size-large',
            'size-medium',
            'size-small',
            'size-medium',
            'size-small',
        ];

        if (index < patterns.length) {
            return patterns[index];
        }

        // After pattern, alternate between medium and small
        const remainder = (index - patterns.length) % 4;
        const sizes = ['size-medium', 'size-small', 'size-small', 'size-medium'];
        return sizes[remainder];
    }

    renderBentoGrid() {
        this.grid.innerHTML = '';

        this.filteredProjects.forEach((project, index) => {
            const card = this.createBentoCard(project, index);
            this.grid.appendChild(card);
        });
    }

    createBentoCard(project, index) {
        const card = document.createElement('div');
        const sizeClass = this.getSizeClass(index, this.filteredProjects.length);
        card.className = `bento-card ${sizeClass}`;
        card.dataset.category = project.category;
        card.dataset.index = index;

        const isVideo = this.isVideoFile(project.filename);
        const badgeInfo = this.getBadgeInfo(project.category);

        card.innerHTML = `
            <div class="bento-inner">
                <div class="bento-placeholder"></div>
                <div class="bento-media">
                    ${isVideo ?
                `<video src="${project.filename}" muted loop playsinline></video>` :
                `<img src="${project.thumbnail}" alt="${project.title}" loading="lazy" decoding="async">`
            }
                </div>
                ${isVideo ? '<div class="bento-play"></div>' : ''}
                <div class="bento-badge">
                    <span class="badge-dot ${badgeInfo.dotClass}"></span>
                    ${badgeInfo.text}
                </div>
                <div class="bento-overlay">
                    <h3>${project.title}</h3>
                    <p>${project.software?.join(' • ') || project.category}</p>
                </div>
            </div>
        `;

        // Image load handler
        const media = card.querySelector('img, video');
        const placeholder = card.querySelector('.bento-placeholder');

        if (media.tagName === 'IMG') {
            media.onload = () => {
                placeholder.style.display = 'none';
            };
        } else {
            media.onloadedmetadata = () => {
                placeholder.style.display = 'none';
            };

            // Video hover preview
            card.addEventListener('mouseenter', () => media.play());
            card.addEventListener('mouseleave', () => {
                media.pause();
                media.currentTime = 0;
            });
        }

        // Click to open theater
        card.addEventListener('click', () => this.openTheater(index));

        return card;
    }

    isVideoFile(filename) {
        const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];
        return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    }

    getBadgeInfo(category) {
        const badges = {
            'photoshop': { dotClass: 'ps', text: 'Photoshop' },
            'coreldraw': { dotClass: 'cd', text: 'CorelDraw' },
            'aftereffects': { dotClass: 'ae', text: 'After Effects' },
            'premierepro': { dotClass: 'pr', text: 'Premiere Pro' },
            'mixed': { dotClass: 'featured', text: 'Featured' }
        };
        return badges[category] || badges['mixed'];
    }

    setup3DTilt() {
        // 3D tilt effect on hover (Desktop only)
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            document.addEventListener('mousemove', (e) => {
                const cards = document.querySelectorAll('.bento-card:hover .bento-inner');
                cards.forEach(inner => {
                    const card = inner.parentElement;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = (y - centerY) / 25;
                    const rotateY = (centerX - x) / 25;

                    inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });
            });
        }

        // Reset on mouse leave
        document.addEventListener('mouseover', (e) => {
            if (!e.target.closest('.bento-card')) {
                document.querySelectorAll('.bento-inner').forEach(inner => {
                    inner.style.transform = '';
                });
            }
        });
    }

    setupFilters() {
        const pills = document.querySelectorAll('.filter-pill');

        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                this.currentFilter = pill.dataset.filter;
                this.filterProjects();
            });
        });
    }

    filterProjects() {
        if (this.currentFilter === 'all') {
            this.filteredProjects = [...this.projects];
        } else {
            this.filteredProjects = this.projects.filter(p => p.category === this.currentFilter);
        }

        // Re-render grid with new filtered projects
        this.renderBentoGrid();

        // Trigger reveal animations
        requestAnimationFrame(() => {
            const cards = this.grid.querySelectorAll('.bento-card');
            cards.forEach((card, i) => {
                setTimeout(() => {
                    card.classList.add('revealed');
                }, i * 60);
            });
        });
    }

    updateFilterCounts() {
        const counts = {
            all: this.projects.length,
            photoshop: 0,
            coreldraw: 0,
            aftereffects: 0,
            premierepro: 0
        };

        this.projects.forEach(p => {
            if (counts[p.category] !== undefined) {
                counts[p.category]++;
            }
        });

        document.querySelectorAll('.filter-pill').forEach(pill => {
            const filter = pill.dataset.filter;
            const countEl = pill.querySelector('.filter-count');
            if (countEl && counts[filter] !== undefined) {
                countEl.textContent = counts[filter];
            }
        });
    }

    // Theater Mode
    setupTheater() {
        const closeBtn = document.querySelector('.theater-close');
        const prevBtn = document.querySelector('.theater-prev');
        const nextBtn = document.querySelector('.theater-next');

        closeBtn?.addEventListener('click', () => this.closeTheater());
        prevBtn?.addEventListener('click', () => this.navigateTheater(-1));
        nextBtn?.addEventListener('click', () => this.navigateTheater(1));

        this.theaterOverlay?.addEventListener('click', (e) => {
            if (e.target === this.theaterOverlay) {
                this.closeTheater();
            }
        });
    }

    openTheater(index) {
        this.currentTheaterIndex = index;
        const project = this.filteredProjects[index];

        if (!project) return;

        const mediaContainer = document.getElementById('theater-media-container');
        const titleEl = document.getElementById('theater-title');
        const subtitleEl = document.getElementById('theater-subtitle');
        const counterEl = document.getElementById('theater-counter');

        const isVideo = this.isVideoFile(project.filename);

        mediaContainer.innerHTML = isVideo ?
            `<video class="theater-media" src="${project.filename}" controls autoplay></video>` :
            `<img class="theater-media" src="${project.filename}" alt="${project.title}">`;

        titleEl.textContent = project.title;
        subtitleEl.textContent = project.software?.join(' • ') || project.category;
        counterEl.textContent = `${index + 1} / ${this.filteredProjects.length}`;

        this.theaterOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeTheater() {
        this.theaterOverlay.classList.remove('active');
        document.body.style.overflow = '';

        const video = this.theaterOverlay.querySelector('video');
        if (video) video.pause();
    }

    navigateTheater(direction) {
        let newIndex = this.currentTheaterIndex + direction;

        if (newIndex < 0) newIndex = this.filteredProjects.length - 1;
        if (newIndex >= this.filteredProjects.length) newIndex = 0;

        this.openTheater(newIndex);
    }

    setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            if (!this.theaterOverlay.classList.contains('active')) return;

            switch (e.key) {
                case 'Escape': this.closeTheater(); break;
                case 'ArrowLeft': this.navigateTheater(-1); break;
                case 'ArrowRight': this.navigateTheater(1); break;
            }
        });
    }

    observeCards() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '100px'
        });

        // Observe existing cards immediately
        this.grid.querySelectorAll('.bento-card').forEach(card => {
            observer.observe(card);
        });

        // Observe grid for new cards
        const config = { childList: true };
        const gridObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.classList?.contains('bento-card')) {
                        observer.observe(node);
                    }
                });
            });
        });

        gridObserver.observe(this.grid, config);
    }

    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }
}

// Touch/Swipe for theater
class TouchSwipe {
    constructor(element, callbacks) {
        this.element = element;
        this.callbacks = callbacks;
        this.startX = 0;

        element.addEventListener('touchstart', e => this.startX = e.changedTouches[0].screenX, { passive: true });
        element.addEventListener('touchend', e => {
            const diffX = e.changedTouches[0].screenX - this.startX;
            if (Math.abs(diffX) > 50) {
                diffX > 0 ? this.callbacks.onSwipeRight?.() : this.callbacks.onSwipeLeft?.();
            }
        }, { passive: true });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.showcaseGallery = new ShowcaseGallery();

    const theaterOverlay = document.getElementById('theater-overlay');
    if (theaterOverlay) {
        new TouchSwipe(theaterOverlay, {
            onSwipeLeft: () => window.showcaseGallery.navigateTheater(1),
            onSwipeRight: () => window.showcaseGallery.navigateTheater(-1)
        });
    }
});
