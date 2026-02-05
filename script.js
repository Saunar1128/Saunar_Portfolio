// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        document.body.appendChild(this.cursor);
        
        this.trails = [];
        this.maxTrails = 8;
        
        this.init();
    }
    
    init() {
        // Create cursor trails
        for (let i = 0; i < this.maxTrails; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.opacity = (1 - i / this.maxTrails) * 0.5;
            document.body.appendChild(trail);
            this.trails.push({ element: trail, x: 0, y: 0 });
        }
        
        // Mouse move event
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
            
            // Update trails with delay
            this.trails.forEach((trail, index) => {
                setTimeout(() => {
                    trail.element.style.left = e.clientX - 3 + 'px';
                    trail.element.style.top = e.clientY - 3 + 'px';
                }, index * 20);
            });
        });
        
        // Hover effects for all interactive elements
        const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, .contact-link, .nav-menu a, .nav-logo');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });
    }
}

// Particle System
class ParticleSystem {
    constructor() {
        this.container = document.querySelector('.particles');
        this.particles = [];
        this.maxParticles = 50;
        
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
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        this.container.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.createParticle();
            }
        }, 6000);
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
        this.canvas.style.opacity = '0.4';
        
        document.body.appendChild(this.canvas);
        
        this.characters = '01{}[]()<>/\\;:.,ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        this.drops = [];
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / 25);
        this.init();
    }
    
    init() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = {
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.3 + 0.1,
                char: this.characters[Math.floor(Math.random() * this.characters.length)]
            };
        }
    }
    
    animate() {
        // Clear with black background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.font = '12px "Courier New", monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];
            const x = i * 25;
            
            // White outline effect
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${drop.opacity * 0.3})`;
            this.ctx.lineWidth = 1;
            this.ctx.strokeText(drop.char, x, drop.y);
            
            // Blue glow effect
            this.ctx.fillStyle = `rgba(0, 123, 255, ${drop.opacity})`;
            this.ctx.fillText(drop.char, x, drop.y);
            
            // Add subtle glow
            this.ctx.shadowColor = 'rgba(0, 123, 255, 0.5)';
            this.ctx.shadowBlur = 3;
            this.ctx.fillText(drop.char, x, drop.y);
            this.ctx.shadowBlur = 0;
            
            drop.y += drop.speed;
            
            // Reset drop when it goes off screen
            if (drop.y > this.canvas.height + 20) {
                drop.y = -20;
                drop.speed = Math.random() * 2 + 0.5;
                drop.opacity = Math.random() * 0.3 + 0.1;
                drop.char = this.characters[Math.floor(Math.random() * this.characters.length)];
            }
            
            // Occasionally change character
            if (Math.random() < 0.01) {
                drop.char = this.characters[Math.floor(Math.random() * this.characters.length)];
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced Button Glow Effects
document.addEventListener('DOMContentLoaded', () => {
    // Add enhanced glow to buttons on interaction
    document.querySelectorAll('.glow-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (this.classList.contains('primary')) {
                this.style.boxShadow = '0 0 40px rgba(0, 123, 255, 1), 0 6px 20px rgba(0, 123, 255, 0.4)';
            } else {
                this.style.boxShadow = '0 0 30px rgba(0, 191, 255, 0.8)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (this.classList.contains('primary')) {
                this.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.3)';
            } else {
                this.style.boxShadow = '0 0 10px rgba(0, 123, 255, 0.2)';
            }
        });
    });
    
    // Add pulse animation to highlight text
    const highlight = document.querySelector('.highlight');
    if (highlight) {
        setInterval(() => {
            highlight.style.textShadow = '0 0 30px rgba(0, 123, 255, 0.8)';
            setTimeout(() => {
                highlight.style.textShadow = '0 0 15px rgba(0, 123, 255, 0.4)';
            }, 1000);
        }, 3000);
    }
});
document.addEventListener('DOMContentLoaded', () => {
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
        this.style.boxShadow = '0 0 20px rgba(0, 123, 255, 0.5)';
    });
    
    btn.addEventListener('mouseleave', function() {
        if (this.classList.contains('primary')) {
            this.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.3)';
        } else {
            this.style.boxShadow = 'none';
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initialize with loading state
document.body.style.opacity = '0';