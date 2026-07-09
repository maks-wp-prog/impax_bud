/**
 * Impax Bud — Landing Page
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // Smooth scroll

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
    // Scroll reveal
    // =========================================================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        if (title) title.classList.add('reveal', 'reveal--up');

        const subtitle = section.querySelector('.section-subtitle');
        if (subtitle) subtitle.classList.add('reveal', 'reveal--up');
    });

    const staggerContainers = document.querySelectorAll(
        '.services__grid, .values__grid, .certs__grid, .story__inner > *, .service-detail__inner > *'
    );
    staggerContainers.forEach(container => {
        if (container.children.length > 1) {
            container.classList.add('reveal-stagger');
        }
        [...container.children].forEach(child => {
            child.classList.add('reveal', 'reveal--up');
        });
    });

    document.querySelectorAll('.reveal:not(.reveal--visible)').forEach(el => {
        if (!el.dataset.revealObserved) {
            el.dataset.revealObserved = '1';
            revealObserver.observe(el);
        }
    });

    // =========================================================================
    // Language switcher
    // =========================================================================
    const langBtns = document.querySelectorAll('.header__lang-btn');

    function setLang(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dataset.lang = lang;
        localStorage.setItem('impax-lang', lang);

        langBtns.forEach(btn => {
            btn.classList.toggle('header__lang-btn--active', btn.dataset.lang === lang);
        });

        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setLang(btn.dataset.lang);
        });
    });

    const savedLang = localStorage.getItem('impax-lang') || 'pl';
    setLang(savedLang);

    // =========================================================================
    // Mobile nav
    // =========================================================================
    const mobileNav = document.getElementById('mobileNav');
    const burger = document.querySelector('.header__burger');

    if (mobileNav && burger) {
        const menuContainer = mobileNav.querySelector('.mobile-nav__menu');
        const langContainer = mobileNav.querySelector('.mobile-nav__lang');
        const closeBtn = mobileNav.querySelector('.mobile-nav__close');
        const backdrop = mobileNav.querySelector('.mobile-nav__backdrop');

        const headerLinks = document.querySelectorAll('.header__menu a');
        if (menuContainer && headerLinks.length) {
            const ul = document.createElement('ul');
            headerLinks.forEach(link => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = link.getAttribute('href');
                a.textContent = link.textContent;
                if (link.classList.contains('header__link--active')) {
                    a.classList.add('mobile-nav__link--active');
                }
                li.appendChild(a);
                ul.appendChild(li);
            });
            menuContainer.appendChild(ul);
        }

        const headerLang = document.querySelector('.header__lang');
        if (langContainer && headerLang) {
            langContainer.innerHTML = headerLang.innerHTML;
            langContainer.querySelectorAll('.header__lang-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    setLang(btn.dataset.lang);
                    closeMobileNav();
                });
            });
        }

        function openMobileNav() {
            mobileNav.classList.add('mobile-nav--open');
            burger.classList.add('header__burger--open');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileNav() {
            mobileNav.classList.remove('mobile-nav--open');
            burger.classList.remove('header__burger--open');
            document.body.style.overflow = '';
        }

        burger.addEventListener('click', openMobileNav);
        closeBtn.addEventListener('click', closeMobileNav);
        backdrop.addEventListener('click', closeMobileNav);

        mobileNav.addEventListener('click', (e) => {
            const link = e.target.closest('.mobile-nav__menu a');
            if (link) {
                setTimeout(closeMobileNav, 150);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('mobile-nav--open')) {
                closeMobileNav();
            }
        });

        let touchStartX = 0;
        const panel = mobileNav.querySelector('.mobile-nav__panel');
        if (panel) {
            panel.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });

            panel.addEventListener('touchend', (e) => {
                const diff = touchStartX - e.changedTouches[0].clientX;
                if (diff > 60) {
                    closeMobileNav();
                }
            });
        }
    }

});
