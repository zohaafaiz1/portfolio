// -------------------
// Smooth Scroll
// -------------------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// -------------------
// Techy Retro Background
// -------------------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dots = [];
const numDots = 60;

for (let i = 0; i < numDots; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: Math.random() * 2 + 1
  });
}

function animate() {
  ctx.fillStyle = '#0f111a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < dots.length; i++) {
    let d1 = dots[i];
    ctx.beginPath();
    ctx.arc(d1.x, d1.y, d1.r, 0, Math.PI * 2);
    ctx.fillStyle = '#00bfa6';
    ctx.fill();

    for (let j = i + 1; j < dots.length; j++) {
      let d2 = dots[j];
      let dx = d1.x - d2.x;
      let dy = d1.y - d2.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = 'rgba(0,191,166,' + (1 - dist / 120) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(d1.x, d1.y);
        ctx.lineTo(d2.x, d2.y);
        ctx.stroke();
      }
    }
  }

  for (let i = 0; i < dots.length; i++) {
    let d = dots[i];
    d.x += d.vx;
    d.y += d.vy;
    if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
    if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
  }

  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// -------------------
// Fade-in Animation for Projects, Skills, Contact, Certificates
// -------------------
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.opacity = 1;
    entry.target.style.transform = 'translateY(0)';
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));
