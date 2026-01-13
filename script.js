// --------------------
// FADE-IN ANIMATION
// --------------------
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer){
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.style.opacity = 1;
    entry.target.style.transform = "translateY(0)";
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// --------------------
// SMOOTH SCROLL FOR NAVBAR LINKS
// --------------------
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// --------------------
// HERO FLOATING ANIMATION (subtle)
// --------------------
const heroTitle = document.querySelector('.hero h1');
if(heroTitle){
  let floatDir = 1;
  setInterval(() => {
    heroTitle.style.transform = `translateY(${floatDir * 5}px)`;
    floatDir *= -1;
  }, 1500);
}

// --------------------
// SCROLL-TO-TOP BUTTON
// --------------------
// Create button dynamically
const scrollBtn = document.createElement('button');
scrollBtn.innerText = '↑';
scrollBtn.id = 'scrollTopBtn';
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if(window.scrollY > 300){
    scrollBtn.style.opacity = 1;
    scrollBtn.style.pointerEvents = 'auto';
  } else {
    scrollBtn.style.opacity = 0;
    scrollBtn.style.pointerEvents = 'none';
  }
});
