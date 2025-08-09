// === Mobile Navigation Toggle ===
document.querySelector('.hambtn').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('show');
});

// === Animated Stats Counter ===
const counters = document.querySelectorAll('.stat-num');
const speed = 200; // Lower = faster
counters.forEach(counter => {
  const animate = () => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;

    const increment = Math.ceil(target / speed);

    if (count < target) {
      counter.innerText = count + increment;
      setTimeout(animate, 20);
    } else {
      counter.innerText = target;
    }
  };
  animate();
});

// === Toast Notifications ===
function showToast(message) {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// Example usage
document.querySelector('.btn.primary').addEventListener('click', (e) => {
  e.preventDefault();
  showToast('Thanks for checking me out! 🚀');
});

document.querySelector('.btn.secondary').addEventListener('click', (e) => {
  e.preventDefault();
  showToast('Grabbing my resume 📄');
});
