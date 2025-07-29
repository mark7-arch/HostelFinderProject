// Hostel Finder Website JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initSmoothScrolling();
    initScrollAnimations();
    initMobileMenu();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerLines = mobileMenuBtn.querySelectorAll('.hamburger');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.contains('active');
        
        if (isOpen) {
            mobileMenu.classList.remove('active');
            hamburgerLines[0].style.transform = 'rotate(0deg)';
            hamburgerLines[1].style.opacity = '1';
            hamburgerLines[2].style.transform = 'rotate(0deg)';
        } else {
            mobileMenu.classList.add('active');
            hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburgerLines[1].style.opacity = '0';
            hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        }
    });
    
    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburgerLines[0].style.transform = 'rotate(0deg)';
            hamburgerLines[1].style.opacity = '1';
            hamburgerLines[2].style.transform = 'rotate(0deg)';
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    // Handle navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle scroll button in hero section
    const scrollBtn = document.getElementById('scroll-btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', function() {
            const overviewSection = document.getElementById('overview');
            if (overviewSection) {
                const offsetTop = overviewSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .team-card, .card, .overview-content, .section-header'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Active navigation highlighting
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll listener for active navigation
window.addEventListener('scroll', updateActiveNavigation);

// Feature card hover effects
function initFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px -10px rgba(0, 102, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Team card hover effects
function initTeamCardEffects() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px -10px rgba(0, 102, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Initialize card effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFeatureCardEffects();
    initTeamCardEffects();
});

// Button click effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple effect CSS
const rippleCSS = `
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
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
`;

// Add ripple CSS to head
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize button effects
document.addEventListener('DOMContentLoaded', initButtonEffects);

// Lazy loading for images (if you add real images later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-dependent functions
window.addEventListener('scroll', throttle(updateActiveNavigation, 100));

// Accessibility enhancements
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('click', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus styles for keyboard navigation
    const focusCSS = `
    .keyboard-navigation .btn:focus,
    .keyboard-navigation .nav-link:focus,
    .keyboard-navigation .social-btn:focus {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
    }
    `;
    
    const accessibilityStyle = document.createElement('style');
    accessibilityStyle.textContent = focusCSS;
    document.head.appendChild(accessibilityStyle);
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// Console log for developers
console.log('🏠 Hostel Finder Website Loaded Successfully!');
console.log('📱 For the best experience, view on mobile and desktop devices.');
console.log('🎯 Built with love for Uganda\'s students.');