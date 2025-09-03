// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Force dark mode always
document.documentElement.setAttribute('data-theme', 'dark');
localStorage.setItem('theme', 'dark');

// Update icon for dark theme
themeIcon.classList.remove('fa-moon');
themeIcon.classList.add('fa-sun');

// Theme toggle disabled - always stay in dark mode
// themeToggle.addEventListener('click', () => {
//     const currentTheme = document.documentElement.getAttribute('data-theme');
//     const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
//     
//     document.documentElement.setAttribute('data-theme', newTheme);
//     localStorage.setItem('theme', newTheme);
//     
//     // Update icon
//     if (newTheme === 'dark') {
//         themeIcon.classList.remove('fa-moon');
//         themeIcon.classList.add('fa-sun');
//     } else {
//         themeIcon.classList.remove('fa-sun');
//         themeIcon.classList.add('fa-moon');
//     }
//     
//     // Update navbar immediately when theme changes
//     updateNavbarBackground();
// });

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navbar background update function
const navbar = document.getElementById('navbar');

function updateNavbarBackground() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (window.scrollY > 100) {
        navbar.style.background = isDark 
            ? 'rgba(26, 32, 44, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = isDark 
            ? '0 2px 20px rgba(0, 0, 0, 0.3)' 
            : '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = isDark 
            ? 'rgba(26, 32, 44, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Navbar background change on scroll
window.addEventListener('scroll', updateNavbarBackground);

// Initialize navbar background on page load
document.addEventListener('DOMContentLoaded', () => {
    updateNavbarBackground();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-item, .cert-card, .education-item, .leadership-card');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Enhanced typing effect for hero title
function enhancedTypeWriter() {
    const typewriterElement = document.querySelector('.typewriter');
    const nameElement = document.querySelector('.name-highlight');
    
    if (!typewriterElement || !nameElement) return;
    
    const fullText = "Hi, I'm Dhruvraj Singh Rathore";
    
    // Split the full text into parts for controlled line breaks
    const greetingText = "Hi, I'm ";
    const firstName = "Dhruvraj";
    const middleName = "Singh";
    const lastName = "Rathore";
    
    // Create spans for each letter with wave animation
    const greetingSpans = greetingText.split('').map(letter => 
        letter === ' ' ? ' ' : `<span class="name-letter">${letter}</span>`
    ).join('');
    const firstNameSpans = firstName.split('').map(letter => `<span class="name-letter">${letter}</span>`).join('');
    const middleNameSpans = middleName.split('').map(letter => `<span class="name-letter">${letter}</span>`).join('');
    const lastNameSpans = lastName.split('').map(letter => `<span class="name-letter">${letter}</span>`).join('');
    
    // Combine with controlled line break
    const allLetters = `${greetingSpans}${firstNameSpans} ${middleNameSpans}<br/>${lastNameSpans}`;
    
    // Put everything in the name element (no separate typewriter element)
    typewriterElement.style.display = 'none'; // Hide the typewriter element
    nameElement.innerHTML = allLetters;
    nameElement.style.opacity = '1';
    
    // Start the wave animation immediately
    setTimeout(() => {
        animateAllLetters();
    }, 800);
    
    function animateAllLetters() {
        const letters = nameElement.querySelectorAll('.name-letter');
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.add('animate');
            }, index * 80); // Stagger each letter by 80ms
        });
    }
}

// Particle System
function createParticleSystem() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 15 + 's';
        
        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--drift', drift + 'px');
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 25000);
    }
    
    // Create initial particles
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createParticle(), i * 1000);
    }
    
    // Continue creating particles
    setInterval(createParticle, 2000);
}

// Initialize enhanced animations on page load
window.addEventListener('load', () => {
    enhancedTypeWriter();
    createParticleSystem();
    
    // Add stagger animation to other elements
    setTimeout(() => {
        const tagline = document.querySelector('.hero-tagline');
        const description = document.querySelector('.hero-description-container');
        const buttons = document.querySelector('.hero-buttons');
        
        if (tagline) {
            tagline.style.animation = 'fadeInUp 0.6s ease-out 0.5s both';
        }
        if (description) {
            description.style.animation = 'fadeInUp 0.6s ease-out 0.8s both';
        }
        if (buttons) {
            buttons.style.animation = 'fadeInUp 0.6s ease-out 1.1s both';
        }
    }, 100);
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button (optional)
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopButton.classList.add('scroll-top');
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #d4af37, #f6e05e);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
`;

scrollTopButton.addEventListener('click', scrollToTop);
document.body.appendChild(scrollTopButton);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.style.opacity = '1';
        scrollTopButton.style.transform = 'translateY(0)';
    } else {
        scrollTopButton.style.opacity = '0';
        scrollTopButton.style.transform = 'translateY(10px)';
    }
});

// Form submission handling (if contact form is added)
function handleFormSubmission(event) {
    event.preventDefault();
    // Add your form handling logic here
    alert('Thank you for your message! I\'ll get back to you soon.');
}

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Copy to clipboard functionality for contact info
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show temporary notification
        const notification = document.createElement('div');
        notification.textContent = 'Copied to clipboard!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    });
}

// Add copy functionality to email and phone links
document.addEventListener('DOMContentLoaded', () => {
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        if (link.href.startsWith('mailto:') || link.href.startsWith('tel:')) {
            link.addEventListener('click', (e) => {
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    const text = link.href.replace('mailto:', '').replace('tel:', '');
                    copyToClipboard(text);
                }
            });
        }
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Toggle Description Functionality
function toggleDescription() {
    const fullDescription = document.getElementById('hero-description-full');
    const showMoreBtn = document.getElementById('show-more-btn');
    const showMoreText = document.getElementById('show-more-text');
    const showMoreIcon = document.getElementById('show-more-icon');
    
    if (fullDescription.style.display === 'none') {
        fullDescription.style.display = 'block';
        showMoreText.textContent = 'Show Less';
        showMoreIcon.classList.remove('fa-chevron-down');
        showMoreIcon.classList.add('fa-chevron-up');
        fullDescription.style.animation = 'fadeIn 0.3s ease-in-out';
    } else {
        fullDescription.style.display = 'none';
        showMoreText.textContent = 'Show More';
        showMoreIcon.classList.remove('fa-chevron-up');
        showMoreIcon.classList.add('fa-chevron-down');
    }
}