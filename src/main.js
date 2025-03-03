// Import styles
import './styles.css';

// DOM elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contact-form');
const themeToggle = document.getElementById('theme-toggle');

// Mobile menu toggle
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Here you would typically send the data to a server
    console.log('Form submitted with data:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
  });
}

// Theme toggle (light/dark)
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    
    // Save preference to localStorage
    const isDarkMode = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDarkMode);
  });
  
  // Check for saved theme preference
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    document.documentElement.classList.add('dark');
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
      
      // Update URL without page reload
      history.pushState(null, null, targetId);
    }
  });
});

// Initialize any components or animations
document.addEventListener('DOMContentLoaded', () => {
  console.log('PFQ Web Application Initialized');
});
