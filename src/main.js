// ── VIDEO HERO ──────────────────────────────────────────
const heroVideo = document.getElementById('hero-video');
const enterBtn = document.getElementById('enter-btn');
const videoHero = document.getElementById('video-hero');

// Show button after 1s
setTimeout(() => {
  if (enterBtn) enterBtn.style.display = 'inline-block';
}, 1000);

// Also show button when video ends
if (heroVideo) {
  heroVideo.addEventListener('ended', () => {
    if (enterBtn) enterBtn.style.display = 'inline-block';
  });
}

window.enterSite = function() {
  if (videoHero) videoHero.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

// ── PROGRESS BAR ────────────────────────────────────────
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = `${(scrolled / maxScroll) * 100}%`;
  }
});

// ── SECTION NAV ────────────────────────────────────
window.scrollToSection = function(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const navLinks = document.querySelectorAll('.nav-link');
const sectionIds = ['intro', 'photo1', 'photo2', 'photo3', 'photo4', 'photo5', 'photo6', 'photo7', 'reasons', 'final'];
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const idx = sectionIds.indexOf(e.target.id);
      navLinks.forEach(l => l.classList.remove('active'));
      if (idx <= 1) navLinks[0]?.classList.add('active');
      else if (idx <= 7) navLinks[1]?.classList.add('active');
      else if (idx === 8) navLinks[2]?.classList.add('active');
      else navLinks[3]?.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) obs.observe(el);
});

// ── HEART RAIN ──────────────────────────────────────────
const rainItems = ['💛', '🐾', '⭐', '💙', '🌟', '💗', '🤍', '✨', '🐶'];

window.rainHearts = function(count = 50) {
  const rainEl = document.getElementById('heart-rain');
  if (!rainEl) return;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'rain-item';
      el.textContent = rainItems[Math.floor(Math.random() * rainItems.length)];
      el.style.left = `${Math.random() * 100}%`;
      el.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
      const dur = Math.random() * 2 + 1.5;
      el.style.animation = `rainFall ${dur}s linear forwards`;
      rainEl.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000 + 300);
    }, i * 70);
  }
};

// ── CURSOR SPARKLES ─────────────────────────────────────
const sparkItems = ['🐾', '✨', '💛', '⭐', '🌟'];
document.addEventListener('click', e => {
  for (let i = 0; i < 5; i++) {
    const s = document.createElement('div');
    s.className = 'cursor-spark';
    s.textContent = sparkItems[Math.floor(Math.random() * sparkItems.length)];
    s.style.left = `${e.clientX}px`;
    s.style.top = `${e.clientY}px`;
    document.body.appendChild(s);
    const angle = (Math.random() * 360) * (Math.PI / 180);
    const dist = Math.random() * 70 + 30;
    requestAnimationFrame(() => {
      s.style.transform = `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(0)`;
      s.style.opacity = '0';
    });
    setTimeout(() => s.remove(), 750);
  }
});

// ── PARALLAX (Photo 1) ──────────────────────────────────
window.parallaxMove = function(e) {
  const scene = document.getElementById('parallaxScene');
  const img = document.getElementById('parallaxImg');
  if (!scene || !img) return;
  const rect = scene.getBoundingClientRect();
  const xPct = (e.clientX - rect.left) / rect.width - 0.5;
  const yPct = (e.clientY - rect.top) / rect.height - 0.5;
  img.style.transform = `scale(1.08) translate(${xPct * -18}px, ${yPct * -18}px)`;
};
window.parallaxReset = function() {
  const img = document.getElementById('parallaxImg');
  if (img) img.style.transform = '';
};

// ── POLAROID FLIP (Photo 2) ─────────────────────────────
window.flipPolaroid = function() {
  const pol = document.getElementById('polaroid');
  if (pol) pol.classList.toggle('flipped');
  window.rainHearts(15);
};

// ── CURTAIN REVEAL (Photo 3) ────────────────────────────
window.revealCurtain = function() {
  const c = document.getElementById('curtain');
  const hint = document.getElementById('curtainHint');
  if (!c) return;
  c.classList.toggle('revealed');
  if (c.classList.contains('revealed')) {
    if (hint) hint.textContent = '💋 O melhor beijinho!';
    window.rainHearts(25);
  } else {
    if (hint) hint.textContent = '👆 Toque para revelar!';
  }
};

