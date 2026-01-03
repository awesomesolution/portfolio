// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const primaryNav = document.getElementById('primary-nav');
const body = document.body;

if (navToggle && primaryNav) {
  // Handle both click and touch events for better mobile support
  const toggleMenu = function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const isOpen = primaryNav.classList.contains('open');
    
    if (isOpen) {
      // Close menu
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
      body.style.overflow = '';
    } else {
      // Open menu
      primaryNav.classList.add('open');
      navToggle.setAttribute('aria-expanded', true);
      body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  };
  
  navToggle.addEventListener('click', toggleMenu);
  navToggle.addEventListener('touchstart', toggleMenu, { passive: false });
  
  // Close menu when clicking on the overlay (background)
  primaryNav.addEventListener('click', function(e) {
    // Check if clicked on overlay or close button area
    const rect = primaryNav.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // If clicked on overlay or in the top-right close area
    if (e.target === primaryNav || (clickX > rect.width - 60 && clickY < 60)) {
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
      body.style.overflow = '';
    }
  });
  
  // Close menu when touching the overlay on mobile
  primaryNav.addEventListener('touchstart', function(e) {
    // Check if touched on overlay or close button area
    const rect = primaryNav.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const touchY = e.touches[0].clientY - rect.top;
    
    // If touched on overlay or in the top-right close area
    if (e.target === primaryNav || (touchX > rect.width - 60 && touchY < 60)) {
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
      body.style.overflow = '';
    }
  }, { passive: true });
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
      if (primaryNav && primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', false);
        body.style.overflow = '';
      }
    }
  });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  let isSubmitting = false;
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
    
    // Check honeypot
    const honeypot = this.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value) {
      // Spam detected, silently ignore
      return;
    }
    
    const formData = new FormData(this);
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    isSubmitting = true;
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
          isSubmitting = false;
        }, 5000); // Longer cooldown on success
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
        isSubmitting = false;
      }, 3000);
    });
  });
}