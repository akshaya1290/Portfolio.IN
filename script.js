// ====================================
// MISSION CONTROL DASHBOARD PORTFOLIO
// ====================================

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    initializeNavigation();
    initializeScrollReveal();
    setupLoadingScreen();
});

// ====================================
// LOADING SCREEN
// ====================================

function setupLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.pointerEvents = 'none';
        }, 2500);
    }
}

// ====================================
// PARTICLE SYSTEM
// ====================================

function initializeParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        const randomDuration = 5 + Math.random() * 10;
        const randomDelay = Math.random() * 5;
        
        particle.style.left = randomX + 'px';
        particle.style.top = randomY + 'px';
        particle.style.animationDuration = randomDuration + 's';
        particle.style.animationDelay = randomDelay + 's';
        
        particlesContainer.appendChild(particle);
    }

    // Regenerate particles periodically
    setInterval(() => {
        const particles = particlesContainer.querySelectorAll('.particle');
        if (particles.length > 0) {
            const randomParticle = particles[Math.floor(Math.random() * particles.length)];
            randomParticle.remove();
            
            const newParticle = document.createElement('div');
            newParticle.classList.add('particle');
            newParticle.style.left = Math.random() * window.innerWidth + 'px';
            newParticle.style.top = Math.random() * window.innerHeight + 'px';
            newParticle.style.animationDuration = (5 + Math.random() * 10) + 's';
            newParticle.style.animationDelay = '0s';
            particlesContainer.appendChild(newParticle);
        }
    }, 3000);
}

// ====================================
// TYPING ANIMATION
// ====================================

function typeWriter(element, texts, speed = 100, delayBetweenTexts = 2000) {
    if (!element) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            if (charIndex < currentText.length) {
                element.textContent += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(type, speed);
            } else {
                isDeleting = true;
                setTimeout(type, delayBetweenTexts);
            }
        } else {
            if (charIndex > 0) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, speed / 2);
            } else {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, speed);
            }
        }
    }

    type();
}

// ====================================
// NAVIGATION
// ====================================

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && hamburger && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });

    // Update active link on scroll
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
}

function updateActiveNavLink() {
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        const isCurrentPage = window.location.pathname.includes(href) || 
                             (href === 'index.html' && (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('portfolio/')));
        
        if (isCurrentPage || window.location.pathname.endsWith(href)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// ====================================
// SCROLL REVEAL ANIMATION
// ====================================

function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ====================================
// PROGRESS BAR ANIMATION
// ====================================

function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fillWidth = entry.target.getAttribute('data-width');
                entry.target.style.setProperty('--fill-width', fillWidth + '%');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressFills.forEach(fill => observer.observe(fill));
}

// Initialize progress bars when DOM is ready
document.addEventListener('DOMContentLoaded', animateProgressBars);

// ====================================
// FORM HANDLING
// ====================================

function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: form.querySelector('input[name="name"]').value,
            email: form.querySelector('input[name="email"]').value,
            subject: form.querySelector('input[name="subject"]').value,
            message: form.querySelector('textarea[name="message"]').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ====================================
// NOTIFICATION SYSTEM
// ====================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(59, 130, 246, 0.9)'};
        color: white;
        border-radius: 8px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ====================================
// SMOOTH PAGE TRANSITIONS
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-transition');
    
    // Setup contact form if on contact page
    setupContactForm();
});

// ====================================
// UTILITY FUNCTIONS
// ====================================

// Smooth scroll to element
function smoothScroll(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add animation delay to elements
function staggerAnimation(elements, delay = 100) {
    elements.forEach((el, index) => {
        el.style.animationDelay = (index * delay) + 'ms';
    });
}

// Get viewport dimensions
function getViewport() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// ====================================
// WINDOW RESIZE HANDLING
// ====================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize particles on resize if needed
    }, 250);
});

// ====================================
// SCROLL ANIMATIONS FOR TIMELINE
// ====================================

function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => observer.observe(item));
}

document.addEventListener('DOMContentLoaded', animateTimeline);

// ====================================
// BADGE ANIMATIONS
// ====================================

function animateBadges() {
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach((badge, index) => {
        badge.style.animationDelay = (index * 100) + 'ms';
        badge.classList.add('scale-in');
    });
}

document.addEventListener('DOMContentLoaded', animateBadges);

// ====================================
// SMOOTH ANCHOR LINKS
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            smoothScroll(target);
        }
    });
});

// ====================================
// KEYBOARD SHORTCUTS
// ====================================

document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    }
});
