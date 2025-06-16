// nav.js
document.addEventListener('DOMContentLoaded', () => {
  // Grab elements
  const navToggle    = document.getElementById('nav-toggle');
  const mobileMenu   = document.getElementById('mobile-menu');
  const miniToggle   = document.getElementById('mob-hamburger');
  const miniMenu     = document.getElementById('mob-menu');
  const headerEl     = document.querySelector('header');

  // 1) Toggle shared mobile nav (desktop → mobile)
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () =>
      mobileMenu.classList.toggle('hidden')
    );
  }

  // 2) Toggle mini-bar dropdown (Option 1)
  if (miniToggle && miniMenu) {
    miniToggle.addEventListener('click', () =>
      miniMenu.classList.toggle('hidden')
    );
  }

  // 3) Close both menus when clicking outside of them
  document.addEventListener('click', (e) => {
    // if click is anywhere in the header, ignore it
    if (headerEl.contains(e.target)) return;

    // shared mobile nav
    if (
      mobileMenu &&
      !mobileMenu.classList.contains('hidden') &&
      !mobileMenu.contains(e.target) &&
      navToggle && !navToggle.contains(e.target)
    ) {
      mobileMenu.classList.add('hidden');
    }

    // mini-bar dropdown
    if (
      miniMenu &&
      !miniMenu.classList.contains('hidden') &&
      !miniMenu.contains(e.target) &&
      miniToggle && !miniToggle.contains(e.target)
    ) {
      miniMenu.classList.add('hidden');
    }
  });

  // 4) Wire up “Leave Feedback” buttons in the mini-bar
  ['mob-survey', 'mob-survey-2'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () =>
        document.getElementById('open-survey').click()
      );
    }
  });

  // 5) Scroll-spy & active-link highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  function setActive(id) {
    navLinks.forEach(link => {
      link.classList.remove('text-secondary','font-bold');
      const href = link.getAttribute('href');
      if (href === `${id}.html` || href === `#${id}`) {
        link.classList.add('text-secondary','font-bold');
      }
    });
  }

  // On nav-link click: highlight & close menus
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href   = link.getAttribute('href');
      const target = href.includes('.html')
        ? href.replace('.html', '')
        : href.slice(1);

      setActive(target);
      if (mobileMenu) mobileMenu.classList.add('hidden');
      if (miniMenu)   miniMenu.classList.add('hidden');
    });
  });

  // IntersectionObserver for in-view sections
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, {
    rootMargin: '0px 0px -50% 0px'
  });
  sections.forEach(sec => observer.observe(sec));
});
