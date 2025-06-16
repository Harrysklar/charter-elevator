// nav.js
document.addEventListener('DOMContentLoaded', () => {
  // Primary nav toggle (desktop → mobile)
  const navToggle  = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () =>
      mobileMenu.classList.toggle('hidden')
    );
  }

  // Option 1 mobile dropdown toggle
  const mobHamburger = document.getElementById('mob-hamburger');
  const mobMenu      = document.getElementById('mob-menu');
  if (mobHamburger && mobMenu) {
    mobHamburger.addEventListener('click', () =>
      mobMenu.classList.toggle('hidden')
    );
  }

  // Mobile “Leave Feedback” / survey buttons
  ['mob-survey', 'mob-survey-2'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () =>
        document.getElementById('open-survey').click()
      );
    }
  });

  // Scroll-spy & active-link highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  // On click, highlight and close both menus
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href   = link.getAttribute('href');
      const target = href.includes('.html')
        ? href.replace('.html', '')
        : href.slice(1);

      setActive(target);
      if (mobileMenu) mobileMenu.classList.add('hidden');
      if (mobMenu)    mobMenu.classList.add('hidden');
    });
  });

  function setActive(id) {
    navLinks.forEach(link => {
      link.classList.remove('text-secondary','font-bold');
      const href = link.getAttribute('href');
      if (href === `${id}.html` || href === `#${id}`) {
        link.classList.add('text-secondary','font-bold');
      }
    });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '0px 0px -50% 0px' });

  sections.forEach(sec => observer.observe(sec));
});
