// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const primaryNav = document.getElementById('primary-nav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', function() {
    const isOpen = primaryNav.classList.contains('open');
    primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', !isOpen);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
      // Close mobile nav if open
      if (primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      }
    }
  });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check honeypot
    const honeypot = this.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value) {
      // Spam detected, silently ignore
      return;
    }
    
    const formData = new FormData(this);
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Success
        submitButton.textContent = 'Sent!';
        this.reset();
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      submitButton.textContent = 'Error - Try Again';
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }, 3000);
    });
  });
}