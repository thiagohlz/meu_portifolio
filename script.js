// ========== OTIMIZAÇÃO: FUNÇÕES AUXILIARES ==========
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const throttle = (fn, delay) => {
    let last = 0;
    return (...args) => {
        const now = Date.now();
        if (now - last < delay) return;
        last = now;
        fn(...args);
    };
};

// ========== CURSOR PERSONALIZADO ==========
const cursorDot = $('.cursor-dot');
const cursorOutline = $('.cursor-outline');

document.addEventListener('mousemove', e => {
    const {clientX: x, clientY: y} = e;
    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;
    cursorOutline.animate({left: `${x}px`, top: `${y}px`}, {duration: 500, fill: 'forwards'});
});

$$('a, button, .project-card, .contact-card, .skill-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ========== SCROLL PROGRESS BAR ==========
const updateScrollProgress = () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    $('.scroll-progress').style.width = scrolled + '%';
};

window.addEventListener('scroll', throttle(updateScrollProgress, 50));

// ========== NAVEGAÇÃO ==========
const navbar = $('#navbar');
const navToggle = $('#navToggle');
const navMenu = $('#navMenu');
const navLinks = $$('.nav-link');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        navMenu.classList.remove('active');
        navToggle?.classList.remove('active');
        
        const target = $(link.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', throttle(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up', 'scrolled');
        return;
    }
    
    navbar.classList.toggle('scrolled', currentScroll > 100);
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
}, 100));

// Ativar link da seção atual
const sections = $$('section');
window.addEventListener('scroll', throttle(() => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}, 100));

// ========== TYPEWRITER EFFECT ==========
const typewriterElement = $('#typewriter');
const code = `import streamlit as st
import pandas as pd
from fastapi import FastAPI

app = FastAPI()

@st.cache_data
def load_data():
    df = pd.read_csv("data.csv")
    return df.describe()

@app.get("/analytics")
async def get_analytics():
    return {"status": "success"}`;

let i = 0, isDeleting = false, typingSpeed = 50;

function typeWriter() {
    const current = i % code.length;
    const fullText = code.substring(0, current);
    
    typewriterElement.innerHTML = fullText + '<span class="cursor-blink">|</span>';
    
    if (!isDeleting && current === code.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && current === 0) {
        isDeleting = false;
    }
    
    isDeleting ? (i--, typingSpeed = 25) : (i++, typingSpeed = 50);
    setTimeout(typeWriter, typingSpeed);
}

// Iniciar typewriter quando a seção for visível
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && i === 0) typeWriter();
    });
}, {threshold: 0.5});

heroObserver.observe($('.hero'));

// ========== PARTÍCULAS ANIMADAS ==========
const particlesContainer = $('#particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    Object.assign(particle.style, {
        width: `${Math.random() * 4 + 1}px`,
        height: `${Math.random() * 4 + 1}px`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 20 + 10}s`,
        animationDelay: `${Math.random() * 5}s`
    });
    
    particlesContainer.appendChild(particle);
}

// ========== TEMA ==========
const themeBtn = $('.theme-btn-main');
const themeOptions = $('.theme-options');
const themeOptButtons = $$('.theme-opt');

themeBtn.addEventListener('click', () => themeOptions.classList.toggle('active'));

document.addEventListener('click', e => {
    if (!e.target.closest('.theme-switcher')) {
        themeOptions.classList.remove('active');
    }
});

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeOptions.classList.remove('active');
}

themeOptButtons.forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.getAttribute('data-theme')));
});

// Carregar tema salvo
setTheme(localStorage.getItem('theme') || 'cyberpunk');

// ========== ANIMAÇÕES AO SCROLL ==========
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {threshold: 0.1, rootMargin: '0px 0px -100px 0px'});

$$('.section-title, .about-text, .skill-item, .project-card, .contact-card, .hero-content, .hero-visual, .timeline-item, .skill-category').forEach(el => scrollObserver.observe(el));

// ========== ANIMAÇÃO DAS BARRAS DE SKILL ==========
const skillBars = $$('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => bar.style.width = width, 200);
            skillObserver.unobserve(bar);
        }
    });
}, {threshold: 0.5});

skillBars.forEach(bar => skillObserver.observe(bar));

// ========== ANIMAÇÃO DOS STATS (CONTADOR) ==========
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = $$('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.disconnect();
        }
    });
}, {threshold: 0.5});

const statsSection = $('.hero-stats');
if (statsSection) statsObserver.observe(statsSection);

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    $$('.bg-animation').forEach(el => {
        el.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}, 50));

// ========== ANIMAÇÃO DOS CARDS ==========
$$('.project-card, .contact-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ========== TECH BADGES ANIMATION ==========
$$('.tech-badge').forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.1}s`;
});

// ========== LOADING ANIMATION ==========
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========== GLITCH EFFECT NO TÍTULO ==========
const heroTitle = $('.hero-title');
if (heroTitle) {
    setInterval(() => {
        heroTitle.classList.add('glitch');
        setTimeout(() => heroTitle.classList.remove('glitch'), 200);
    }, 5000);
}

// ========== EASTER EGG - KONAMI CODE ==========
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', e => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
    
    if (konamiCode.join('').includes(konamiPattern.join(''))) {
        activateMatrixRain();
    }
});

function activateMatrixRain() {
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '9999'
    });
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(1);
    
    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = '15px monospace';
        
        drops.forEach((drop, i) => {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);
            ctx.fillText(text, i * 20, drop * 20);
            
            if (drop * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
    };
    
    const interval = setInterval(draw, 33);
    
    setTimeout(() => {
        clearInterval(interval);
        canvas.remove();
    }, 5000);
}

// ========== ACESSIBILIDADE ==========
document.addEventListener('keydown', e => {
    if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========== SMOOTH SCROLL PARA LINKS EXTERNOS ==========
$$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ========== DETECÇÃO DE MOBILE ==========
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
    document.body.classList.add('mobile');
    $$('.cursor-dot, .cursor-outline').forEach(el => el.style.display = 'none');
}

// ========== CONSOLE MESSAGE ==========
console.log('%c🚀 Bem-vindo ao meu portfólio!', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com Python, FastAPI, Django, Streamlit, Pandas e muito ☕', 'color: #00ff41; font-size: 14px;');
console.log('%cGitHub: https://github.com/thiagohlz', 'color: #fff; font-size: 12px;');
console.log('%cTente o Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #9d4edd; font-size: 12px;');

// ========== PERFORMANCE MONITORING ==========
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.loadTime > 3000) {
                console.warn('Slow page load detected:', entry.name);
            }
        });
    });
    perfObserver.observe({entryTypes: ['navigation']});
}

// ========== AUTO-UPDATE COPYRIGHT YEAR ==========
const updateCopyrightYear = () => {
    const yearElement = $('.footer-credit');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace(/\d{4}/, currentYear);
    }
};
updateCopyrightYear();
