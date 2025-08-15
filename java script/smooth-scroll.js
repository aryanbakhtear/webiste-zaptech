<<<<<<< HEAD
// Ultra-Smooth Scrolling for High Frame Rate Displays (up to 144fps)
document.addEventListener('DOMContentLoaded', function() {
    
    // Detect high refresh rate displays
    const isHighRefreshRate = window.matchMedia('(min-resolution: 90dpi)').matches || 
                             window.matchMedia('(min-resolution: 144dpi)').matches;
    
    // Set optimal settings based on display
    const scrollDuration = isHighRefreshRate ? 800 : 600;
    const easingPower = isHighRefreshRate ? 3 : 2;
    
    // Smooth scroll function optimized for high fps
    function smoothScrollTo(target, duration = scrollDuration) {
        const start = performance.now();
        const startY = window.pageYOffset;
        const targetY = target.offsetTop - 80; // Account for fixed navbar
        
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, easingPower);
        }
        
        function step(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            
            window.scrollTo(0, startY + (targetY - startY) * eased);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    // Optimize all internal links for smooth scrolling
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });
    
    // Only add minimal CSS for smooth scrolling without interfering with existing styles
    const style = document.createElement('style');
    style.textContent = `
        /* Ultra-Smooth Scrolling Optimizations - Minimal and Safe */
        html {
            scroll-behavior: auto; /* Disable default smooth scroll for custom implementation */
        }
        
        /* Only optimize scroll performance without changing positions */
        body {
            -webkit-overflow-scrolling: touch;
        }
        
        /* Optimize for high refresh rate displays - only font smoothing */
        @media (min-resolution: 90dpi) {
            * {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
        }
        
        /* Ultra-smooth animations for high fps displays - only for safe elements */
        @media (min-resolution: 144dpi) {
            .video-hover-card,
            .card,
            .pc-app-card,
            .contact-toggle-button,
            .modern-more-videos-btn,
            .modern-more-apps-btn {
                transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Optimize for high refresh rate displays
    if (isHighRefreshRate) {
        // Set CSS custom properties for high fps
        document.documentElement.style.setProperty('--scroll-duration', '800ms');
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        document.documentElement.style.setProperty('--transition-timing', 'cubic-bezier(0.4, 0, 0.2, 1)');
    } else {
        document.documentElement.style.setProperty('--scroll-duration', '600ms');
        document.documentElement.style.setProperty('--animation-duration', '0.15s');
        document.documentElement.style.setProperty('--transition-timing', 'cubic-bezier(0.4, 0, 0.2, 1)');
    }
    
    // Optimize hover animations for high fps - only for safe elements
    const hoverElements = document.querySelectorAll('.video-hover-card, .card, .pc-app-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Optimize buttons for high fps
    const buttons = document.querySelectorAll('.contact-toggle-button, .modern-more-videos-btn, .modern-more-apps-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    console.log(`Smooth scrolling optimized for ${isHighRefreshRate ? 'high refresh rate' : 'standard'} display`);
=======
// Ultra-Smooth Scrolling for High Frame Rate Displays (up to 144fps)
document.addEventListener('DOMContentLoaded', function() {
    
    // Detect high refresh rate displays
    const isHighRefreshRate = window.matchMedia('(min-resolution: 90dpi)').matches || 
                             window.matchMedia('(min-resolution: 144dpi)').matches;
    
    // Set optimal settings based on display
    const scrollDuration = isHighRefreshRate ? 800 : 600;
    const easingPower = isHighRefreshRate ? 3 : 2;
    
    // Smooth scroll function optimized for high fps
    function smoothScrollTo(target, duration = scrollDuration) {
        const start = performance.now();
        const startY = window.pageYOffset;
        const targetY = target.offsetTop - 80; // Account for fixed navbar
        
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, easingPower);
        }
        
        function step(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            
            window.scrollTo(0, startY + (targetY - startY) * eased);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    // Optimize all internal links for smooth scrolling
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });
    
    // Only add minimal CSS for smooth scrolling without interfering with existing styles
    const style = document.createElement('style');
    style.textContent = `
        /* Ultra-Smooth Scrolling Optimizations - Minimal and Safe */
        html {
            scroll-behavior: auto; /* Disable default smooth scroll for custom implementation */
        }
        
        /* Only optimize scroll performance without changing positions */
        body {
            -webkit-overflow-scrolling: touch;
        }
        
        /* Optimize for high refresh rate displays - only font smoothing */
        @media (min-resolution: 90dpi) {
            * {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
        }
        
        /* Ultra-smooth animations for high fps displays - only for safe elements */
        @media (min-resolution: 144dpi) {
            .video-hover-card,
            .card,
            .pc-app-card,
            .contact-toggle-button,
            .modern-more-videos-btn,
            .modern-more-apps-btn {
                transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Optimize for high refresh rate displays
    if (isHighRefreshRate) {
        // Set CSS custom properties for high fps
        document.documentElement.style.setProperty('--scroll-duration', '800ms');
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        document.documentElement.style.setProperty('--transition-timing', 'cubic-bezier(0.4, 0, 0.2, 1)');
    } else {
        document.documentElement.style.setProperty('--scroll-duration', '600ms');
        document.documentElement.style.setProperty('--animation-duration', '0.15s');
        document.documentElement.style.setProperty('--transition-timing', 'cubic-bezier(0.4, 0, 0.2, 1)');
    }
    
    // Optimize hover animations for high fps - only for safe elements
    const hoverElements = document.querySelectorAll('.video-hover-card, .card, .pc-app-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Optimize buttons for high fps
    const buttons = document.querySelectorAll('.contact-toggle-button, .modern-more-videos-btn, .modern-more-apps-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    console.log(`Smooth scrolling optimized for ${isHighRefreshRate ? 'high refresh rate' : 'standard'} display`);
>>>>>>> v0.05
}); 