/* ═══════════════════════════════════════════════
   Elke's Fewo – Hauptscript
   ─────────────────────────────────────────────
   01  Mobile Menu
   02  Smooth Scroll
   03  Galerie Lightbox
   04  FAQ Toggle
   05  Video Mute Button
   ═══════════════════════════════════════════════ */

/* ── 01  MOBILE MENU ── */
const menuBtn = document.getElementById('menuBtn');
const navbar  = document.getElementById('navbar');
menuBtn.addEventListener('click', () => navbar.classList.toggle('active'));
document.querySelectorAll('nav a').forEach(a =>
    a.addEventListener('click', () => navbar.classList.remove('active'))
);

/* ── 02  SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

/* ── 03  GALERIE LIGHTBOX ── */
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function () {
        const src   = this.querySelector('img').src;
        const label = this.querySelector('.gallery-label')?.textContent || '';
        const modal = document.createElement('div');
        modal.style.cssText = [
            'position:fixed', 'inset:0', 'background:rgba(0,0,0,0.92)',
            'display:flex', 'flex-direction:column',
            'align-items:center', 'justify-content:center',
            'z-index:9999', 'padding:2rem', 'cursor:pointer'
        ].join(';');
        modal.innerHTML = `
            <img src="${src}" style="max-width:90vw;max-height:80vh;object-fit:contain;display:block;">
            <p style="color:rgba(255,255,255,0.7);margin-top:1rem;font-size:0.9rem;letter-spacing:1px;">${label}</p>
        `;
        modal.addEventListener('click', () => modal.remove());
        document.body.appendChild(modal);
    });
});

/* ── 04  FAQ TOGGLE ── */
document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', function () {
        const answer = this.nextElementSibling;
        const isOpen = this.classList.contains('open');
        document.querySelectorAll('.faq-q').forEach(el => {
            el.classList.remove('open');
            el.nextElementSibling.classList.remove('open');
        });
        if (!isOpen) {
            this.classList.add('open');
            answer.classList.add('open');
        }
    });
});

/* ── 05  VIDEO MUTE BUTTON ── */
const muteBtn = document.getElementById('muteBtn');
const video   = document.querySelector('.video-wrap video');

if (muteBtn && video) {
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        const icon = muteBtn.querySelector('svg');
        // Lautsprecher-Icon tauschen je nach Zustand
        if (video.muted) {
            icon.innerHTML = '<path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
            muteBtn.title = 'Ton einschalten';
        } else {
            icon.innerHTML = '<path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M19 5c1.5 1.5 2.5 3.5 2.5 5.5S20.5 15 19 17"/><path d="M15 8.34a4 4 0 0 1 0 7.32"/>';
            muteBtn.title = 'Ton ausschalten';
        }
    });
}
