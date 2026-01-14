/**
 * Apoorva Gupta Portfolio - Animation Scripts
 * Smooth scroll-triggered animations and micro-interactions
 */

(function () {
    'use strict';

    // ===========================================
    // SCROLL-TRIGGERED ANIMATIONS
    // ===========================================

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Stagger children animations
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    document.querySelectorAll('.fade-in-up, .scale-in, .slide-in-left, .slide-in-right').forEach(el => {
        animationObserver.observe(el);
    });

    // ===========================================
    // SMOOTH PARALLAX FOR BLOBS
    // ===========================================

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.02;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.02;
    });

    function animateBlobs() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        const blobs = document.querySelectorAll('.blob');
        blobs.forEach((blob, index) => {
            const factor = (index + 1) * 0.5;
            blob.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
        });

        requestAnimationFrame(animateBlobs);
    }

    // Start blob animation
    if (document.querySelector('.blob')) {
        animateBlobs();
    }

    // ===========================================
    // MAGNETIC BUTTON EFFECT
    // ===========================================

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // ===========================================
    // TILT EFFECT ON CARDS
    // ===========================================

    document.querySelectorAll('.project-card, .project-sphere, .selected-card, .archive-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // ===========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===========================================
    // TYPING EFFECT FOR HERO TEXT
    // ===========================================

    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // ===========================================
    // COUNTER ANIMATION
    // ===========================================

    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        updateCounter();
    }

    // ===========================================
    // RIPPLE EFFECT ON BUTTONS
    // ===========================================

    document.querySelectorAll('.btn, .filter-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple CSS dynamically
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn, .filter-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);

    // ===========================================
    // NAVBAR SCROLL EFFECT
    // ===========================================

    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.85)';
            header.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
        }

        lastScroll = currentScroll;
    });

    // ===========================================
    // LOADING ANIMATION
    // ===========================================

    window.addEventListener('load', () => {
        document.body.classList.add('loaded');

        // Trigger entrance animations
        setTimeout(() => {
            document.querySelectorAll('.fade-in-up, .scale-in').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 100);
            });
        }, 100);
    });

    // ===========================================
    // CURSOR GLOW EFFECT (Optional)
    // ===========================================

    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    const cursorGlowStyle = document.createElement('style');
    cursorGlowStyle.textContent = `
        .cursor-glow {
            position: fixed;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(255, 107, 107, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
            opacity: 0;
        }
        
        body:hover .cursor-glow {
            opacity: 1;
        }
    `;
    document.head.appendChild(cursorGlowStyle);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    console.log('🎨 Apoorva Portfolio Animations Loaded');
})();
