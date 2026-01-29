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
const interactiveElements = document.querySelectorAll("a, button, .project-card, .skill-card, .contact-card, .btn");
interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
        document.body.classList.add("hovering");
    });
    el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        document.body.classList.remove("hovering");
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
import pandas as pd
import streamlit as st

app = FastAPI()

class DataModel(BaseModel):
    name: str
    value: float

@app.post("/analyze")
async def analyze_data(data: DataModel):
    # Process data with pandas
    df = pd.DataFrame([data.dict()])
    return {"result": df.to_dict()}

# Streamlit Dashboard
st.title("Data Analysis Dashboard")
st.write("Interactive data visualization")`;

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

// ========== FORMAS FLUTUANTES ==========
const floatingShapes = document.getElementById("floatingShapes");
const shapeTypes = ['circle', 'square', 'triangle'];

function createFloatingShape() {
    const shape = document.createElement("div");
    shape.classList.add("floating-shape");
    
    const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const size = Math.random() * 50 + 20;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 10 + 15;
    
