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
                if (!open) {
                    navbar.classList.remove('open');
                    document.body.classList.remove('navbar-open');
                }
            }
        }
        animationFrame = requestAnimationFrame(step);
    }

    toggle.addEventListener('click', function() {
        if (navbar.classList.contains('open')) {
            animateNavbar(false);
            document.body.classList.remove('navbar-open');
        } else {
            navbar.classList.add('open');
            document.body.classList.add('navbar-open');
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
            document.body.classList.remove('navbar-open');
            isAnimating = false;
        }
    });

    // Close navigation when About Us is clicked
    const aboutUsLinks = document.querySelectorAll('a[href*="#bg8"], a[href*="index.html#bg8"]');
    aboutUsLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbar.classList.contains('open')) {
                animateNavbar(false);
                document.body.classList.remove('navbar-open');
            }
        });
    });

    // Close navigation when any navigation link is clicked
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Don't close navbar if clicking on dropdown toggle
            if (this.classList.contains('dropdown-toggle')) {
                return;
            }
            
            // Don't close navbar if clicking on dropdown menu items in mobile view
            if (navbar.classList.contains('open') && this.closest('.dropdown-menu')) {
                return;
            }
            
            if (navbar.classList.contains('open')) {
                animateNavbar(false);
                document.body.classList.remove('navbar-open');
            }
        });
    });

    // Dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            const isActive = dropdown.classList.contains('active');
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown').forEach(d => {
                d.classList.remove('active');
            });
            
            // Toggle current dropdown
            if (!isActive) {
                dropdown.classList.add('active');
            }
            
            // If navbar is open on mobile, prevent closing the navbar
            if (navbar.classList.contains('open')) {
                e.stopPropagation();
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(d => {
                d.classList.remove('active');
            });
        }
    });

    // Close dropdown when navbar closes
    toggle.addEventListener('click', function() {
        // Close all dropdowns when navbar closes
        document.querySelectorAll('.dropdown').forEach(d => {
            d.classList.remove('active');
        });
    });
}); 