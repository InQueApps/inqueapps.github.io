// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const navbar = document.querySelector('.navbar');
const THEME_STORAGE_KEY = 'inqueapps-theme';

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    }
});

function setTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    if (themeToggle) {
        themeToggle.innerHTML = isDark
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        setTheme(nextTheme);
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.feature, .app-card, .contact-item, .section-header');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// App fetching functionality
class AppFetcher {
    constructor() {
        this.developerId = 'inQue+Apps';
        this.playStoreUrl = `https://play.google.com/store/apps/developer?id=${this.developerId}`;
        this.appsGrid = document.getElementById('apps-grid');
        this.loadingContainer = document.getElementById('loading');
        this.errorContainer = document.getElementById('error');
        
        // Known apps from the search results
        this.knownApps = [
            {
                name: 'PRISM AI',
                description: 'Formerly Vision Tech AI. Smart visual tools for fast AI-assisted image workflows.',
                iconPath: 'pai/icon.png',
                category: 'AI & Technology',
                detailsUrl: './pai/',
                playUrl: 'https://play.google.com/store/apps/developer?id=inQue+Apps'
            },
            {
                name: 'Universal Media Converter',
                description: 'Convert video, audio, images, and documents in one simple, reliable app.',
                iconPath: 'umc/icon.png',
                category: 'Media & Tools',
                detailsUrl: './umc/',
                playUrl: 'https://play.google.com/store/apps/details?id=ab.inque.converter'
            },
            {
                name: 'Tech Prep',
                description: 'Practice coding and interview questions with focused prep for tech roles.',
                iconPath: 'tp/main_icon.png',
                category: 'Education & Learning',
                detailsUrl: './tp/',
                playUrl: 'https://play.google.com/store/apps/details?id=com.InQueApps.TechPrep'
            },
            {
                name: 'Rate My Fit',
                description: 'Share outfits, get ratings, and discover fresh style ideas from the community.',
                iconPath: 'rmf/icon.png',
                category: 'Lifestyle & Fashion',
                detailsUrl: './rmf/',
                playUrl: 'https://play.google.com/store/apps/details?id=ru.daded.ratemyfit'
            }
        ];
    }

    async fetchApps() {
        try {
            // Show loading state
            this.showLoading();
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // For now, we'll use the known apps since direct scraping isn't possible
            // In a real implementation, you would use a backend service to fetch from Google Play
            this.displayApps(this.knownApps);
            
        } catch (error) {
            console.error('Error fetching apps:', error);
            this.showError();
        }
    }

    displayApps(apps) {
        this.hideLoading();
        
        if (!apps || apps.length === 0) {
            this.showError();
            return;
        }

        const appsHTML = apps.map(app => this.createAppCard(app)).join('');
        this.appsGrid.innerHTML = appsHTML;
        
        // Add fade-in animation to new cards
        const newCards = this.appsGrid.querySelectorAll('.app-card');
        newCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
            observer.observe(card);
        });
    }

    createAppCard(app) {
        const learnMoreHref = (app.detailsUrl || (app.name === 'Universal Media Converter' ? './umc/' : app.name === 'Tech Prep' ? './tp/' : app.name === 'Rate My Fit' ? './rmf/' : app.name === 'PRISM AI' ? './pai/' : null)) || '#';
        const playUrl = app.playUrl || this.playStoreUrl;
        const appIcon = app.iconPath
            ? `<img src="${app.iconPath}" alt="${app.name} icon" loading="lazy">`
            : `<i class="${app.icon || 'fas fa-mobile-alt'}"></i>`;
        const learnMoreLink = learnMoreHref === '#'
            ? `<a href="#" class="btn-details" onclick="showAppDetails('${app.name.replace(/'/g, "\\'")}'); return false;"><span>Learn More</span><i class="fas fa-arrow-right"></i></a>`
            : `<a href="${learnMoreHref}" class="btn-details"><span>Learn More</span><i class="fas fa-arrow-right"></i></a>`;
        return `
            <div class="app-card">
                <div class="app-icon">
                    ${appIcon}
                </div>
                <div class="app-info">
                    <h3>${app.name}</h3>
                    <p>${app.description}</p>
                    <small class="app-category">${app.category}</small>
                </div>
                <div class="app-actions">
                    <a href="${playUrl}" target="_blank" rel="noopener" class="btn-play">
                        <i class="fab fa-google-play"></i>
                        <span>View on Play</span>
                    </a>
                    ${learnMoreLink}
                </div>
            </div>
        `;
    }

    showLoading() {
        this.loadingContainer.style.display = 'block';
        this.appsGrid.style.display = 'none';
        this.errorContainer.style.display = 'none';
    }

    hideLoading() {
        this.loadingContainer.style.display = 'none';
        this.appsGrid.style.display = 'grid';
    }

    showError() {
        this.loadingContainer.style.display = 'none';
        this.appsGrid.style.display = 'none';
        this.errorContainer.style.display = 'block';
    }
}

// Initialize app fetcher
const appFetcher = new AppFetcher();

// Fetch apps when the page loads
document.addEventListener('DOMContentLoaded', () => {
    appFetcher.fetchApps();
});

// Function to show app details (placeholder for future implementation)
function showAppDetails(appName) {
    alert(`More details about ${appName} coming soon! This could open a modal with detailed information about the app.`);
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    }

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effect to app cards
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-8px)';
                }, 150);
            }
        });
    });

    // Cleanup: removed parallax + typing effects for smoother layout.
});

// Add a refresh function for apps (useful for testing)
function refreshApps() {
    appFetcher.fetchApps();
}

// Add this to window for debugging
window.refreshApps = refreshApps; 