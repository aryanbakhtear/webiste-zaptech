// Performance Optimization for 90fps smooth experience
(function() {
    'use strict';
    
    // Request Animation Frame with 90fps target
    let lastTime = 0;
    const targetFPS = 90;
    const frameInterval = 1000 / targetFPS;
    
    function smoothAnimationFrame(callback) {
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime >= frameInterval) {
            lastTime = currentTime - (deltaTime % frameInterval);
            callback(currentTime);
        } else {
            requestAnimationFrame(() => smoothAnimationFrame(callback));
        }
    }
    
    // Image preloading and optimization
    function preloadImages() {
        const imageUrls = [
            '/images/logo.png',
            '/images/fp1.png',
            '/images/fp2.png',
            '/images/fp3.png',
            '/images/ffp1.png',
            '/images/ffp2.png',
            '/images/bg5fp1.png',
            '/images/bg5fp2.png',
            '/images/bg5fp3.png',
            '/images/bg6fp1.png',
            '/images/bg6fp2.png',
            '/images/bg8f1.png',
            '/images/bg8f3.mp4',
            'https://archive.org/download/assets_task_01k13an55tfhhvafqfhqk7v1kg_1753532357_img_1_1_optimized_100/assets_task_01k13an55tfhhvafqfhqk7v1kg_1753532357_img_1_1_optimized_100.png',
            'https://ia800902.us.archive.org/4/items/20250721-2010-temporary-email-signup-simple-compose-01k-0q-67yecf-6naf-51f-9yqnzhvp-1/20250721_2010_Temporary%20Email%20Signup_simple_compose_01k0q67yecf6naf51f9yqnzhvp%20%281%29.png',
            'https://ia600909.us.archive.org/25/items/20250721-2001-gradient-cartoon-website-simple-compose-01k-0q-5ph-11f-7stg-1kwvgvwm-30f-1/20250721_2001_Gradient%20Cartoon%20Website_simple_compose_01k0q5ph11f7stg1kwvgvwm30f%20%281%29.png',
            'https://ia903105.us.archive.org/32/items/20250721-1952-cartoon-thumbnail-creation-simple-compose-01k-0q-54zjjfs-18sm-3e-9r-9r-3ajp-1/20250721_1952_Cartoon%20Thumbnail%20Creation_simple_compose_01k0q54zjjfs18sm3e9r9r3ajp%20%281%29.png',
            'https://ia801504.us.archive.org/22/items/20250709-2321-anime-guy-thumbnail-simple-compose-01jzrdgqy-5fm-2ag-227wj-4phjwb/20250709_2321_Anime%20Guy%20Thumbnail_simple_compose_01jzrdgqy5fm2ag227wj4phjwb.png',
            'https://ia600904.us.archive.org/25/items/20250705-2331-anime-scene-search-simple-compose-01jzf-6s-7y-7fqz-9df-1bwm-1k-4h-81/20250705_2331_Anime%20Scene%20Search_simple_compose_01jzf6s7y7fqz9df1bwm1k4h81.png',
            'https://ia601402.us.archive.org/1/items/20250706-2115-pixelated-flying-pixie-simple-compose-01jzgf-4n-08fkptrf-8j-3fktkr-6n/20250706_2115_Pixelated%20Flying%20Pixie_simple_compose_01jzgf4n08fkptrf8j3fktkr6n.png'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.loading = 'eager';
            img.decoding = 'async';
        });
    }
    
    // Smooth scrolling optimization
    function smoothScrollTo(element, duration = 800) {
        const targetPosition = element.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                smoothAnimationFrame(animation);
            }
        }
        
        smoothAnimationFrame(animation);
    }
    
    // Easing function for smooth animations
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
    
    // Optimize card hover animations
    function optimizeCardAnimations() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.style.willChange = 'transform';
            card.style.transform = 'translateZ(0)';
            
            // Use Intersection Observer for performance
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) translateZ(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(card);
        });
    }
    
    // Optimize navbar performance
    function optimizeNavbar() {
        const navbar = document.getElementById('navbar');
        const navbarToggle = document.getElementById('navbar-toggle');
        const navbarLeft = document.querySelector('.navbar-left');
        const navbarRight = document.querySelector('.navbar-right');
        
        if (navbar) {
            navbar.style.willChange = 'transform';
            navbar.style.transform = 'translateZ(0)';
        }
        
        if (navbarToggle) {
            navbarToggle.addEventListener('click', function() {
                const isOpen = navbarLeft.classList.contains('active');
                
                if (isOpen) {
                    navbarLeft.style.transform = 'translateX(-100%) translateZ(0)';
                    navbarRight.style.transform = 'translateX(100%) translateZ(0)';
                    setTimeout(() => {
                        navbarLeft.classList.remove('active');
                        navbarRight.classList.remove('active');
                    }, 300);
                } else {
                    navbarLeft.classList.add('active');
                    navbarRight.classList.add('active');
                    smoothAnimationFrame(() => {
                        navbarLeft.style.transform = 'translateX(0) translateZ(0)';
                        navbarRight.style.transform = 'translateX(0) translateZ(0)';
                    });
                }
            });
        }
    }
    
    // Optimize button animations
    function optimizeButtonAnimations() {
        const buttons = document.querySelectorAll('button, .button, .modern-more-websites-btn, .modern-more-videos-btn');
        
        buttons.forEach(button => {
            button.style.willChange = 'transform';
            button.style.transform = 'translateZ(0)';
            
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) translateZ(0)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateZ(0)';
            });
        });
    }
    
    // Optimize video loading
    function optimizeVideoLoading() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            video.preload = 'metadata';
            video.muted = true;
            video.playsInline = true;
            
            // Lazy load videos
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.load();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(video);
        });
    }
    
    // Optimize CSS animations
    function optimizeCSSAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            
            .card, .video-hover-card, .pc-app-card {
                will-change: transform;
                transform: translateZ(0);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .card:hover, .video-hover-card:hover, .pc-app-card:hover {
                transform: translateY(-10px) translateZ(0) scale(1.02);
            }
            
            .navbar {
                will-change: transform;
                transform: translateZ(0);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            button, .button {
                will-change: transform;
                transform: translateZ(0);
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            button:hover, .button:hover {
                transform: scale(1.05) translateZ(0);
            }
            
            img {
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
            }
            
            .bg1, .bg2, .bg3, .bg4, .bg5, .bg6, .bg7, .bg8 {
                will-change: transform;
                transform: translateZ(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Performance monitoring
    function monitorPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        let fps = 0;
        
        function updateFPS() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;
                
                // Log FPS for debugging (remove in production)
                if (fps < 60) {
                    console.log(`Performance warning: ${fps} FPS`);
                }
            }
            
            smoothAnimationFrame(updateFPS);
        }
        
        smoothAnimationFrame(updateFPS);
    }
    
    // Initialize all optimizations
    function initPerformanceOptimizations() {
        // Preload critical images
        preloadImages();
        
        // Optimize animations
        optimizeCardAnimations();
        optimizeNavbar();
        optimizeButtonAnimations();
        optimizeVideoLoading();
        optimizeCSSAnimations();
        
        // Monitor performance
        monitorPerformance();
        
        // Optimize scroll performance
        let ticking = false;
        function updateOnScroll() {
            if (!ticking) {
                smoothAnimationFrame(() => {
                    // Update scroll-based animations here
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', updateOnScroll, { passive: true });
        
        // Optimize resize performance
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Handle resize optimizations
            }, 100);
        }, { passive: true });
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
    } else {
        initPerformanceOptimizations();
    }
    
    // Export functions for global use
    window.smoothScrollTo = smoothScrollTo;
    window.smoothAnimationFrame = smoothAnimationFrame;
    
})();

// Original navbar functionality (keep existing code)
const navbarToggle = document.getElementById('navbar-toggle');
const navbarLeft = document.querySelector('.navbar-left');
const navbarRight = document.querySelector('.navbar-right');

if (navbarToggle) {
    navbarToggle.addEventListener('click', function() {
        navbarLeft.classList.toggle('active');
        navbarRight.classList.toggle('active');
    });
} 