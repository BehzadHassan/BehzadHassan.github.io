// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Initialize animations and form handling
document.addEventListener('DOMContentLoaded', () => {
  // Select all cards and section headers
  const animateElements = document.querySelectorAll('.card, .section-header, .hero-content');
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });

  // Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Dynamic Navbar transparency
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Web3Forms Contact Form Handling
  const form = document.getElementById('contact-form');
  const result = document.getElementById('form-result');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
      result.innerHTML = "Sending...";
      result.className = "";

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
      .then(async (response) => {
        let res = await response.json();
        if (response.status == 200) {
          result.innerHTML = "Message sent successfully!";
          result.className = "success";
          form.reset();
        } else {
          console.log(response);
          result.innerHTML = res.message;
          result.className = "error";
        }
      })
      .catch(error => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
        result.className = "error";
      })
      .then(function() {
        setTimeout(() => {
          result.innerHTML = "";
          result.className = "";
        }, 5000);
      });
    });
  }
});

// CSS for the intersection observer animations
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

console.log('BehzadHassan.github.io initialized 🚀');
