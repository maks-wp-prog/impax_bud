/**
 * Impax Bud — Landing Page
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // Header scroll effect
    // =========================================================================
    const header = document.getElementById('header');
    if (header) {
        const onScroll = () => {
            header.classList.toggle('header--scrolled', window.scrollY > 50);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // initial check
    }

    // =========================================================================
    // Smooth scroll for anchor links
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // =========================================================================
    // Scroll reveal animation
    // =========================================================================
    const revealEls = document.querySelectorAll('[data-animate]');
    if (revealEls.length) {
        const revealOnScroll = () => {
            const windowBottom = window.innerHeight + window.scrollY;
            revealEls.forEach(el => {
                const elTop = el.getBoundingClientRect().top + window.scrollY;
                if (elTop < windowBottom - 80) {
                    el.classList.add('is-visible');
                }
            });
        };
        window.addEventListener('scroll', revealOnScroll, { passive: true });
        revealOnScroll();
    }

    // =========================================================================
    // Mobile burger menu (placeholder — toggle nav visibility)
    // =========================================================================
    const burger = document.querySelector('.header__burger');
    if (burger) {
        burger.addEventListener('click', () => {
            const nav = document.querySelector('.header__nav');
            if (nav) {
                nav.style.display = nav.style.display === 'block' ? '' : 'block';
            }
        });
    }

});
