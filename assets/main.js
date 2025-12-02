// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Gallery carousel functionality
function initializeGalleryCarousel() {
    const galleryData = [
        { id: 1, src: 'https://images.pexels.com/photos/8534065/pexels-photo-8534065.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop', title: 'Flawless Balayage & Blowout', category: 'color' },
        { id: 2, src: 'https://images.pexels.com/photos/8431872/pexels-photo-8431872.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop', title: 'Elegant Wedding Updo', category: 'bridal' },
        { id: 3, src: 'https://images.pexels.com/photos/8534069/pexels-photo-8534069.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop', title: 'Classic Bob with Modern Twist', category: 'haircut' },
        { id: 4, src: 'https://images.pexels.com/photos/8534077/pexels-photo-8534077.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop', title: 'Dramatic Smokey Eye Makeup', category: 'makeup' },
    ];

    let currentActiveIndex = 0;
    const galleryContainer = document.querySelector('.gallery-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!galleryContainer || !prevBtn || !nextBtn) return;

    // Utility: proper modulo (handles negative values)
    function mod(n, m) {
        return ((n % m) + m) % m;
    }

    // Function to determine the class for each card position (wrap-aware)
    function getCardClass(index, activeIndex = currentActiveIndex) {
        const len = galleryData.length;
        if (len === 0) return 'card-hidden';

        let delta = mod(index - activeIndex, len);
        if (delta > Math.floor(len / 2)) delta -= len;

        if (delta === 0) return 'card-active';
        if (delta === -1) return 'card-prev';
        if (delta === 1) return 'card-next';
        if (delta === -2) return 'card-prev-far';
        if (delta === 2) return 'card-next-far';
        return 'card-hidden';
    }

    // Function to render the cards in their positions
    function renderGallery() {
        galleryContainer.innerHTML = ''; 

        galleryData.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('gallery-card', getCardClass(index));
            card.dataset.index = index;

            card.innerHTML = `
                <img src="${item.src}" alt="${item.title}">
                <div class="card-overlay">
                    <p class="text-xl font-bold">${item.title}</p>
                </div>
            `;
            
            galleryContainer.appendChild(card);
        });
    }

    // Function to handle card movement (swipe)
    function navigate(direction) {
        const len = galleryData.length;
        if (len === 0) return;

        const newIndex = mod(currentActiveIndex + direction, len);

        // Update classes on existing DOM cards to animate to their new positions
        const cards = document.querySelectorAll('.gallery-card');
        cards.forEach(card => {
            const idx = Number(card.dataset.index);
            card.classList.remove('card-active', 'card-prev', 'card-next', 'card-prev-far', 'card-next-far', 'card-hidden');
            const newClass = getCardClass(idx, newIndex);
            card.classList.add(newClass);
        });

        // Force a reflow to ensure transition starts
        document.body.offsetHeight;

        setTimeout(() => {
            currentActiveIndex = newIndex;
            renderGallery();
        }, 250);
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // Initialize gallery
    renderGallery();

    // Auto-advance carousel every 5 seconds
    setInterval(() => navigate(1), 5000);
}

// Hero carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const totalSlides = slides.length;

if (slides.length > 0 && dots.length > 0) {
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.transform = i < index ? 'translateX(-100%)' : i > index ? 'translateX(100%)' : 'translateX(0)';
        });

        slides[index].classList.add('active');
        slides[index].style.opacity = '1';
        slides[index].style.transform = 'translateX(0)';

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

    // Hero carousel navigation event listeners
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
                    }, index * 100);
                });
            }
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '0px'
});

// Observe all scroll sections
scrollSections.forEach(section => {
    scrollObserver.observe(section);
});

// Parallax effect for hero section (throttled for performance)
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroSection = document.getElementById('hero-carousel');
            const aboutSection = document.getElementById('about-section');
            
            // Parallax effect for hero background (only on desktop)
            if (heroSection && window.innerWidth >= 1024) {
                const parallaxSpeed = 0.3;
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
            
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// SERVICES PAGE SPECIFIC FUNCTIONALITY
// ============================================

// Service gender filtering
const genderTabs = document.querySelectorAll('.gender-tab');
const serviceCards = document.querySelectorAll('.service-card');

let currentGender = 'all';

// Gender tab functionality
if (genderTabs.length > 0) {
    genderTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active gender tab styling
            genderTabs.forEach(t => {
                t.classList.remove('text-black');
                t.classList.add('bg-gray-100', 'text-gray-700');
                t.style.backgroundImage = '';
            });
            
            tab.classList.remove('bg-gray-100', 'text-gray-700');
            tab.classList.add('text-black');
            tab.style.backgroundImage = "url('assets/metallicGold.jpg')";
            tab.style.backgroundSize = 'cover';
            tab.style.backgroundPosition = 'center';
            
            currentGender = tab.dataset.gender;
            filterServices();
        });
    });
}

// Filter function
function filterServices() {
    serviceCards.forEach(card => {
        const cardGender = card.dataset.gender;
        const genderMatch = currentGender === 'all' || cardGender === currentGender || cardGender === 'all';
        
        if (genderMatch) {
            card.classList.remove('hidden');
            card.style.animationDelay = '0.1s';
            card.classList.add('animate-slide-up');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Add hover effects to service cards
if (serviceCards.length > 0) {
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

// Initialize all carousels and features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGalleryCarousel();
    initializeHorizontalGallery();
});

// Horizontal scrolling gallery functionality
function initializeHorizontalGallery() {
    const galleryScroll = document.getElementById('galleryScroll');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    if (!galleryScroll || !scrollLeftBtn || !scrollRightBtn) return;

    scrollLeftBtn.addEventListener('click', () => {
        galleryScroll.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });

    scrollRightBtn.addEventListener('click', () => {
        galleryScroll.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });

    // Auto-scroll functionality (optional)
    let autoScrollInterval = setInterval(() => {
        if (galleryScroll.scrollLeft >= galleryScroll.scrollWidth - galleryScroll.clientWidth) {
            galleryScroll.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            galleryScroll.scrollBy({ left: 300, behavior: 'smooth' });
        }
    }, 4000);

    // Pause auto-scroll on hover
    galleryScroll.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    galleryScroll.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            if (galleryScroll.scrollLeft >= galleryScroll.scrollWidth - galleryScroll.clientWidth) {
                galleryScroll.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                galleryScroll.scrollBy({ left: 300, behavior: 'smooth' });
            }
        }, 4000);
    });
}
