const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');

// Toggle mobile menu
navToggle.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// Highlight active link on click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const href = link.getAttribute('href');
    const target = href.includes('.html') ? href.replace('.html','') : href.slice(1);
    setActive(target);
    mobileMenu.classList.add('hidden');
  });
});

// IntersectionObserver for scroll-spy
function setActive(id) {
  navLinks.forEach(link => {
    link.classList.remove('text-secondary','font-bold');
    if (link.getAttribute('href') === `${id}.html` || link.getAttribute('href') === `#${id}`) {
      link.classList.add('text-secondary','font-bold');
    }
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) setActive(e.target.id);
  });
}, { rootMargin: '0px 0px -50% 0px' });

sections.forEach(sec => observer.observe(sec));
