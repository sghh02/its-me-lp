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
    const desktopLangSelect = document.querySelector('.lang-select-desktop');
    const mobileLangSelect = document.querySelector('.lang-select-mobile');

    if (!desktopLangSelect || !mobileLangSelect) {
        return;
    }

    function navigateToLanguage(langCode) {
        // Save user language preference
        localStorage.setItem('preferredLanguage', langCode);
        
        const currentPath = window.location.pathname;
        console.log('🔍 Debug - currentPath:', currentPath, 'langCode:', langCode);
        
        // より堅牢なファイル名抽出ロジック
        let targetFile = 'index.html';
        const pathParts = currentPath.split('/').filter(part => part);
        
        if (pathParts.length > 0) {
            const lastPart = pathParts[pathParts.length - 1];
            if (lastPart.includes('.html')) {
                targetFile = lastPart;
            } else {
                // パスの最後がディレクトリの場合、該当するHTMLファイルを探す
                const languageDirs = ['ja', 'ko', 'es'];
                if (languageDirs.includes(lastPart)) {
                    // 言語ディレクトリ内のindex.html
                    targetFile = 'index.html';
                } else {
                    // その他の場合もindex.htmlとする
                    targetFile = 'index.html';
                }
            }
        }
        
        // 特定のページで多言語版が存在するかチェック
        const supportedPages = ['index.html', 'privacy-policy.html', 'terms-of-service.html'];
        const isPageSupported = supportedPages.includes(targetFile);
        
        // サポートされていないページの場合はindex.htmlにフォールバック
        if (!isPageSupported) {
            targetFile = 'index.html';
        }
        
        const langPaths = {
            'en': `/${targetFile}`,
            'ja': `/ja/${targetFile}`,
            'ko': `/ko/${targetFile}`,
            'es': `/es/${targetFile}`
        };
        
        console.log('🔍 Debug - targetFile:', targetFile, 'navigating to:', langPaths[langCode]);
        
        if (langPaths[langCode]) {
            window.location.href = langPaths[langCode];
        } else {
            console.error('❌ No valid path found for langCode:', langCode);
        }
    }

    // Set current language in selectors
    const currentLang = document.documentElement.lang || 'en';
    desktopLangSelect.value = currentLang;
    mobileLangSelect.value = currentLang;

    // Add event listeners
    desktopLangSelect.addEventListener('change', (e) => {
        mobileLangSelect.value = e.target.value;
        navigateToLanguage(e.target.value);
    });

    mobileLangSelect.addEventListener('change', (e) => {
        desktopLangSelect.value = e.target.value;
        navigateToLanguage(e.target.value);
    });
}

// Initialize language switcher
initLanguageSwitcher();

// Language detection and suggestion banner
function initLanguageDetection() {
    // Only run on root path
    const currentPath = window.location.pathname;
    const isRootPath = currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/its-me-lp/') || currentPath.endsWith('/its-me-lp/index.html');
    
    if (!isRootPath) {
        return;
    }
    
    // Check if user is a crawler/bot
    if (/bot|crawler|spider|googlebot|bingbot|yandexbot|facebookexternalhit|twitterbot|linkedinbot/i.test(navigator.userAgent)) {
        return;
    }
    
    // Check if user has already made a language choice
    const userPreference = localStorage.getItem('preferredLanguage');
    if (userPreference) {
        return;
    }
    
    // Check if banner was already dismissed today
    const bannerDismissed = sessionStorage.getItem('langBannerDismissed');
    if (bannerDismissed) {
        return;
    }
    
    // Detect browser language
    const browserLang = (navigator.language || navigator.languages[0] || 'en').toLowerCase();
    
    // Map browser languages to available languages
    const langMap = {
        'ja': 'ja',
        'ja-jp': 'ja',
        'ko': 'ko', 
        'ko-kr': 'ko',
        'es': 'es',
        'es-es': 'es',
        'es-mx': 'es',
        'es-ar': 'es',
        'es-co': 'es'
    };
    
    const detectedLang = langMap[browserLang] || langMap[browserLang.split('-')[0]];
    
    // Show suggestion banner if detected language is available
    if (detectedLang && detectedLang !== 'en') {
        showLanguageSuggestionBanner(detectedLang);
    }
}

function showLanguageSuggestionBanner(suggestedLang) {
    const langNames = {
        'ja': '日本語',
        'ko': '한국어',
        'es': 'Español'
    };
    
    const langMessages = {
        'ja': '🌍 日本語でご覧になりますか？',
        'ko': '🌍 한국어로 보시겠습니까?',
        'es': '🌍 ¿Ver en Español?'
    };
    
    const langButtons = {
        'ja': '日本語で表示',
        'ko': '한국어로 보기',
        'es': 'Ver en Español'
    };
    
    const langUrls = {
        'ja': './ja/',
        'ko': './ko/',
        'es': './es/'
    };
    
    // Create banner element
    const banner = document.createElement('div');
    banner.id = 'lang-suggestion-banner';
    banner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #8B7EC8 0%, #92C5F7 100%);
        color: white;
        padding: 12px 20px;
        font-size: 14px;
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        animation: slideDown 0.3s ease-out;
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }
        #lang-suggestion-banner button {
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
            transition: all 0.2s ease;
        }
        #lang-suggestion-banner button:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-1px);
        }
        #lang-suggestion-banner .close-btn {
            background: transparent;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;
    document.head.appendChild(style);
    
    banner.innerHTML = `
        <span>${langMessages[suggestedLang]}</span>
        <button onclick="acceptLanguageSuggestion('${suggestedLang}')">${langButtons[suggestedLang]}</button>
        <button onclick="dismissLanguageBanner()" class="close-btn">×</button>
    `;
    
    // Add banner to page
    document.body.insertBefore(banner, document.body.firstChild);
    
    // Adjust body padding to account for banner
    document.body.style.paddingTop = '60px';
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
        dismissLanguageBanner();
    }, 10000);
}

// Global functions for banner interaction
window.acceptLanguageSuggestion = function(lang) {
    // Save user preference
    localStorage.setItem('preferredLanguage', lang);
    sessionStorage.setItem('langBannerDismissed', 'true');
    
    // Navigate to language version
    const langUrls = {
        'ja': './ja/',
        'ko': './ko/',
        'es': './es/'
    };
    
    if (langUrls[lang]) {
        window.location.href = langUrls[lang];
    }
};

window.dismissLanguageBanner = function() {
    const banner = document.getElementById('lang-suggestion-banner');
    if (banner) {
        banner.style.animation = 'slideUp 0.3s ease-out forwards';
        
        // Add slide up animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from { transform: translateY(0); }
                to { transform: translateY(-100%); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            banner.remove();
            document.body.style.paddingTop = '';
        }, 300);
    }
    
    // Remember dismissal for this session
    sessionStorage.setItem('langBannerDismissed', 'true');
};

// Initialize language detection
initLanguageDetection();

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