// Smooth scrolling for navigation links
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
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
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
        this.columns = Math.floor(this.canvas.width / 20);
        this.init();
    }
    
    init() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = {
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1
            };
        }
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.font = '14px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            
            // Create gradient effect
            const gradient = this.ctx.createLinearGradient(0, drop.y - 20, 0, drop.y + 20);
            gradient.addColorStop(0, `rgba(0, 123, 255, 0)`);
            gradient.addColorStop(0.5, `rgba(0, 191, 255, ${drop.opacity})`);
            gradient.addColorStop(1, `rgba(0, 123, 255, 0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillText(char, i * 20, drop.y);
            
            drop.y += drop.speed;
            
            if (drop.y > this.canvas.height) {
                drop.y = -20;
                drop.speed = Math.random() * 3 + 1;
                drop.opacity = Math.random() * 0.5 + 0.1;
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize coding rain effect
document.addEventListener('DOMContentLoaded', () => {
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