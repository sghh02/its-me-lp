// Common head elements injection
(function() {
    'use strict';
    
    // Get current page info
    const currentPath = window.location.pathname;
    const isSubpage = currentPath.includes('/ja/') || currentPath.includes('/ko/') || currentPath.includes('/es/');
    const currentLang = document.documentElement.lang || 'en';
    
    // Base URL for the site
    const baseUrl = 'https://sghh02.github.io/its-me-lp';
    
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
        
        // Security Headers
        const securityHeaders = [
            { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
            { 'http-equiv': 'X-Frame-Options', content: 'DENY' },
            { 'http-equiv': 'X-XSS-Protection', content: '1; mode=block' },
            { 'http-equiv': 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
            { 'http-equiv': 'Permissions-Policy', content: 'geolocation=(), microphone=(), camera=()' },
            { 'http-equiv': 'Content-Security-Policy', content: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';" }
        ];
        
        // Add security headers
        securityHeaders.forEach(header => {
            const meta = document.createElement('meta');
            if (header['http-equiv']) {
                meta.setAttribute('http-equiv', header['http-equiv']);
            }
            meta.setAttribute('content', header.content);
            head.appendChild(meta);
        });
        
        // Add SEO meta
        const robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        head.appendChild(robotsMeta);
    }
    
    // Create and inject hreflang tags
    function injectHreflangTags() {
        const head = document.head;
        
        // Generate URLs based on page type
        const urls = {
            'en': pageType === 'index' ? `${baseUrl}/` : `${baseUrl}/${pageType}.html`,
            'ja': pageType === 'index' ? `${baseUrl}/ja/` : `${baseUrl}/ja/${pageType}.html`,
            'ko': pageType === 'index' ? `${baseUrl}/ko/` : `${baseUrl}/ko/${pageType}.html`,
            'es': pageType === 'index' ? `${baseUrl}/es/` : `${baseUrl}/es/${pageType}.html`
        };
        
        // Create hreflang comment
        const hreflangComment = document.createComment(' Hreflang Tags ');
        head.appendChild(hreflangComment);
        
        // Add hreflang links
        Object.entries(urls).forEach(([lang, url]) => {
            const link = document.createElement('link');
            link.setAttribute('rel', 'alternate');
            link.setAttribute('hreflang', lang);
            link.setAttribute('href', url);
            head.appendChild(link);
        });
        
        // Add x-default
        const defaultLink = document.createElement('link');
        defaultLink.setAttribute('rel', 'alternate');
        defaultLink.setAttribute('hreflang', 'x-default');
        defaultLink.setAttribute('href', urls.en);
        head.appendChild(defaultLink);
    }
    
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
            injectHreflangTags();
            injectFaviconLinks();
        });
    } else {
        injectMetaElements();
        injectHreflangTags();
        injectFaviconLinks();
    }
})();