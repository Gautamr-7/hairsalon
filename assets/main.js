// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const totalSlides = slides.length;

if (slides.length > 0 && dots.length > 0) {
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
    const carouselNext = document.querySelector('.carousel-next');
    const carouselPrev = document.querySelector('.carousel-prev');
    
    if (carouselNext) carouselNext.addEventListener('click', nextSlide);
    if (carouselPrev) carouselPrev.addEventListener('click', prevSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-play carousel
    let autoPlay = setInterval(nextSlide, 5000);

    // Initialize carousel
    showSlide(0);
}

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

// ============================================
// SERVICES PAGE SPECIFIC FUNCTIONALITY
// ============================================

// Service category filtering
const categories = document.querySelectorAll('.service-category');
const serviceCards = document.querySelectorAll('.service-card');

if (categories.length > 0 && serviceCards.length > 0) {
    categories.forEach(category => {
        category.addEventListener('click', () => {
            // Update active category styling
            categories.forEach(cat => {
                cat.classList.remove('bg-gold');
                cat.classList.add('bg-gray-700');
                cat.querySelector('span').classList.remove('text-black');
                cat.querySelector('span').classList.add('text-white');
            });
            
            category.classList.add('bg-gold');
            category.classList.remove('bg-gray-700');
            category.querySelector('span').classList.add('text-black');
            category.querySelector('span').classList.remove('text-white');
            
            // Show/hide services based on category
            const selectedCategory = category.dataset.category;
            serviceCards.forEach(card => {
                if (card.classList.contains(selectedCategory + '-service')) {
                    card.classList.remove('hidden');
                    card.style.animationDelay = '0.1s';
                    card.classList.add('animate-slide-up');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Add hover effects to service cards
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('transform', 'scale-105');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('transform', 'scale-105');
        });
    });
}

// Services page scroll animations
const servicesObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, servicesObserverOptions);

// Observe elements for scroll animations on services page
document.querySelectorAll('.animate-slide-in-left, .animate-slide-in-right, .animate-slide-up').forEach(el => {
    servicesObserver.observe(el);
});
