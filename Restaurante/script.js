(function() {
    // ─── CURSOR ────────────────────────────────────────
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursor-dot');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    const speed = 0.15;
    const dotSpeed = 0.35;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        dotX += (mouseX - dotX) * dotSpeed;
        dotY += (mouseY - dotY) * dotSpeed;

        if (cursor) {
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        }
        if (cursorDot) {
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = document.querySelectorAll(
        'a, button, .btn-reserve-nav, .btn-submit, .hero-cta, .menu-card, .gallery-item, input, select, .testimonial-card');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hover'));
        el.addEventListener('mousedown', () => cursor && cursor.classList.add('click'));
        el.addEventListener('mouseup', () => cursor && cursor.classList.remove('click'));
    });

    // ─── PARTÍCULAS ────────────────────────────────────
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 70;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.3;
            this.speedX = (Math.random() - 0.5) * 0.35;
            this.speedY = (Math.random() - 0.5) * 0.35;
            this.opacity = Math.random() * 0.5 + 0.15;
            this.opacitySpeed = (Math.random() - 0.5) * 0.004;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity += this.opacitySpeed;
            if (this.opacity > 0.7 || this.opacity < 0.08) this.opacitySpeed *= -1;
            if (this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(201,169,110,${this.opacity})`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(201,169,110,${this.opacity * 0.25})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(201,169,110,${0.04 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ─── NAV SCROLL ────────────────────────────────────
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // ─── HERO ANIMACIÓN ────────────────────────────────
    setTimeout(() => {
        document.querySelector('.hero').classList.add('animate-bg');
    }, 200);

    // ─── REVEAL ON SCROLL ──────────────────────────────
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.12
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    revealElements.forEach(el => observer.observe(el));

    // ─── FORMULARIO ────────────────────────────────────
    const form = document.getElementById('reservation-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.textContent;
        btn.textContent = '✦ Solicitud Enviada ✦';
        btn.style.color = '#0a0a0c';
        btn.style.background = 'var(--gold)';
        btn.style.borderColor = 'var(--gold)';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.color = '';
            btn.style.background = '';
            btn.style.borderColor = '';
            form.reset();
        }, 2500);
    });

    // ─── EFECTO PARALLAX SUAVE EN HERO ──────────────────
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight) {
            const offset = window.scrollY * 0.35;
            heroBg.style.transform = `scale(1.05) translateY(${offset}px)`;
        }
    });

    console.log('%c✨ Lumina — Alta Gastronomía Sensorial %c| %cExperiencia web diseñada para despertar los sentidos.',
        'color: #c9a96e; font-size: 1.2rem; font-weight: bold;', '', 'color: #b8b3a8;');
    console.log('%cCada detalle, cada luz, cada línea de código está al servicio de la emoción.', 'color: #7a756c; font-style: italic;');
})();