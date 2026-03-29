/* ═══════════════════════════════════════════
   1. CUSTOM CURSOR
═══════════════════════════════════════════ */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
  dot.style.left = ring.style.left = `${e.clientX}px`;
  dot.style.top = ring.style.top = `${e.clientY}px`;
});
document.querySelectorAll('a, button, .layer').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
});

/* ═══════════════════════════════════════════
   2. TYPING EFFECT
═══════════════════════════════════════════ */
const subText = "High-performance Multi-Layer Microwave Absorbing Composite (MLMAC) for Radar Cross-Section (RCS) reduction and IR signature suppression.";
let i = 0;
function type() {
  if (i < subText.length) {
    document.getElementById('hero-sub').innerHTML += subText.charAt(i);
    i++; setTimeout(type, 20);
  }
}
window.onload = type;

/* ═══════════════════════════════════════════
   3. SCROLL PROGRESS & HUD
═══════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  
  document.getElementById('scroll-progress').style.width = scrolled + "%";
  document.getElementById('hud-scroll').innerText = Math.round(scrolled) + "%";
  document.getElementById('hud-bar').style.width = scrolled + "%";

  // Scroll to Top visibility
  const st = document.getElementById('scroll-top');
  if (winScroll > 400) st.classList.add('visible');
  else st.classList.remove('visible');

  // Active Section Update
  const sections = ['overview', 'howitworks', 'performance', 'materials'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    const rect = el.getBoundingClientRect();
    if (rect.top < 150 && rect.bottom > 150) {
      document.getElementById('hud-section').innerText = id.toUpperCase();
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
});

/* ═══════════════════════════════════════════
   4. REVEAL ANIMATION
═══════════════════════════════════════════ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ═══════════════════════════════════════════
   5. HUD SIGNAL ANIMATION
═══════════════════════════════════════════ */
setInterval(() => {
  const spans = document.querySelectorAll('#hud-signal span');
  const level = Math.floor(Math.random() * 6);
  spans.forEach((s, idx) => s.classList.toggle('active', idx < level));
}, 1000);

/* ═══════════════════════════════════════════
   6. PARTICLE SYSTEM
═══════════════════════════════════════════ */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = Math.random() * 1.5;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
for (let i = 0; i < 80; i++) particles.push(new Particle());
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

/* ═══════════════════════════════════════════
   7. PERFORMANCE CHARTS (CHART.JS)
═══════════════════════════════════════════ */
const gridStyle = { color: 'rgba(0,212,255,0.05)', drawBorder: false };

// RL Chart
new Chart(document.getElementById('rlChart'), {
  type: 'line',
  data: {
    labels: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    datasets: [{
      label: 'Reflection Loss (dB)',
      data: [-12, -18, -33.7, -25, -20, -18, -15, -14, -13, -12, -10],
      borderColor: '#00d4ff', tension: 0.4, borderWidth: 2, pointRadius: 0, fill: true,
      backgroundColor: 'rgba(0,212,255,0.05)'
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { y: { grid: gridStyle }, x: { grid: gridStyle } }
  }
});

// Absorptivity Chart
new Chart(document.getElementById('absChart'), {
  type: 'line',
  data: {
    labels: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    datasets: [{
      label: 'Absorption %',
      data: [93, 98.4, 99.95, 99.6, 99, 98.4, 96.8, 96, 95, 93, 90],
      borderColor: '#0d5eff', tension: 0.4, borderWidth: 2, pointRadius: 2,
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { y: { min: 80, max: 100, grid: gridStyle }, x: { grid: gridStyle } }
  }
});

// IR Spectrum
new Chart(document.getElementById('irChart'), {
  type: 'bar',
  data: {
    labels: ['2µm', '4µm', '6µm', '8µm', '10µm', '12µm'],
    datasets: [{
      label: 'Thermal Absorption',
      data: [82, 88, 92, 94, 90, 85],
      backgroundColor: 'rgba(245,158,11,0.3)', borderColor: '#f59e0b', borderWidth: 1
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { y: { grid: gridStyle }, x: { grid: gridStyle } }
  }
});

// RCS Reduction
new Chart(document.getElementById('rcsChart'), {
  type: 'line',
  data: {
    labels: ['0°', '15°', '30°', '45°', '60°'],
    datasets: [{
      label: 'RCS Reduction %',
      data: [95, 92, 88, 82, 75],
      borderColor: '#10b981', fill: false, tension: 0.3
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { y: { min: 50, max: 100, grid: gridStyle }, x: { grid: gridStyle } }
  }
});

// Radar Chart
new Chart(document.getElementById('radarChart'), {
  type: 'radar',
  data: {
    labels: ['RL Peak', 'Bandwidth', 'Weight', 'Durability', 'Cost', 'Thermal'],
    datasets: [{
      label: 'Shield Tech MLMAC',
      data: [95, 85, 70, 90, 80, 88],
      backgroundColor: 'rgba(0,212,255,0.2)', borderColor: '#00d4ff', pointBackgroundColor: '#00d4ff'
    }]
  },
  options: {
    scales: {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.1)' },
        grid: { color: 'rgba(255,255,255,0.1)' },
        pointLabels: { color: '#5a7a9a', font: { family: 'DM Mono' } },
        ticks: { display: false }
      }
    },
    plugins: { legend: { display: false } }
  }
});
