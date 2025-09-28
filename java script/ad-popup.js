// Advertisement Popup JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Show popup after 2 seconds (removed session storage for testing)
    setTimeout(showAdPopup, 2000);
    
    // Initialize popup functionality
    initAdPopup();
});

function showAdPopup() {
    const overlay = document.getElementById('ad-popup-overlay');
    if (overlay) {
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function hideAdPopup() {
    const overlay = document.getElementById('ad-popup-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Add exit animation
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 400);
    }
}

function initAdPopup() {
    const overlay = document.getElementById('ad-popup-overlay');
    const closeBtn = document.getElementById('ad-close-btn');
    const adImage = document.querySelector('.ad-image');
    
    if (!overlay) return;
    
    // Close button functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideAdPopup();
        });
    }
    
    // Close when clicking outside the popup
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            hideAdPopup();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('show')) {
            hideAdPopup();
        }
    });
    
    // Image click to close (optional)
    if (adImage) {
        adImage.addEventListener('click', function(e) {
            e.preventDefault();
            hideAdPopup();
        });
    }
    
    // Add entrance animation for image
    if (adImage) {
        setTimeout(() => {
            adImage.style.animation = 'slideInBounce 0.6s ease-out forwards';
        }, 200);
    }
}

// Add entrance animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInBounce {
        0% {
            transform: scale(0.3) translateY(-100px);
            opacity: 0;
        }
        50% {
            transform: scale(1.05) translateY(0);
            opacity: 0.8;
        }
        70% {
            transform: scale(0.95) translateY(0);
            opacity: 0.9;
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Add image loading animation
document.addEventListener('DOMContentLoaded', function() {
    const adImage = document.querySelector('.ad-image');
    if (adImage) {
        adImage.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transform = 'scale(0.8)';
            this.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, 100);
        });
    }
});