// ── 3D TILT (Photo 4) ──────────────────────────────────
window.tiltMove = function(e) {
  const tiltCard = document.getElementById('tiltCard');
  const tiltShine = document.getElementById('tiltShine');
  if (!tiltCard || !tiltShine) return;
  const rect = tiltCard.getBoundingClientRect();
  const xPct = (e.clientX - rect.left) / rect.width;
  const yPct = (e.clientY - rect.top) / rect.height;
  const rotX = (yPct - 0.5) * -20;
  const rotY = (xPct - 0.5) * 20;
  tiltCard.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
  tiltCard.style.boxShadow = `${-rotY * 0.8}px ${rotX * 0.8}px 0 var(--black)`;
  tiltShine.style.setProperty('--mx', `${xPct * 100}%`);
  tiltShine.style.setProperty('--my', `${yPct * 100}%`);
  tiltShine.style.background = `radial-gradient(circle at ${xPct * 100}% ${yPct * 100}%, rgba(255,255,255,0.3), transparent 60%)`;
};
window.tiltReset = function() {
  const tiltCard = document.getElementById('tiltCard');
  const tiltShine = document.getElementById('tiltShine');
  if (tiltCard) tiltCard.style.transform = '';
  if (tiltCard) tiltCard.style.boxShadow = '';
  if (tiltShine) tiltShine.style.background = '';
};

// ── SPOTLIGHT (Photo 5) ────────────────────────────────
window.spotlightMove = function(e) {
  const wrap = document.getElementById('spotlightWrap');
  const mask = document.getElementById('spotlightMask');
  if (!wrap || !mask) return;
  const rect = wrap.getBoundingClientRect();
  const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
  const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
  mask.style.background = `radial-gradient(circle at ${x}% ${y}%, transparent 28%, rgba(0,0,0,0.72) 65%)`;
};
window.spotlightReset = function() {
  const mask = document.getElementById('spotlightMask');
  if (mask) mask.style.background = '';
};

// ── COMIC PANEL (Photo 6) ──────────────────────────────
const comicLines = [
  'Hmm… tá bom demais! 😋',
  'Mais um pouquinho! 🍝',
  'Ninguém me para! 😤',
  'Chef suprema! 👑',
  'Saborosa vibe! ✨',
  'POW! Delícia!! 💥'
];
let comicIdx = 0;
window.comicClick = function() {
  const bubble = document.getElementById('speechBubble');
  comicIdx = (comicIdx + 1) % comicLines.length;
  if (bubble) bubble.textContent = comicLines[comicIdx];
  window.rainHearts(10);
};

// ── CAROUSEL (Photo 7) ────────────────────────────────
let carouselIndex = 0;
const carouselSlides = 3;

window.gotoSlide = function(i) {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  carouselIndex = (i + carouselSlides) % carouselSlides;
  track.style.transform = `translateX(-${carouselIndex * 100}%)`;
  document.querySelectorAll('.c-dot').forEach((d, j) => d.classList.toggle('active', j === carouselIndex));
};
window.carouselMove = function(dir) {
  window.gotoSlide(carouselIndex + dir);
};

// Auto-advance carousel
setInterval(() => window.carouselMove(1), 4000);

// Init dots
document.addEventListener('DOMContentLoaded', () => {
  const dotsWrap = document.getElementById('carouselDots');
  if (dotsWrap) {
    for (let i = 0; i < carouselSlides; i++) {
      const d = document.createElement('div');
      d.className = 'c-dot' + (i === 0 ? ' active' : '');
      d.onclick = () => window.gotoSlide(i);
      dotsWrap.appendChild(d);
    }
  }

  // Touch/swipe for carousel
  const cWrap = document.querySelector('.carousel-wrap');
  if (cWrap) {
    let touchStartX = null;
    cWrap.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
    cWrap.addEventListener('touchend', e => {
      if (touchStartX === null) return;
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) window.carouselMove(diff > 0 ? 1 : -1);
      touchStartX = null;
    });
  }
});

// ── BIG FINALE ────────────────────────────────────────
window.bigFinale = function() {
  window.rainHearts(100);
  const finalImg = document.querySelector('.final-img');
  if (finalImg) {
    finalImg.style.animation = 'none';
    finalImg.style.transform = 'scale(1.1) rotate(-3deg)';
    setTimeout(() => {
      finalImg.style.transform = '';
      finalImg.style.animation = '';
    }, 600);
  }
};

// ── SCROLL-TRIGGERED FADE IN ─────────────────────────
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animationDelay = '0s';
      e.target.style.opacity = '1';
    }
  });
}, { threshold: 0.2 });
fadeEls.forEach(el => fadeObs.observe(el));

// ── KEYBOARD SHORTCUTS ───────────────────────────────
document.addEventListener('keydown', e => {
  const videoHero = document.getElementById('video-hero');
  if (e.key === 'Enter' && videoHero && !videoHero.classList.contains('hidden')) window.enterSite();
  if (e.key === 'ArrowRight') window.carouselMove(1);
  if (e.key === 'ArrowLeft') window.carouselMove(-1);
});
