// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Background animation
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const dots = Array.from({ length: 60 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.5,
  vy: (Math.random() - 0.5) * 0.5,
  r: Math.random() * 2 + 1
}));

function animate() {
  ctx.fillStyle = '#0f111a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  dots.forEach((d, i) => {
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = '#00bfa6';
    ctx.fill();

    for (let j = i + 1; j < dots.length; j++) {
      const dx = d.x - dots[j].x;
      const dy = d.y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = `rgba(0,191,166,${1 - dist / 120})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }

    d.x += d.vx;
    d.y += d.vy;
    if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
    if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
  });

  requestAnimationFrame(animate);
}

animate();
