// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Hide all slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.transform = i < index ? 'translateX(-100%)' : i > index ? 'translateX(100%)' : 'translateX(0)';
    });

    // Show current slide
    slides[index].classList.add('active');
    slides[index].style.opacity = '1';
    slides[index].style.transform = 'translateX(0)';

    // Update dots
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
            dot.classList.remove('bg-white', 'bg-opacity-50');
            dot.classList.add('bg-gold');
        } else {
            dot.classList.remove('active');
            dot.classList.remove('bg-gold');
            dot.classList.add('bg-white', 'bg-opacity-50');
        }
    });

    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
}

// Carousel navigation event listeners
document.querySelector('.carousel-next').addEventListener('click', nextSlide);
document.querySelector('.carousel-prev').addEventListener('click', prevSlide);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto-play carousel
let autoPlay = setInterval(nextSlide, 5000);

// Pause auto-play on hover
// const carousel = document.getElementById('hero-carousel');
// carousel.addEventListener('mouseenter', () => {
//     clearInterval(autoPlay);
// });

// carousel.addEventListener('mouseleave', () => {
//     autoPlay = setInterval(nextSlide, 5000);
// });

// Initialize carousel
showSlide(0);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const scrollSections = document.querySelectorAll('.scroll-section');
const staggerItems = document.querySelectorAll('.stagger-item');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // For stagger items within the section
            if (entry.target.querySelectorAll('.stagger-item').length > 0) {
                const items = entry.target.querySelectorAll('.stagger-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 200);
                });
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all scroll sections
scrollSections.forEach(section => {
    scrollObserver.observe(section);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.getElementById('hero-carousel');
    const aboutSection = document.getElementById('about-section');
    
    // Parallax effect for hero background
    if (heroSection) {
        const parallaxSpeed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
    
    // About section overlay effect
    if (aboutSection) {
        const aboutOffset = aboutSection.offsetTop;
        const windowHeight = window.innerHeight;
        
        if (scrolled > aboutOffset - windowHeight * 0.7) {
            aboutSection.classList.add('visible');
        }
    }
});
