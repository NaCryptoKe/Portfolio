// script.js — safe, defensive, working

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const hambtn = document.getElementById('hambtn');
  const navLinks = document.getElementById('nav-links');
  const toastContainer = document.getElementById('toast-container');
  const yearEl = document.getElementById('year');

  // Safety guards
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // NAV TOGGLE HANDLING
  if (hambtn && navLinks) {
    const openMenu = () => {
      hambtn.setAttribute('aria-expanded', 'true');
      navLinks.classList.add('show');
      navLinks.setAttribute('aria-hidden', 'false');
    };
    const closeMenu = () => {
      hambtn.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('show');
      navLinks.setAttribute('aria-hidden', 'true');
    };
    const toggleMenu = () => {
      const expanded = hambtn.getAttribute('aria-expanded') === 'true';
      if (expanded) closeMenu();
      else openMenu();
    };

    hambtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // close when one of the nav links is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        // small delay so anchor navigation can happen smoothly
        setTimeout(closeMenu, 50);
      });
    });

    // close on click outside
    document.addEventListener('click', (evt) => {
      if (!navLinks.classList.contains('show')) return;
      const target = evt.target;
      if (!navLinks.contains(target) && target !== hambtn && !hambtn.contains(target)) {
        closeMenu();
      }
    });

    // close on escape
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' && navLinks.classList.contains('show')) {
        closeMenu();
      }
    });
  }

  // === Animated Stats Counter ===
  const counters = document.querySelectorAll('.stat-num');
  const speed = 200; // higher = slower
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count')) || 0;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / speed));
    const tick = () => {
      current += step;
      if (current >= target) {
        counter.innerText = target;
      } else {
        counter.innerText = current;
        setTimeout(tick, 20);
      }
    };
    // start the count slightly delayed so it doesn't run before paint
    setTimeout(tick, 250);
  });

  // === Toast Notifications ===
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message || 'Done';
    toastContainer.appendChild(toast);
    // remove after animation
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 3800);
  }

  // Attach to elements that explicitly request a toast (data-toast)
  document.querySelectorAll('[data-toast]').forEach(el => {
    el.addEventListener('click', (e) => {
      // do not block default behaviour (links, mailto, etc.)
      const msg = el.getAttribute('data-toast') || 'Action';
      showToast(msg);
    });
  });

  // Contact form fake submit (demo)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent — I\'ll reply soon.');
      contactForm.reset();
    });
  }
});
