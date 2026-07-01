/**
 * Impax.Bud Gallery
 * Filter + Lightbox + Load More (6 per batch)
 * Smooth animations throughout
 */

const GALLERY_BATCH = 6;

class Gallery {

    constructor(container) {
        this.container = container;
        this.filterBtns = container.querySelectorAll('.gallery__filter-btn');
        this.items = Array.from(container.querySelectorAll('.gallery__item'));
        this.loadMoreBtn = container.querySelector('.gallery__load-more-btn');
        this.loadMoreWrap = container.querySelector('.gallery__load-more');
        this.lightbox = null;
        this.currentCategory = 'all';
        this.isAnimating = false; // prevent double-clicks

        this.initFilters();
        this.initLightbox();
        this.initLoadMore();

        // Show first batch (no animation on init)
        this.applyFilter('all', false);
    }

    // =========================================================================
    // Load More
    // =========================================================================
    initLoadMore() {
        if (!this.loadMoreBtn) return;

        this.loadMoreBtn.addEventListener('click', () => {
            if (this.isAnimating) return;
            this.showNextBatch();
        });
    }

    /** Returns array of items matching current category filter */
    getFilteredItems() {
        if (this.currentCategory === 'all') return this.items;
        return this.items.filter(item => item.dataset.category === this.currentCategory);
    }

    /** Show next batch with staggered animation */
    showNextBatch() {
        this.isAnimating = true;

        const filtered = this.getFilteredItems();
        const hidden = filtered.filter(item =>
            item.classList.contains('gallery__item--hidden')
        );

        const batch = hidden.slice(0, GALLERY_BATCH);
        if (batch.length === 0) {
            this.isAnimating = false;
            return;
        }

        // Remove hidden class and add appearing with stagger delay
        batch.forEach((item, i) => {
            item.classList.remove('gallery__item--hidden');
            item.classList.add('gallery__item--appearing');
            // Stagger delay
            item.style.animationDelay = `${i * 0.06}s`;

            // Clean up after animation
            item.addEventListener('animationend', () => {
                item.classList.remove('gallery__item--appearing');
                item.style.animationDelay = '';
            }, { once: true });

            this.visibleCount++;
        });

        // Wait for last item animation to finish before allowing next click
        const lastDelay = (batch.length - 1) * 60 + 450; // ms
        setTimeout(() => {
            this.isAnimating = false;
        }, lastDelay);

        this.updateLoadMoreButton(filtered);
    }

    /** Updates the load-more button visibility with fade */
    updateLoadMoreButton(filtered = null) {
        if (!this.loadMoreWrap) return;

        const items = filtered || this.getFilteredItems();
        const hiddenCount = items.filter(item =>
            item.classList.contains('gallery__item--hidden')
        ).length;

        if (hiddenCount === 0) {
            this.loadMoreWrap.classList.add('gallery__load-more--hidden');
            // Remove from DOM after fade
            setTimeout(() => {
                this.loadMoreWrap.style.display = 'none';
            }, 300);
        } else {
            this.loadMoreWrap.style.display = '';
            // Trigger reflow then remove hidden class
            this.loadMoreWrap.offsetHeight;
            this.loadMoreWrap.classList.remove('gallery__load-more--hidden');
        }
    }

