// =============================================
// MAGEN RADON SOLUTIONS — MAIN JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Nav Toggle ----
  const toggle  = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      if (mobileNav.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translateY(7px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  // ---- Dropdown Toggle ----
  document.querySelectorAll('.nav-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = btn.closest('.nav-dropdown');
      const isOpen = dropdown.classList.contains('open');
      document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
      if (!isOpen) dropdown.classList.add('open');
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
  });

  // ---- Active Nav Link ----
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  // Highlight Services button when on a service page
  if (currentPath === 'mitigation.html' || currentPath === 'testing.html') {
    document.querySelectorAll('.nav-dropdown-btn').forEach(btn => btn.classList.add('active'));
  }

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ---- Fade-in on scroll ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ---- Contact Form Submit ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type=submit]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      const data = {
        'First Name':    contactForm.firstName.value,
        'Last Name':     contactForm.lastName.value,
        'Phone':         contactForm.phone.value,
        'Email':         contactForm.email.value,
        'Address':       contactForm.address.value,
        'Service':       contactForm.service.value,
        'Foundation':    contactForm.foundation.value,
        'Message':       contactForm.message.value,
      };

      try {
        const res = await fetch('https://formspree.io/f/xpqkqeky', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          btn.textContent = '✓ Request Sent!';
          btn.style.background = '#16A34A';
          contactForm.reset();
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = '';
          }, 5000);
        } else {
          throw new Error();
        }
      } catch {
        btn.textContent = 'Something went wrong — try again';
        btn.style.background = '#DC2626';
        btn.disabled = false;
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 4000);
      }
    });
  }

});
