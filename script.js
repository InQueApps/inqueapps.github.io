// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
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
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

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
                name: 'Vision Tech AI',
                description: 'Advanced AI-powered vision technology app for enhanced image processing and analysis.',
                icon: 'fas fa-eye',
                category: 'AI & Technology'
            },
            {
                name: 'Universal Media Converter',
                description: 'Convert and transform media files between different formats with ease and high quality.',
                icon: 'fas fa-exchange-alt',
                category: 'Media & Tools',
                detailsUrl: 'https://inqueapps.github.io/umc/'
            },
            {
                name: 'Tech Prep',
                description: 'Comprehensive preparation app for technology interviews and technical assessments.',
                icon: 'fas fa-laptop-code',
                category: 'Education & Learning',
                detailsUrl: 'https://inqueapps.github.io/tp/'
            },
            {
                name: 'Rate My Fit',
                description: 'Rate and review fashion outfits, get style recommendations and share your looks.',
                icon: 'fas fa-tshirt',
                category: 'Lifestyle & Fashion',
                detailsUrl: 'https://inqueapps.github.io/rmf/'
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
        const learnMoreHref = (app.detailsUrl || (app.name === 'Universal Media Converter' ? 'https://inqueapps.github.io/umc/' : app.name === 'Tech Prep' ? 'https://inqueapps.github.io/tp/' : app.name === 'Rate My Fit' ? 'https://inqueapps.github.io/rmf/' : null)) || '#';
        const learnMoreLink = learnMoreHref === '#'
            ? `<a href="#" class="btn-details" onclick="showAppDetails('${app.name.replace(/'/g, "\\'")}'); return false;">Learn More</a>`
            : `<a href="${learnMoreHref}" class="btn-details">Learn More</a>`;
        return `
            <div class="app-card">
                <div class="app-icon">
                    <i class="${app.icon}"></i>
                </div>
                <div class="app-info">
                    <h3>${app.name}</h3>
                    <p>${app.description}</p>
                    <small style="color: #64748b; font-weight: 500;">${app.category}</small>
                </div>
                <div class="app-actions">
                    <a href="https://play.google.com/store/apps/developer?id=inQue+Apps" target="_blank" class="btn-play">
                        <i class="fab fa-google-play"></i>
                        View on Play Store
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

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Add a refresh function for apps (useful for testing)
function refreshApps() {
    appFetcher.fetchApps();
}

// Add this to window for debugging
window.refreshApps = refreshApps; 