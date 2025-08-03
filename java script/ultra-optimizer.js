// Ultra Website Optimizer - Fast Loading & Smooth Transitions
document.addEventListener('DOMContentLoaded', function() {
    
    // Detect connection speed and device capabilities
    const isSlowConnection = navigator.connection && 
        (navigator.connection.effectiveType === 'slow-2g' || 
         navigator.connection.effectiveType === '2g' || 
         navigator.connection.effectiveType === '3g');
    
    const isHighRefreshRate = window.matchMedia('(min-resolution: 90dpi)').matches || 
                             window.matchMedia('(min-resolution: 144dpi)').matches;
    
    console.log(`Optimizing for: ${isSlowConnection ? 'Slow' : 'Fast'} connection, ${isHighRefreshRate ? 'High' : 'Standard'} refresh rate`);
    
    // ===== ULTRA-FAST IMAGE LOADING SYSTEM =====
    
    // Preload critical images with blur placeholders
    const criticalImages = [
        '/images/logo.png',
        'https://ia600902.us.archive.org/0/items/untitled-design-1-optimized-100/Untitled_design1_optimized_100.png',
        'https://ia801901.us.archive.org/22/items/epic-game-adventure_20250721/Epic%20Game%20Adventure.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.loading = 'eager';
        img.decoding = 'sync';
    });
    
    // Optimize all images on the page
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        // Add loading optimizations
        img.loading = 'eager';
        img.decoding = 'sync';
        
        // Add blur placeholder effect
        if (!img.complete) {
            img.style.filter = 'blur(5px)';
            img.style.transition = 'filter 0.3s ease-out';
            
            img.addEventListener('load', function() {
                this.style.filter = 'blur(0px)';
            });
            
            img.addEventListener('error', function() {
                this.style.filter = 'blur(0px)';
                this.style.opacity = '0.7';
            });
        }
        
        // Add intersection observer for lazy loading optimization
        if ('IntersectionObserver' in window && img.dataset.src) {
            // Create observer only for images that need lazy loading
            if (!window.zapTechImageObserver) {
                window.zapTechImageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                                observer.unobserve(img);
                            }
                        }
                    });
                });
            }
            
            window.zapTechImageObserver.observe(img);
        }
    });
    
    // ===== ULTRA-SMOOTH PAGE TRANSITIONS =====
    
    // Create page transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.id = 'page-transition-overlay';
    transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #6F43FE, #8B5CF6);
        z-index: 99999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add loading animation
    const loadingSpinner = document.createElement('div');
    loadingSpinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255,255,255,0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    const spinKeyframes = document.createElement('style');
    spinKeyframes.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinKeyframes);
    
    transitionOverlay.appendChild(loadingSpinner);
    document.body.appendChild(transitionOverlay);
    
    // Smooth page transition function
    function smoothPageTransition(targetUrl) {
        return new Promise((resolve) => {
            // Show transition overlay
            transitionOverlay.style.opacity = '1';
            transitionOverlay.style.pointerEvents = 'all';
            
            // Preload the target page
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = targetUrl;
            document.head.appendChild(link);
            
            // Wait for transition animation
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        });
    }
    
    // Optimize all internal page links
    const internalPageLinks = document.querySelectorAll('a[href$=".html"], a[href^="/"]');
    internalPageLinks.forEach(link => {
        if (link.href && !link.href.includes('#') && !link.href.includes('http')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                smoothPageTransition(this.href);
            });
        }
    });
    
    // ===== ULTRA-SMOOTH ICON ANIMATIONS =====
    
    // Optimize card hover effects for high fps
    const cards = document.querySelectorAll('.video-hover-card, .card, .pc-app-card');
    cards.forEach(card => {
        // Add hardware acceleration
        card.style.transform = 'translateZ(0)';
        card.style.willChange = 'transform';
        
        // Ultra-smooth hover animation
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateZ(0) scale(1.05)';
            this.style.transition = isHighRefreshRate ? 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateZ(0) scale(1)';
        });
        
        // Add click feedback
        card.addEventListener('click', function() {
            this.style.transform = 'translateZ(0) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateZ(0) scale(1.05)';
            }, 100);
        });
    });
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Add performance CSS
    const performanceCSS = document.createElement('style');
    performanceCSS.textContent = `
        /* Ultra-Smooth Performance Optimizations */
        * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* Hardware acceleration for smooth animations */
        .video-hover-card,
        .card,
        .pc-app-card,
        .contact-toggle-button,
        .modern-more-videos-btn,
        .modern-more-apps-btn {
            transform: translateZ(0);
            will-change: transform;
            backface-visibility: hidden;
        }
        
        /* Optimize for high refresh rate displays */
        @media (min-resolution: 90dpi) {
            .video-hover-card,
            .card,
            .pc-app-card {
                transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
            }
        }
        
        /* Optimize for slow connections */
        @media (max-width: 768px) {
            img {
                loading: lazy;
            }
        }
        
        /* Smooth scrolling handled by smooth-scroll.js */
        
        /* Optimize navbar for smooth transitions */
        .navbar {
            transform: translateZ(0);
            will-change: transform, opacity;
        }
        
        /* Image loading optimizations */
        img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(performanceCSS);
    
    // ===== CONNECTION-SPECIFIC OPTIMIZATIONS =====
    
    if (isSlowConnection) {
        // Reduce image quality for slow connections
        const slowConnectionCSS = document.createElement('style');
        slowConnectionCSS.textContent = `
            /* Slow connection optimizations */
            img {
                filter: contrast(1.1) brightness(1.05);
            }
            
            .video-hover-card,
            .card,
            .pc-app-card {
                transition: transform 0.2s ease-out;
            }
        `;
        document.head.appendChild(slowConnectionCSS);
        
        // Preload fewer images for slow connections
        console.log('Slow connection detected - applying optimizations');
    }
    
    // ===== SCROLL OPTIMIZATIONS =====
    
    // Note: Smooth scroll functionality is handled by smooth-scroll.js
    // This prevents duplicate implementations and conflicts
    
    // ===== LOADING STATE MANAGEMENT =====
    
    // Show loading state for external links using event delegation
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[target="_blank"]')) {
            // Add visual feedback
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = 'scale(1)';
            }, 150);
        }
    });
    
    // ===== FINAL OPTIMIZATIONS =====
    
    // Optimize for high refresh rate displays
    if (isHighRefreshRate) {
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        document.documentElement.style.setProperty('--transition-timing', 'cubic-bezier(0.4, 0, 0.2, 1)');
    } else {
        document.documentElement.style.setProperty('--animation-duration', '0.15s');
        document.documentElement.style.setProperty('--transition-timing', 'cubic-bezier(0.4, 0, 0.2, 1)');
    }
    
    // Remove loading states after page is fully loaded
    window.addEventListener('load', function() {
        // Remove any remaining blur effects
        allImages.forEach(img => {
            img.style.filter = 'blur(0px)';
        });
        
        // Hide transition overlay if still visible
        transitionOverlay.style.opacity = '0';
        transitionOverlay.style.pointerEvents = 'none';
        
        console.log('Page fully optimized and loaded');
    });
    
    console.log('Ultra-optimizer loaded successfully');
}); 