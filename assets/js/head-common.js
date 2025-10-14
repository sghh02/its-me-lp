// Common head elements injection
(function() {
    'use strict';
    
    // Get current page info
    const currentPath = window.location.pathname;
    const isSubpage = currentPath.includes('/ja/') || currentPath.includes('/ko/') || currentPath.includes('/es/');
    const currentLang = document.documentElement.lang || 'en';
    
    // Base URL for the site (used if needed elsewhere)
    const baseUrl = 'https://itsme-types.com';
    
    // Determine current page type
    let pageType = 'index';
    if (currentPath.includes('privacy-policy')) {
        pageType = 'privacy-policy';
    } else if (currentPath.includes('terms-of-service')) {
        pageType = 'terms-of-service';
    }
    
    // Create and inject meta elements
    function injectMetaElements() {
        const head = document.head;
        // Security headers are set via Netlify config. Only add SEO-related meta here.
        const robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        head.appendChild(robotsMeta);
    }
    
    // Hreflang tags are managed statically in HTML for SEO reliability
    
    // Create and inject favicon links
    function injectFaviconLinks() {
        const head = document.head;
        
        // Determine relative path based on location
        const pathPrefix = isSubpage ? '../' : '';
        
        // Favicon comment
        const faviconComment = document.createComment(' Favicon ');
        head.appendChild(faviconComment);
        
        // Favicon links
        const faviconLinks = [
            { rel: 'icon', type: 'image/x-icon', href: `${pathPrefix}favicon.ico` },
            { rel: 'apple-touch-icon', sizes: '180x180', href: `${pathPrefix}apple-touch-icon.png` },
            { rel: 'icon', type: 'image/png', sizes: '192x192', href: `${pathPrefix}assets/images/app_icon/Icon-maskable-192.png` },
            { rel: 'icon', type: 'image/png', sizes: '512x512', href: `${pathPrefix}assets/images/app_icon/Icon-maskable-512.png` }
        ];
        
        faviconLinks.forEach(linkInfo => {
            const link = document.createElement('link');
            link.setAttribute('rel', linkInfo.rel);
            if (linkInfo.type) link.setAttribute('type', linkInfo.type);
            if (linkInfo.sizes) link.setAttribute('sizes', linkInfo.sizes);
            link.setAttribute('href', linkInfo.href);
            head.appendChild(link);
        });
        
        // Manifest link
        const manifestLink = document.createElement('link');
        manifestLink.setAttribute('rel', 'manifest');
        manifestLink.setAttribute('href', `${pathPrefix}manifest.json`);
        head.appendChild(manifestLink);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            injectMetaElements();
            injectFaviconLinks();
        });
    } else {
        injectMetaElements();
        injectFaviconLinks();
    }
})();
