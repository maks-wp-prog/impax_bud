/**
 * Impax.Bud Gallery
 * Filter + Lightbox
 */

class Gallery {

    constructor(container) {
        this.container = container;
        this.filterBtns = container.querySelectorAll('.gallery__filter-btn');
        this.items = container.querySelectorAll('.gallery__item');
        this.lightbox = null;

        this.initFilters();
        this.initLightbox();
    }

    // =========================================================================
    // Filters
    // =========================================================================
    initFilters() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.filter;

                // Active state
                this.filterBtns.forEach(b => b.classList.remove('gallery__filter-btn--active'));
                btn.classList.add('gallery__filter-btn--active');

                // Show/hide items
                this.items.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = '';
                        // Trigger animation
                        requestAnimationFrame(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        });
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => { item.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }

    // =========================================================================
    // Lightbox
    // =========================================================================
    initLightbox() {
        this.container.addEventListener('click', (e) => {
            const item = e.target.closest('.gallery__item');
            if (!item) return;
            e.preventDefault();

            const img = item.querySelector('img');
            if (!img) return;

            this.openLightbox(img, item);
        });
    }

    openLightbox(img, currentItem) {
        // Build flat array of visible images for navigation
        const visibleItems = [...this.items].filter(i => i.style.display !== 'none');
        const currentIndex = visibleItems.indexOf(currentItem);

        // Create lightbox
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'lightbox';
        this.lightbox.innerHTML = `
            <button class="lightbox__close" aria-label="Zamknij">&times;</button>
            <button class="lightbox__prev" aria-label="Poprzednie">&#8249;</button>
            <button class="lightbox__next" aria-label="Następne">&#8250;</button>
            <div class="lightbox__content">
                <img src="${img.src}" alt="${img.alt}" class="lightbox__img">
                <div class="lightbox__caption">${currentItem.querySelector('.gallery__caption')?.textContent || ''}</div>
                <div class="lightbox__counter">${currentIndex + 1} / ${visibleItems.length}</div>
            </div>
        `;

        document.body.appendChild(this.lightbox);
        document.body.style.overflow = 'hidden';

        // Navigation state
        let index = currentIndex;

        const updateImage = () => {
            const item = visibleItems[index];
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery__caption')?.textContent || '';
            this.lightbox.querySelector('.lightbox__img').src = img.src;
            this.lightbox.querySelector('.lightbox__img').alt = img.alt;
            this.lightbox.querySelector('.lightbox__caption').textContent = caption;
            this.lightbox.querySelector('.lightbox__counter').textContent = `${index + 1} / ${visibleItems.length}`;
        };

        // Navigation
        this.lightbox.querySelector('.lightbox__next').addEventListener('click', () => {
            index = (index + 1) % visibleItems.length;
            updateImage();
        });

        this.lightbox.querySelector('.lightbox__prev').addEventListener('click', () => {
            index = (index - 1 + visibleItems.length) % visibleItems.length;
            updateImage();
        });

        // Close
        const close = () => {
            this.lightbox.remove();
            this.lightbox = null;
            document.body.style.overflow = '';
        };

        this.lightbox.querySelector('.lightbox__close').addEventListener('click', close);
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) close();
        });

        // Keyboard
        const onKey = (e) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') {
                index = (index + 1) % visibleItems.length;
                updateImage();
            }
            if (e.key === 'ArrowLeft') {
                index = (index - 1 + visibleItems.length) % visibleItems.length;
                updateImage();
            }
        };

        document.addEventListener('keydown', onKey, { once: false });
        this.lightbox._onKey = onKey;

        // Cleanup on close
        const origClose = close;
        close = () => {
            document.removeEventListener('keydown', this.lightbox._onKey);
            origClose();
        };
    }

}


// =============================================================================
// Init
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
    const galleries = document.querySelectorAll('.gallery');
    galleries.forEach(g => new Gallery(g));
});
