// Scroll Progress Indicator
const scrollProgressBar = document.querySelector('.scroll-progress-bar');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    if (scrollProgressBar) {
        const clipValue = 100 - scrolled;
        scrollProgressBar.style.clipPath = `inset(0 ${clipValue}% 0 0)`;
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Scroll to top when clicking nav-logo
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
    navLogo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to navigation on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    // Check if we're at the bottom of the page
    const isAtBottom = (window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight - 100;

    if (isAtBottom) {
        // If at bottom, activate the last section (contact)
        current = 'contact';
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations with stagger
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards with staggered delay
document.querySelectorAll('.project-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// Observe timeline items with stagger
document.querySelectorAll('.timeline-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.15}s`;
    observer.observe(el);
});

// Observe other elements
document.querySelectorAll('.about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Image Reveal Animations
const imageRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('reveal');
            imageRevealObserver.unobserve(img);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

// Observe project images
document.querySelectorAll('.project-image img').forEach(img => {
    imageRevealObserver.observe(img);
});

// Observe about profile image
const profileImage = document.querySelector('.about-image img');
if (profileImage) {
    imageRevealObserver.observe(profileImage);
}

// Enhanced Skill Tag Animations with Stagger
const skillTagsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.skill-tag');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.classList.add('reveal');
                }, index * 100); // 100ms delay between each tag
            });
            skillTagsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px'
});

const skillTagsContainer = document.querySelector('.skill-tags');
if (skillTagsContainer) {
    skillTagsObserver.observe(skillTagsContainer);
}

// Smooth fade-in for highlight text
const highlight = document.querySelector('.highlight');
if (highlight) {
    setTimeout(() => {
        highlight.style.animation = 'fadeInUp 0.8s ease forwards';
    }, 1000);
}

// Typing Effect for Hero Subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';

    let charIndex = 0;

    function typeWriter() {
        if (charIndex < text.length) {
            heroSubtitle.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50); // 50ms per character
        }
        // Cursor keeps blinking at the end
    }

    // Start typing after initial animations (1.8 seconds to account for new delays)
    setTimeout(typeWriter, 1800);
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // If you're not using Formspree, prevent default and add your own handling
        // e.preventDefault();
        // Add your form submission logic here
    });
}

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Make contact items clickable
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', () => {
        const href = item.getAttribute('data-href');
        const isExternal = item.getAttribute('data-external') === 'true';

        if (href) {
            if (isExternal) {
                window.open(href, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = href;
            }
        }
    });
});

