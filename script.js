/**
 * WINE WORLD - MAIN JAVASCRIPT
 * Developed for College Internship Project
 * Features: Responsive Nav, Automatic/Manual Slider, Lightbox Gallery, Category Filter, Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. Scroll Header Effect
     ========================================================================== */
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     2. Responsive Navigation Menu
     ========================================================================== */
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     3. Hero Image Slider (Home Page)
     ========================================================================== */
  const slides = document.querySelectorAll('.slide');
  const nextBtn = document.querySelector('.arrow-next');
  const prevBtn = document.querySelector('.arrow-prev');
  
  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 2000; // 2 seconds

    const showSlide = (index) => {
      // Remove active from all slides
      slides.forEach(slide => slide.classList.remove('active'));
      
      // Handle index wrapping
      if (index >= slides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = index;
      }
      
      // Add active to current slide
      slides[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
      showSlide(currentSlide + 1);
    };

    const prevSlide = () => {
      showSlide(currentSlide - 1);
    };

    // Auto sliding starter
    const startSlideInterval = () => {
      slideInterval = setInterval(nextSlide, intervalTime);
    };

    // Reset slide interval on manual user interaction
    const resetSlideInterval = () => {
      clearInterval(slideInterval);
      startSlideInterval();
    };

    // Initialize auto slider
    startSlideInterval();

    // Slide controllers
    if (nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideInterval();
      });

      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideInterval();
      });
    }
  }

  /* ==========================================================================
     4. Product Filtering (Products Page)
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button class
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            // Subtle fade-in animation
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transition = 'opacity 0.4s ease';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ==========================================================================
     5. Lightbox Gallery (Gallery Page)
     ========================================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = title;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop scrolling behind modal
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto'; // Re-enable scroll
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close on clicking outside the image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  /* ==========================================================================
     6. Contact Form Validation (Contact Page)
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formAlert = document.getElementById('formAlert');

    // Email pattern validation
    const isValidEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    const setError = (element, message) => {
      const inputGroup = element.parentElement;
      inputGroup.classList.add('error');
      inputGroup.classList.remove('success');
      
      const errorDiv = inputGroup.querySelector('.error-message');
      if (errorDiv) {
        errorDiv.textContent = message;
      }
    };

    const setSuccess = (element) => {
      const inputGroup = element.parentElement;
      inputGroup.classList.add('success');
      inputGroup.classList.remove('error');
    };

    const checkInputs = () => {
      let isFormValid = true;

      // Validate Name
      if (nameInput.value.trim() === '') {
        setError(nameInput, 'Name is required');
        isFormValid = false;
      } else if (nameInput.value.trim().length < 3) {
        setError(nameInput, 'Name must be at least 3 characters');
        isFormValid = false;
      } else {
        setSuccess(nameInput);
      }

      // Validate Email
      if (emailInput.value.trim() === '') {
        setError(emailInput, 'Email is required');
        isFormValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        setError(emailInput, 'Please enter a valid email address');
        isFormValid = false;
      } else {
        setSuccess(emailInput);
      }

      // Validate Message
      if (messageInput.value.trim() === '') {
        setError(messageInput, 'Message is required');
        isFormValid = false;
      } else if (messageInput.value.trim().length < 10) {
        setError(messageInput, 'Message must be at least 10 characters');
        isFormValid = false;
      } else {
        setSuccess(messageInput);
      }

      return isFormValid;
    };

    // Realtime validation feedback on typing/blurring
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 3) setSuccess(nameInput);
    });
    
    emailInput.addEventListener('input', () => {
      if (isValidEmail(emailInput.value.trim())) setSuccess(emailInput);
    });
    
    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim().length >= 10) setSuccess(messageInput);
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Trigger full check
      const isValid = checkInputs();

      if (isValid) {
        // Display Success Alert
        formAlert.className = 'form-alert success';
        formAlert.textContent = 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
        
        // Reset form inputs & validation status styles
        contactForm.reset();
        const groups = contactForm.querySelectorAll('.form-group');
        groups.forEach(group => group.classList.remove('success', 'error'));
        
        // Scroll to alert message
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        // Display Error Alert
        formAlert.className = 'form-alert error';
        formAlert.textContent = 'Please correct the errors below before submitting.';
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

});
