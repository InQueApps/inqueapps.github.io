/**
 * Shared navbar + theme (localStorage key matches main site).
 * Load on index.html and app detail pages so dark mode persists across routes.
 */
(function () {
    const THEME_STORAGE_KEY = 'inqueapps-theme';

    function setTheme(theme) {
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark-mode', isDark);
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = isDark
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        }
    }

    function initializeTheme() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        const prefersDark =
            window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
    }

    function initNavChrome() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
                setTheme(nextTheme);
                localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
            });
        }

        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        document.querySelectorAll('.nav-menu a').forEach((link) => {
            link.addEventListener('click', () => {
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const syncScrolled = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
            syncScrolled();
            window.addEventListener('scroll', syncScrolled);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        initializeTheme();
        initNavChrome();
    });
})();
