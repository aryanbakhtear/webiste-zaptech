document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navbar-toggle');
    let isAnimating = false;
    let animationFrame;

    function animateNavbar(open) {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        isAnimating = true;
        let start = null;
        const duration = 120; // ms (very fast)
        const fromY = open ? -40 : 0;
        const toY = open ? 0 : -40;
        const fromOpacity = open ? 0 : 1;
        const toOpacity = open ? 1 : 0;

        function easeInOut(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = easeInOut(progress);
            const y = fromY + (toY - fromY) * eased;
            const opacity = fromOpacity + (toOpacity - fromOpacity) * eased;
            navbar.style.transform = `translateY(${y}px)`;
            navbar.style.opacity = opacity;
            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            } else {
                navbar.style.transform = open ? 'translateY(0)' : '';
                navbar.style.opacity = open ? '1' : '';
                isAnimating = false;
                if (!open) navbar.classList.remove('open');
            }
        }
        animationFrame = requestAnimationFrame(step);
    }

    toggle.addEventListener('click', function() {
        if (navbar.classList.contains('open')) {
            animateNavbar(false);
        } else {
            navbar.classList.add('open');
            animateNavbar(true);
        }
    });

    // Auto-close mobile nav if resizing above 1108px
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1108 && navbar.classList.contains('open')) {
            if (animationFrame) cancelAnimationFrame(animationFrame);
            navbar.style.transform = '';
            navbar.style.opacity = '';
            navbar.classList.remove('open');
            isAnimating = false;
        }
    });

    // Close navigation when About Us is clicked
    const aboutUsLinks = document.querySelectorAll('a[href*="#bg8"], a[href*="index.html#bg8"]');
    aboutUsLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbar.classList.contains('open')) {
                animateNavbar(false);
            }
        });
    });
}); 