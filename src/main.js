// Import styles
import './styles.css';

// DOM elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contact-form');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('svg');
const navLinks = document.querySelectorAll('.nav-link');
const animatedElements = document.querySelectorAll('.animate-on-scroll');

// Mobile menu toggle with animation
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Animate the menu items if visible
    if (!mobileMenu.classList.contains('hidden')) {
      const menuItems = mobileMenu.querySelectorAll('a');
      menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          item.style.transition = 'all 0.3s ease-out';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 100 * index);
      });
    }
  });
}

// Enhanced form submission with validation and feedback
if (contactForm) {
  // Add input event listeners for real-time validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validateInput(input);
    });
    
    input.addEventListener('blur', () => {
      validateInput(input);
    });
  });
  
  // Form submission with visual feedback
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all inputs
    let isValid = true;
    inputs.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });
    
    if (!isValid) return;
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted with data:', data);
      
      // Reset form and show success message
      contactForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4 animate-fade-in';
      successMessage.innerHTML = `
        <strong class="font-bold">Success!</strong>
        <span class="block sm:inline"> Thank you for your message! We'll get back to you soon.</span>
      `;
      contactForm.appendChild(successMessage);
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.add('opacity-0');
        successMessage.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => successMessage.remove(), 500);
      }, 5000);
    }, 1500);
  });
  
  // Input validation function
  function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove any existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Check if required field is empty
    if (input.hasAttribute('required') && value === '') {
      isValid = false;
      errorMessage = 'This field is required';
    } 
    // Email validation
    else if (input.type === 'email' && value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    
    // Add error message if invalid
    if (!isValid) {
      const errorElement = document.createElement('p');
      errorElement.className = 'error-message text-red-500 text-xs mt-1';
      errorElement.textContent = errorMessage;
      input.parentNode.appendChild(errorElement);
      input.classList.add('border-red-500');
    } else {
      input.classList.remove('border-red-500');
    }
    
    return isValid;
  }
}

// Enhanced theme toggle with animation
if (themeToggle && themeIcon) {
  // Update icon based on current theme
  function updateThemeIcon(isDark) {
    if (isDark) {
      // Sun icon
      themeIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      `;
    } else {
      // Moon icon
      themeIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      `;
    }
  }
  
  // Toggle theme with animation
  themeToggle.addEventListener('click', () => {
    // Add transition class to body
    document.body.classList.add('transition-colors', 'duration-300');
    
    // Toggle dark mode
    const isDarkMode = document.documentElement.classList.toggle('dark');
    
    // Update icon with animation
    themeIcon.classList.add('animate-spin');
    setTimeout(() => {
      updateThemeIcon(isDarkMode);
      themeIcon.classList.remove('animate-spin');
    }, 300);
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
  });
  
  // Check for saved theme preference
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    document.documentElement.classList.add('dark');
    updateThemeIcon(true);
  }
}

// Enhanced smooth scrolling with active state for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Smooth scroll
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Update URL without page reload
      history.pushState(null, null, targetId);
      
      // Update active state for nav links
      updateActiveNavLink(targetId);
    }
  });
});

// Update active nav link based on scroll position
function updateActiveNavLink(activeId = null) {
  // If activeId is provided, use it, otherwise determine from scroll position
  if (!activeId) {
    const scrollPosition = window.scrollY + 100;
    
    // Find the current section
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeId = `#${section.id}`;
      }
    });
  }
  
  // Update nav links
  if (activeId) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// Scroll animations
function handleScrollAnimations() {
  animatedElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight * 0.85) {
      element.classList.add('animated');
      
      // Add specific animation class if specified
      const animationType = element.dataset.animation;
      if (animationType) {
        element.classList.add(`animate-${animationType}`);
      }
    }
  });
}

// Typing animation for hero text
function initTypewriter() {
  const heroText = document.querySelector('.typewriter');
  if (!heroText) return;
  
  const text = heroText.textContent;
  heroText.textContent = '';
  heroText.style.visibility = 'visible';
  
  let i = 0;
  const typeSpeed = 100; // ms per character
  
  function type() {
    if (i < text.length) {
      heroText.textContent += text.charAt(i);
      i++;
      setTimeout(type, typeSpeed);
    }
  }
  
  // Start typing after a delay
  setTimeout(type, 500);
}

// Parallax effect for hero section
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.2;
      element.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
}

// Counter animation for statistics
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000; // ms
    const step = Math.ceil(target / (duration / 16)); // 60fps
    
    let current = 0;
    const updateCounter = () => {
      current += step;
      if (current > target) current = target;
      counter.textContent = current.toLocaleString();
      
      if (current < target) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    // Start counter when element is in view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

// Initialize components and animations
document.addEventListener('DOMContentLoaded', () => {
  console.log('PFQ Web Application Initialized');
  
  // Initialize scroll animations
  handleScrollAnimations();
  window.addEventListener('scroll', handleScrollAnimations);
  
  // Initialize active nav link
  updateActiveNavLink();
  window.addEventListener('scroll', () => {
    updateActiveNavLink();
  });
  
  // Initialize typewriter effect
  initTypewriter();
  
  // Initialize parallax effect
  initParallax();
  
  // Initialize counters
  initCounters();
  
  // Add nav-link class to navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.add('nav-link');
  });
});
