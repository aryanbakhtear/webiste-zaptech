// Sound effects for hover and click interactions across all pages
class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.clickAudio = null;
        this.hoverAudio = null;
        this.initAudio();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // Load audio files
            this.loadClickAudio();
            this.loadHoverAudio();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    loadClickAudio() {
        this.clickAudio = new Audio('click.mp3');
        this.clickAudio.preload = 'auto';
        this.clickAudio.volume = 0.3; // Set volume to 30%
    }

    loadHoverAudio() {
        this.hoverAudio = new Audio('hover.flac');
        this.hoverAudio.preload = 'auto';
        this.hoverAudio.volume = 0.25; // Set volume to 25%
        
        // Add error handling for hover audio
        this.hoverAudio.addEventListener('error', (e) => {
            console.error('Hover audio failed to load:', e);
        });
        
        this.hoverAudio.addEventListener('canplaythrough', () => {
            console.log('Hover audio loaded successfully');
        });
    }

    playHoverSound() {
        if (this.hoverAudio) {
            // Reset audio to beginning and play
            this.hoverAudio.currentTime = 0;
            this.hoverAudio.play().catch(e => {
                console.log('Hover audio play failed:', e);
            });
        } else {
            console.log('Hover audio not loaded');
        }
    }

    playHoverEffect() {
        if (!this.audioContext) return;
        
        // Deep bass hover sound with electronic character
        const oscillator = this.audioContext.createOscillator();
        const bassOscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const bassGainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        const bassFilter = this.audioContext.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        bassOscillator.connect(bassFilter);
        bassFilter.connect(bassGainNode);
        bassGainNode.connect(this.audioContext.destination);
        
        // Main electronic sound
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
        oscillator.type = 'square';
        
        // Deep bass layer
        bassOscillator.frequency.setValueAtTime(120, this.audioContext.currentTime);
        bassOscillator.frequency.exponentialRampToValueAtTime(80, this.audioContext.currentTime + 0.1);
        bassOscillator.type = 'sawtooth';
        
        // Filter for main sound
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1500, this.audioContext.currentTime);
        filter.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + 0.1);
        filter.Q.setValueAtTime(6, this.audioContext.currentTime);
        
        // Bass filter
        bassFilter.type = 'lowpass';
        bassFilter.frequency.setValueAtTime(200, this.audioContext.currentTime);
        bassFilter.Q.setValueAtTime(4, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        bassGainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
        bassGainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
        
        bassOscillator.start(this.audioContext.currentTime);
        bassOscillator.stop(this.audioContext.currentTime + 0.1);
    }

    playClickSound() {
        if (this.clickAudio) {
            // Reset audio to beginning and play
            this.clickAudio.currentTime = 0;
            this.clickAudio.play().catch(e => {
                console.log('Audio play failed:', e);
            });
        }
    }

    playCardHoverSound() {
        if (this.hoverAudio) {
            // Reset audio to beginning and play
            this.hoverAudio.currentTime = 0;
            this.hoverAudio.play().catch(e => {
                console.log('Hover audio play failed:', e);
            });
        }
    }
}

// Initialize sound effects globally
const soundEffects = new SoundEffects();
window.soundEffects = soundEffects; // Make it globally accessible for debugging

// Function to add sound effects to any page
function addSoundEffects() {
    // Add hover sounds to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            soundEffects.playHoverSound();
        });
    });

    // Add hover sounds to social icons
    const socialIcons = document.querySelectorAll('.social-icon-link');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            soundEffects.playHoverSound();
        });
    });

    // Add hover sounds to cards and buttons
    const cards = document.querySelectorAll('.insane-card-link, .more-btn, .cta-btn, .card, .personality-btn');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            soundEffects.playCardHoverSound();
        });
    });

    // Add hover sounds to PC apps and games items (dynamically generated)
    const pcAppsItems = document.querySelectorAll('#pc-applications-items .insane-card-link');
    pcAppsItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            soundEffects.playCardHoverSound();
        });
    });

    // Add click sounds to buttons
    const buttons = document.querySelectorAll('.cta-btn, .more-btn, .personality-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            soundEffects.playClickSound();
        });
    });

    // Add click sound to ALL elements (left click)
    document.addEventListener('click', (e) => {
        soundEffects.playClickSound();
    });

    // Add click sound to ALL elements (right click)
    document.addEventListener('contextmenu', (e) => {
        soundEffects.playClickSound();
    });

    // Add click sound to form inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('click', () => {
            soundEffects.playClickSound();
        });
    });

    // Add click sound to all links
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            soundEffects.playClickSound();
        });
    });

    // Add hover sounds to personality quiz elements
    const quizElements = document.querySelectorAll('.question, .answers label');
    quizElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            soundEffects.playHoverSound();
        });
    });

    // Add hover sounds specifically to personality quiz answer options
    const personalityAnswers = document.querySelectorAll('.answers input[type="radio"]');
    personalityAnswers.forEach(answer => {
        answer.addEventListener('mouseenter', () => {
            soundEffects.playHoverSound();
        });
    });

    // Add hover sounds to personality quiz answer labels (more specific targeting)
    const answerLabels = document.querySelectorAll('.answers label');
    answerLabels.forEach(label => {
        label.addEventListener('mouseenter', () => {
            soundEffects.playHoverSound();
        });
    });
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addSoundEffects();
    
    // Initialize audio context on first user interaction (required by browsers)
    function initAudioOnInteraction() {
        if (soundEffects.audioContext && soundEffects.audioContext.state === 'suspended') {
            soundEffects.audioContext.resume();
        }
        document.removeEventListener('click', initAudioOnInteraction);
        document.removeEventListener('keydown', initAudioOnInteraction);
        document.removeEventListener('touchstart', initAudioOnInteraction);
    }
    
    document.addEventListener('click', initAudioOnInteraction);
    document.addEventListener('keydown', initAudioOnInteraction);
    document.addEventListener('touchstart', initAudioOnInteraction);
}); 