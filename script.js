// Profile Modal Functions
function openProfileModal() {
    document.getElementById('profileModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Flip Card Function
function flipCard(card) {
    event.stopPropagation();
    card.classList.toggle('flipped');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('profileModal');
    if (event.target === modal) {
        closeProfileModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProfileModal();
    }
});

// Advanced Typewriter Effect
class TypewriterEffect {
    constructor() {
        this.textElement = document.querySelector('.typewriter-text');
        this.cursorElement = document.querySelector('.cursor-blink');
        this.texts = [
            'Hi, I\'m Abram Saunar',
            'a Software Developer'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 2000;
        
        this.init();
    }
    
    init() {
        setTimeout(() => {
            this.type();
        }, 500);
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.textElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.textElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        let typeSpeedCurrent = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeedCurrent = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            typeSpeedCurrent = 500;
        }
        
        setTimeout(() => this.type(), typeSpeedCurrent);
    }
}

// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        document.body.appendChild(this.cursor);
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        this.updateCursor();
        
        const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, .contact-link, .nav-menu a, .nav-logo');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });
    }
    
    updateCursor() {
        this.cursorX += (this.mouseX - this.cursorX) * 0.15;
        this.cursorY += (this.mouseY - this.cursorY) * 0.15;
        
        this.cursor.style.left = this.cursorX - 10 + 'px';
        this.cursor.style.top = this.cursorY - 10 + 'px';
        
        requestAnimationFrame(() => this.updateCursor());
    }
}

// Particle System
class ParticleSystem {
    constructor() {
        this.container = document.querySelector('.particles');
        this.particles = [];
        this.maxParticles = 20;
        
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        this.container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.createParticle();
            }
        }, 8000);
    }
}
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(0, 123, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    }
});

// Animated coding background
class CodingRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.3';
        
        document.body.appendChild(this.canvas);
        
        this.characters = '01{}[]';
        this.drops = [];
        this.lastTime = 0;
        this.fps = 30;
        this.fpsInterval = 1000 / this.fps;
        
        this.resize();
        this.init();
        this.animate(0);
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / 30);
        this.init();
    }
    
    init() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = {
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.2 + 0.1,
                char: this.characters[Math.floor(Math.random() * this.characters.length)]
            };
        }
    }
    
    animate(currentTime) {
        requestAnimationFrame((time) => this.animate(time));
        
        const elapsed = currentTime - this.lastTime;
        if (elapsed < this.fpsInterval) return;
        
        this.lastTime = currentTime - (elapsed % this.fpsInterval);
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.font = '14px "Courier New", monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];
            const x = i * 30;
            
            this.ctx.fillStyle = `rgba(0, 123, 255, ${drop.opacity})`;
            this.ctx.fillText(drop.char, x, drop.y);
            
            drop.y += drop.speed;
            
            if (drop.y > this.canvas.height + 20) {
                drop.y = -20;
                drop.speed = Math.random() * 1.5 + 0.5;
                drop.opacity = Math.random() * 0.2 + 0.1;
                drop.char = this.characters[Math.floor(Math.random() * this.characters.length)];
            }
            
            if (Math.random() < 0.02) {
                drop.char = this.characters[Math.floor(Math.random() * this.characters.length)];
            }
        }
    }
}

// Enhanced Button Glow Effects
document.addEventListener('DOMContentLoaded', () => {
    // Simplified button effects
    document.querySelectorAll('.glow-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (this.classList.contains('primary')) {
                this.style.boxShadow = '0 0 25px rgba(0, 123, 255, 0.8)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (this.classList.contains('primary')) {
                this.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.3)';
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    new TypewriterEffect();
    new CustomCursor();
    new ParticleSystem();
    new CodingRain();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .about-text');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add glowing effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        if (this.classList.contains('primary')) {
            this.style.boxShadow = '0 0 15px rgba(0, 123, 255, 0.4)';
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        if (this.classList.contains('primary')) {
            this.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.3)';
        }
    });
});

// Parallax effect for hero section
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-content');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initialize with loading state
document.body.style.opacity = '0';