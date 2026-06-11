/* ============================================
   MODERN PORTFOLIO JS - Shriya Dikshith
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Loader ----
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 800);
    });

    // ---- AOS Init ----
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80
    });

    // ---- Custom Cursor ----
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    if (window.matchMedia('(hover: hover)').matches) {
        let mouseX = 0, mouseY = 0, outX = 0, outY = 0;
        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
            dot.style.opacity = '1';
            outline.style.opacity = '1';
        });
        (function animateCursor() {
            outX += (mouseX - outX) * 0.15;
            outY += (mouseY - outY) * 0.15;
            outline.style.transform = `translate(${outX - 18}px, ${outY - 18}px)`;
            requestAnimationFrame(animateCursor);
        })();
        document.querySelectorAll('a, button, .btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                outline.style.width = '50px';
                outline.style.height = '50px';
                outline.style.borderColor = 'var(--accent-secondary)';
            });
            el.addEventListener('mouseleave', () => {
                outline.style.width = '36px';
                outline.style.height = '36px';
                outline.style.borderColor = 'var(--accent-primary)';
            });
        });
    }

    // ---- Typing Effect ----
    const typedEl = document.getElementById('typed-text');
    const words = ['Data Scientist', 'Analytics Engineer', 'Data Engineer', 'ML Engineer', 'Data Analyst', 'Full Stack Developer'];
    let wordIdx = 0, charIdx = 0, isDeleting = false;
    function typeEffect() {
        const current = words[wordIdx];
        typedEl.textContent = isDeleting
            ? current.substring(0, charIdx--)
            : current.substring(0, charIdx++);
        let delay = isDeleting ? 50 : 100;
        if (!isDeleting && charIdx > current.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx < 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            delay = 400;
        }
        setTimeout(typeEffect, delay);
    }
    typeEffect();

    // ---- Particles ----
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 15 + 10) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        p.style.width = p.style.height = (Math.random() * 4 + 2) + 'px';
        particlesContainer.appendChild(p);
    }

    // ---- Navbar Scroll ----
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        navbar.classList.toggle('scrolled', y > 50);
        scrollTop.classList.toggle('visible', y > 400);
    });
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Mobile Nav ----
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');

    const openMenu = () => {
        navToggle.classList.add('active');
        navMenu.classList.add('active');
        if (navBackdrop) navBackdrop.classList.add('active');
        document.body.classList.add('nav-open');
        navToggle.setAttribute('aria-expanded', 'true');
    };
    const closeMenu = () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        if (navBackdrop) navBackdrop.classList.remove('active');
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
    };
    const toggleMenu = () => {
        navMenu.classList.contains('active') ? closeMenu() : openMenu();
    };

    navToggle.addEventListener('click', toggleMenu);
    if (navBackdrop) navBackdrop.addEventListener('click', closeMenu);

    // Tap a nav link -> close the menu (it then jumps to the section)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Esc closes the menu; resizing back to desktop resets it
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) closeMenu();
    });

    // ---- Active Nav Link on Scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const sideDots = document.querySelectorAll('.side-dot');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
        sideDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === '#' + current) dot.classList.add('active');
        });
    });

    // ---- Gallery Lightbox ----
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');
        const closeLightbox = () => {
            lightbox.classList.remove('open');
            lightbox.setAttribute('aria-hidden', 'true');
        };
        document.querySelectorAll('.gallery-item img').forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('open');
                lightbox.setAttribute('aria-hidden', 'false');
            });
        });
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    // ---- Theme Toggle ----
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });
    function updateThemeIcon(theme) {
        themeToggle.innerHTML = theme === 'dark'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }

    // ---- Counter Animation ----
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                let count = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(count);
                    }
                }, 30);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // ---- Portfolio Filter ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.portfolio-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

}); // end DOMContentLoaded

/* Fade-in-up animation for portfolio filter */
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);
