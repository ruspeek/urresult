document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const catalogMenu = document.getElementById('catalogMenu');

  if (hamburgerBtn && catalogMenu) {
    hamburgerBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      catalogMenu.classList.toggle('active');
    });
  }

  // Auto-dismiss flash messages
  const flashMessages = document.querySelectorAll('.flash-message');
  flashMessages.forEach(function(msg) {
    setTimeout(function() {
      msg.style.opacity = '0';
      msg.style.transform = 'translateX(100px)';
      msg.style.transition = 'all 0.5s ease';
      setTimeout(function() { msg.remove(); }, 500);
    }, 5000);
  });

  // Intersection Observer for animations
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-fadeInUp').forEach(function(el) {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
});