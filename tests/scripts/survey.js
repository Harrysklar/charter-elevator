const stars = document.querySelectorAll('#survey-modal .star');
const openBtn = document.getElementById('open-survey');
const modal = document.getElementById('survey-modal');
const closeBtn = document.getElementById('close-survey');
const feedbackModal = document.getElementById('feedback-modal');
const closeFeedback = document.getElementById('close-feedback');
const feedbackForm = document.getElementById('feedback-form');

// 1) Hover behavior: fill stars up to hovered index
stars.forEach((star, idx) => {
  star.addEventListener('mouseover', () => {
    stars.forEach((s, i) => {
      if (i <= idx) {
        s.textContent = '★';
        s.classList.add('text-yellow-400');
      } else {
        s.textContent = '☆';
        s.classList.remove('text-yellow-400');
      }
    });
  });
  star.addEventListener('mouseout', () => {
    stars.forEach(s => {
      s.textContent = '☆';
      s.classList.remove('text-yellow-400');
    });
  });
});

// 2) Click behavior: record rating, then open feedback or redirect
stars.forEach(star => {
  star.addEventListener('click', () => {
    const rating = parseInt(star.getAttribute('data-rating'));
    modal.classList.add('hidden');
    if (rating >= 4) {
      alert('Thank you for the review! Please leave a review for us on Google Maps.');
      window.open(
        'https://www.google.com/maps/place/Charter+Elevator/@38.2793607,-171.2749322,3z/data=!4m10!1m2!2m1!1sCharter+Elevator!3m6!1s0x8854253e5492a405:0x72fb25cd45cd3f9b!8m2!3d46.423669!4d-129.9427086!15sChBDaGFydGVyIEVsZXZhdG9yIgOIAQGSARBlbGV2YXRvcl9zZXJ2aWNlqgFdCg0vZy8xMWM1OXA4ang4EAEqFCIQY2hhcnRlciBlbGV2YXRvcigAMh4QASIa1U5PY4c-wNBG7rkoI_oo4biQ_CNNI_oyPzgyFBACIhBjaGFydGVyIGVsZXZhdG9y4AEA!16s%2Fg%2F11y2gc018t?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D'
      );
    } else {
      feedbackModal.classList.remove('hidden');
    }
  });
});

// 3) Open/close survey modal
openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

// 4) Close both modals on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.add('hidden');
    feedbackModal.classList.add('hidden');
  }
});

// 5) Close feedback modal on “Cancel”
closeFeedback.addEventListener('click', () => feedbackModal.classList.add('hidden'));

// 6) Submit feedback form
feedbackForm.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your feedback! We will reach out to you soon.');
  feedbackModal.classList.add('hidden');
});
