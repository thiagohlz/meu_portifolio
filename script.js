// ========== CURSOR PERSONALIZADO ==========
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Efeito hover em links e botões
const interactiveElements = document.querySelectorAll("a, button, .project-card, .skill-card, .contact-card");
interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
    });
    el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
    });
});

// ========== NAVEGAÇÃO ==========
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Menu mobile toggle
navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
});

// Fechar menu ao clicar em link
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove("scroll-up");
        navbar.classList.remove("scrolled");
        return;
    }
    
    if (currentScroll > 100) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains("scroll-down")) {
        navbar.classList.remove("scroll-up");
        navbar.classList.add("scroll-down");
    } else if (currentScroll < lastScroll && navbar.classList.contains("scroll-down")) {
        navbar.classList.remove("scroll-down");
        navbar.classList.add("scroll-up");
    }
    lastScroll = currentScroll;
});

// Ativar link da seção atual
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: "smooth"
        });
    });
});

// ========== TYPEWRITER EFFECT ==========
const typewriterElement = document.getElementById("typewriter");
const code = `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str

@app.post("/users")
async def create_user(user: User):
    return {"message": "User created!"}`;

let i = 0;
let isDeleting = false;
let loopNum = 0;
let typingSpeed = 50;

function typeWriter() {
    const current = i % code.length;
    const fullText = code.substring(0, current);
    
    typewriterElement.innerHTML = fullText + '<span class="cursor-blink">|</span>';
    
    if (!isDeleting && current === code.length) {
        setTimeout(() => { isDeleting = true; }, 2000);
    } else if (isDeleting && current === 0) {
        isDeleting = false;
        loopNum++;
    }
    
    if (isDeleting) {
        i--;
        typingSpeed = 25;
    } else {
        i++;
        typingSpeed = 50;
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Iniciar typewriter quando a seção for visível
const heroSection = document.querySelector(".hero");
const observerOptions = {
    threshold: 0.5
};

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && i === 0) {
            typeWriter();
        }
    });
}, observerOptions);

heroObserver.observe(heroSection);

// ========== PARTÍCULAS ANIMADAS ==========
const particlesContainer = document.getElementById("particles");
const particleCount = 50;

function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    
    const size = Math.random() * 4 + 1;
    const startX = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    particlesContainer.appendChild(particle);
}

for (let i = 0; i < particleCount; i++) {
    createParticle();
}

// ========== TEMA ==========
const themeBtn = document.querySelector(".theme-btn-main");
const themeOptions = document.querySelector(".theme-options");
const themeOptButtons = document.querySelectorAll(".theme-opt");

// Toggle menu de temas
themeBtn.addEventListener("click", () => {
    themeOptions.classList.toggle("active");
});

// Fechar menu ao clicar fora
document.addEventListener("click", (e) => {
    if (!e.target.closest(".theme-switcher")) {
        themeOptions.classList.remove("active");
    }
});

// Mudar tema
function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    themeOptions.classList.remove("active");
}

// Event listeners para botões de tema
themeOptButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const theme = btn.getAttribute("data-theme");
        setTheme(theme);
    });
});

// Carregar tema salvo
const savedTheme = localStorage.getItem("theme") || "cyberpunk";
setTheme(savedTheme);

// ========== ANIMAÇÕES AO SCROLL ==========
const observerOptionsScroll = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
        }
    });
}, observerOptionsScroll);

// Observar elementos
const animateElements = document.querySelectorAll(
    ".section-title, .about-text, .skill-card, .project-card, .contact-card, .hero-content, .hero-visual"
);

animateElements.forEach(el => scrollObserver.observe(el));

// ========== ANIMAÇÃO DAS BARRAS DE SKILL ==========
const skillBars = document.querySelectorAll(".skill-progress");
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = "0";
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ========== PARALLAX EFFECT ==========
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".bg-animation");
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========== ANIMAÇÃO DOS CARDS ==========
const cards = document.querySelectorAll(".project-card, .skill-card");
cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
});

// ========== TECH BADGES ANIMATION ==========
const techBadges = document.querySelectorAll(".tech-badge");
techBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.1}s`;
});

// ========== BOTÕES HERO ANIMATION ==========
const heroButtons = document.querySelectorAll(".hero-buttons .btn");
heroButtons.forEach((btn, index) => {
    btn.style.animationDelay = `${0.5 + index * 0.1}s`;
});

// ========== LOADING ANIMATION ==========
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// ========== GLITCH EFFECT NO TÍTULO ==========
const heroTitle = document.querySelector(".hero-title");
if (heroTitle) {
    setInterval(() => {
        heroTitle.classList.add("glitch");
        setTimeout(() => {
            heroTitle.classList.remove("glitch");
        }, 200);
    }, 5000);
}

// ========== EASTER EGG - KONAMI CODE ==========
let konamiCode = [];
const konamiPattern = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a"
];

document.addEventListener("keydown", (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
    
    if (konamiCode.join("").includes(konamiPattern.join(""))) {
        activateMatrixRain();
    }
});

function activateMatrixRain() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(1);
    
    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#0F0";
        ctx.font = "15px monospace";
        
        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const interval = setInterval(draw, 33);
    
    setTimeout(() => {
        clearInterval(interval);
        canvas.remove();
    }, 5000);
}

// ========== PERFORMANCE OPTIMIZATION ==========
// Throttle para eventos de scroll
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
    };
}

// Aplicar throttle ao scroll
const throttledScroll = throttle(() => {
    // Código de scroll otimizado
}, 100);

window.addEventListener("scroll", throttledScroll);

// ========== ACESSIBILIDADE ==========
// Permitir navegação por teclado
document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
        document.body.classList.add("keyboard-nav");
    }
});

document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-nav");
});

// ========== CONSOLE MESSAGE ==========
console.log("%c🚀 Bem-vindo ao meu portfólio!", "color: #00d9ff; font-size: 20px; font-weight: bold;");
console.log("%cDesenvolvido com Python, FastAPI, Django e muito ☕", "color: #00ff41; font-size: 14px;");
console.log("%cGitHub: https://github.com/thiagohlz", "color: #fff; font-size: 12px;");

// ========== SERVICE WORKER (OPCIONAL) ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    });
}