    // =========================================================================
    // Filters
    // =========================================================================
    initFilters() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.isAnimating) return;
                const category = btn.dataset.filter;
                if (category === this.currentCategory) return; // no-op
                this.applyFilter(category, true);
            });
        });
    }

    applyFilter(category, animate = true) {
        this.isAnimating = true;
        this.currentCategory = category;

        // Active button state
        this.filterBtns.forEach(b => b.classList.remove('gallery__filter-btn--active'));
        const activeBtn = this.container.querySelector(`[data-filter="${category}"]`);
        if (activeBtn) activeBtn.classList.add('gallery__filter-btn--active');

        // Get currently visible items and target items
        const visibleNow = this.items.filter(item =>
            !item.classList.contains('gallery__item--hidden')
        );
        const targetItems = category === 'all'
            ? this.items
            : this.items.filter(item => item.dataset.category === category);

        if (!animate) {
            // Instant: hide all, show first batch
            this.items.forEach(item => item.classList.add('gallery__item--hidden'));
            this.visibleCount = 0;
            const batch = targetItems.slice(0, GALLERY_BATCH);
            batch.forEach(item => {
                item.classList.remove('gallery__item--hidden');
                this.visibleCount++;
            });
            this.isAnimating = false;
            this.updateLoadMoreButton(targetItems);
            return;
        }

        // Animated transition:
        // 1. Fade out currently visible items
        // 2. After fade, hide all and show first batch with fade-in

        const itemsToHide = visibleNow.filter(item => !targetItems.includes(item));

        if (itemsToHide.length === 0 && visibleNow.every(item => targetItems.includes(item))) {
            // All visible items are in target — just show more, don't hide anything
            this.items.forEach(item => {
                if (!targetItems.includes(item)) {
                    item.classList.add('gallery__item--hidden');
                }
            });
            this.isAnimating = false;
            this.updateLoadMoreButton(targetItems);
            return;
        }

        // Step 1: fade out items that need to disappear
        let animatingOut = 0;
        itemsToHide.forEach(item => {
            animatingOut++;
            item.classList.add('gallery__item--disappearing');
            item.addEventListener('animationend', () => {
                item.classList.remove('gallery__item--disappearing');
                item.classList.add('gallery__item--hidden');
                animatingOut--;
                if (animatingOut <= 0) {
                    this.afterFilterAnimation(targetItems);
                }
            }, { once: true });
        });

        // Also hide visible items that ARE in target but exceed batch
        const visibleInTarget = visibleNow.filter(item => targetItems.includes(item));
        visibleInTarget.forEach(item => {
            item.classList.add('gallery__item--hidden');
        });

        if (itemsToHide.length === 0) {
            // Nothing to animate out, just show new batch
            this.afterFilterAnimation(targetItems);
        }
    }

    afterFilterAnimation(targetItems) {
        // Ensure ALL items are hidden first
        this.items.forEach(item => item.classList.add('gallery__item--hidden'));
        this.visibleCount = 0;

        // Show first batch with staggered animation
        const batch = targetItems.slice(0, GALLERY_BATCH);
        batch.forEach((item, i) => {
            item.classList.remove('gallery__item--hidden');
            item.classList.add('gallery__item--appearing');
            item.style.animationDelay = `${i * 0.05}s`;
            item.addEventListener('animationend', () => {
                item.classList.remove('gallery__item--appearing');
                item.style.animationDelay = '';
            }, { once: true });
            this.visibleCount++;
        });

        const lastDelay = (batch.length - 1) * 50 + 450;
        setTimeout(() => {
            this.isAnimating = false;
        }, lastDelay);

        // Show button if needed
        this.loadMoreWrap.style.display = '';
        this.loadMoreWrap.offsetHeight;
        this.loadMoreWrap.classList.remove('gallery__load-more--hidden');
        this.updateLoadMoreButton(targetItems);
    }

    // =========================================================================
    // Lightbox
    // =========================================================================
    initLightbox() {
        this.container.addEventListener('click', (e) => {
            const item = e.target.closest('.gallery__item');
            if (!item || item.classList.contains('gallery__item--hidden')) return;
            e.preventDefault();

            const img = item.querySelector('img');
            if (!img) return;

            this.openLightbox(img, item);
        });
    }

    openLightbox(img, currentItem) {
        if (this.lightbox) this.closeLightbox();

        const visibleItems = this.items.filter(i =>
            !i.classList.contains('gallery__item--hidden')
        );
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

        let index = currentIndex;
        const lightboxImg = this.lightbox.querySelector('.lightbox__img');

        const updateImage = (direction = 0) => {
            const item = visibleItems[index];
            const imgEl = item.querySelector('img');
            const caption = item.querySelector('.gallery__caption')?.textContent || '';

            // Crossfade
            lightboxImg.classList.add('lightbox__img--fading');

            lightboxImg.addEventListener('transitionend', () => {
                lightboxImg.src = imgEl.src;
                lightboxImg.alt = imgEl.alt;
                lightboxImg.classList.remove('lightbox__img--fading');
            }, { once: true });

            this.lightbox.querySelector('.lightbox__caption').textContent = caption;
            this.lightbox.querySelector('.lightbox__counter').textContent =
                `${index + 1} / ${visibleItems.length}`;
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

        // Close helpers
        this.closeLightbox = () => {
            if (!this.lightbox) return;
            this.lightbox.classList.add('lightbox--closing');
            this.lightbox.addEventListener('animationend', () => {
                if (this.lightbox) {
                    this.lightbox.remove();
                    this.lightbox = null;
                }
                document.body.style.overflow = '';
            }, { once: true });
            document.removeEventListener('keydown', onKey);
        };

        this.lightbox.querySelector('.lightbox__close').addEventListener('click', this.closeLightbox);
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.closeLightbox();
        });

        // Keyboard
        const onKey = (e) => {
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowRight') {
                index = (index + 1) % visibleItems.length;
                updateImage();
            }
            if (e.key === 'ArrowLeft') {
                index = (index - 1 + visibleItems.length) % visibleItems.length;
                updateImage();
            }
        };

        document.addEventListener('keydown', onKey);
    }
}


// =============================================================================
// Init
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
    const galleries = document.querySelectorAll('.gallery');
    galleries.forEach(g => new Gallery(g));
});
