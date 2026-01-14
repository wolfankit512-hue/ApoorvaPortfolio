document.addEventListener('DOMContentLoaded', () => {
    // Create Lightbox DOM elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close"></button>
            <img src="" alt="Project Preview" class="lightbox-image">
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const content = lightbox.querySelector('.lightbox-content');

    // Function to open lightbox
    window.openLightbox = (imageSrc) => {
        lightboxImg.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Function to close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = ''; // Clear source after transition
            resetZoom();
        }, 300);
    };

    // Zoom Logic
    let isZoomed = false;
    const toggleZoom = (e) => {
        e.stopPropagation(); // Prevent closing when clicking image
        isZoomed = !isZoomed;
        if (isZoomed) {
            lightboxImg.style.transform = 'scale(1.5)';
            lightboxImg.style.cursor = 'zoom-out';
            lightboxImg.style.transition = 'transform 0.3s ease';
        } else {
            resetZoom();
        }
    };

    const resetZoom = () => {
        isZoomed = false;
        lightboxImg.style.transform = 'scale(1)';
        lightboxImg.style.cursor = 'zoom-in';
    };

    // Event Listeners
    closeBtn.addEventListener('click', closeLightbox);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === content) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Toggle zoom on image click
    lightboxImg.addEventListener('click', toggleZoom);
    lightboxImg.style.cursor = 'zoom-in';
});
