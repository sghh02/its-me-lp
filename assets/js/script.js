// Remove no-js class when JavaScript is available
document.documentElement.classList.remove('no-js');

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
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

// Testimonial carousel with accessibility improvements
function initTestimonialCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const track = document.querySelector('.testimonial-track');
    const dots = document.querySelectorAll('.carousel-dot');

    // Error handling for missing elements
    if (!track || slides.length === 0 || dots.length === 0) {
        return;
    }

    function showSlide(index) {
        if (!track || dots.length === 0) return;
        
        currentSlide = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            const isActive = i === index;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-selected', isActive);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showSlide(index);
            }
        });
    });

    // Auto-play carousel with pause on focus/hover
    let autoplayInterval;

    function startAutoplay() {
        if (slides.length === 0) return;
        
        autoplayInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }

    // Pause autoplay on hover or focus
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
        carousel.addEventListener('focusin', stopAutoplay);
        carousel.addEventListener('focusout', startAutoplay);
    }

    // Start autoplay
    startAutoplay();
}

// Initialize testimonial carousel
initTestimonialCarousel();

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

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Language selector sync with page navigation
// Language switcher functionality
function initLanguageSwitcher() {
    console.log('Initializing language switcher...');
    
    const desktopLangSelect = document.querySelector('.lang-select-desktop');
    const mobileLangSelect = document.querySelector('.lang-select-mobile');
    
    console.log('Desktop selector found:', !!desktopLangSelect);
    console.log('Mobile selector found:', !!mobileLangSelect);

    if (!desktopLangSelect || !mobileLangSelect) {
        console.warn('Language switcher elements not found');
        return;
    }

    function navigateToLanguage(langCode) {
        const currentPath = window.location.pathname;
        const fileName = currentPath.split('/').pop() || 'index.html';
        const isSubpage = currentPath.includes('/ja/') || currentPath.includes('/ko/') || currentPath.includes('/es/');
        
        // 現在のページタイプを維持
        let targetFile = fileName;
        if (fileName === '' || fileName === '/') {
            targetFile = 'index.html';
        }
        
        // 特定のページで多言語版が存在するかチェック
        const supportedPages = ['index.html', 'privacy-policy.html', 'terms-of-service.html'];
        const isPageSupported = supportedPages.includes(targetFile);
        
        // サポートされていないページの場合はindex.htmlにフォールバック
        if (!isPageSupported) {
            targetFile = 'index.html';
        }
        
        const langPaths = {
            'en': isSubpage ? `../${targetFile}` : `./${targetFile}`,
            'ja': isSubpage ? `../ja/${targetFile}` : `./ja/${targetFile}`,
            'ko': isSubpage ? `../ko/${targetFile}` : `./ko/${targetFile}`,
            'es': isSubpage ? `../es/${targetFile}` : `./es/${targetFile}`
        };
        
        if (langPaths[langCode]) {
            window.location.href = langPaths[langCode];
        }
    }

    // Set current language in selectors
    const currentLang = document.documentElement.lang || 'en';
    desktopLangSelect.value = currentLang;
    mobileLangSelect.value = currentLang;

    // Add event listeners
    console.log('Adding event listeners...');
    
    desktopLangSelect.addEventListener('change', (e) => {
        console.log('Desktop language changed to:', e.target.value);
        mobileLangSelect.value = e.target.value;
        navigateToLanguage(e.target.value);
    });

    mobileLangSelect.addEventListener('change', (e) => {
        console.log('Mobile language changed to:', e.target.value);
        desktopLangSelect.value = e.target.value;
        navigateToLanguage(e.target.value);
    });
    
    console.log('Language switcher initialized successfully');
}

// Initialize language switcher
initLanguageSwitcher();

// Screenshot slideshow
function initScreenshotSlideshow() {
    let currentScreenshot = 0;
    const screenshotSlides = document.querySelectorAll('.screenshot-slide');

    if (screenshotSlides.length === 0) {
        return;
    }

    function showNextScreenshot() {
        if (screenshotSlides.length === 0) return;
        
        screenshotSlides[currentScreenshot].classList.remove('active');
        currentScreenshot = (currentScreenshot + 1) % screenshotSlides.length;
        screenshotSlides[currentScreenshot].classList.add('active');
    }

    // Change screenshot every 3 seconds
    if (screenshotSlides.length > 0) {
        setInterval(showNextScreenshot, 3000);
    }
}

// Initialize screenshot slideshow
initScreenshotSlideshow();

// Global error handler (production-ready)
window.addEventListener('error', (e) => {
    // Silent error handling for production
    // In development, you can add console.error back
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    // Silent error handling for production
    // In development, you can add console.error back
});