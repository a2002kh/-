// ============================================
// قسم الشبكات - Networks Department
// كلية تكنولوجيا المعلومات - جامعة بابل
// JavaScript for Interactions & Animations
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // Navigation
  // ============================================
  
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navbar = document.getElementById('navbar');
  
  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }
  
  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // ============================================
  // Scroll Animations
  // ============================================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Handle delay attribute
        const delay = entry.target.getAttribute('data-delay');
        if (delay) {
          entry.target.style.transitionDelay = delay + 'ms';
        }
      }
    });
  }, observerOptions);
  
  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll('.step-item, .feature-card, .value-card, .leadership-card, .college-card, .news-card, .program-item, .quick-link-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
  
  // ============================================
  // Counter Animation (Stats)
  // ============================================
  
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isDecimal = target % 1 !== 0;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        if (isDecimal) {
          element.textContent = target.toFixed(1);
        } else {
          element.textContent = target.toLocaleString();
        }
        clearInterval(timer);
      } else {
        if (isDecimal) {
          element.textContent = start.toFixed(1);
        } else {
          element.textContent = Math.floor(start).toLocaleString();
        }
      }
    }, 16);
  }
  
  const statNumbers = document.querySelectorAll('.stat-number, .mission-stat-number');
  const statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        const target = parseFloat(entry.target.getAttribute('data-target'));
        if (target) {
          entry.target.classList.add('animated');
          animateCounter(entry.target, target);
        }
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => {
    statObserver.observe(stat);
  });
  
  // ============================================
  // Smooth Scrolling
  // ============================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // ============================================
  // Contact Form Handling
  // ============================================
  
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Simple validation
      if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
        showFormMessage('يرجى ملء جميع الحقول المطلوبة.', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showFormMessage('يرجى إدخال عنوان بريد إلكتروني صحيح.', 'error');
        return;
      }
      
      // Simulate form submission
      showFormMessage('جاري إرسال الرسالة...', 'success');
      
      // In a real application, you would send the data to a server
      setTimeout(() => {
        showFormMessage('شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك في أقرب وقت ممكن.', 'success');
        contactForm.reset();
      }, 1500);
    });
  }
  
  function showFormMessage(message, type) {
    if (formMessage) {
      formMessage.textContent = message;
      formMessage.className = 'form-message ' + type;
      formMessage.style.display = 'block';
      
      // Scroll to message
      formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      // Hide message after 5 seconds for success messages
      if (type === 'success') {
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      }
    }
  }
  
  // ============================================
  // Button Hover Effects
  // ============================================
  
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // ============================================
  // Card Hover Effects
  // ============================================
  
  const cards = document.querySelectorAll('.card, .feature-card, .step-item, .value-card, .leadership-card, .college-card, .news-card, .program-item, .quick-link-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // ============================================
  // Parallax Effect for Hero Background
  // ============================================
  
  const heroBackground = document.querySelector('.hero-background');
  if (heroBackground) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero && scrolled < hero.offsetHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  }
  
  // ============================================
  // Active Navigation Link Highlighting
  // ============================================
  
  function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkPath = new URL(link.href).pathname;
      const currentPage = currentPath.split('/').pop() || 'index.html';
      const linkPage = linkPath.split('/').pop();
      
      if (linkPage === currentPage || 
          (currentPage === '' && linkPage === 'index.html') ||
          (currentPath.includes(linkPage))) {
        link.classList.add('active');
      }
    });
  }
  
  updateActiveNavLink();
  
  // ============================================
  // Loading Animation
  // ============================================
  
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.animation = 'fadeInUp 0.8s ease-out';
    }
  });
  
  // ============================================
  // Form Input Focus Effects
  // ============================================
  
  const formInputs = document.querySelectorAll('input, textarea, select');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });
  
  // ============================================
  // Scroll to Top Button
  // ============================================
  
  // Create scroll to top button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  `;
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #d4af37, #e8c547);
    color: #0a1929;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
  `;
  
  document.body.appendChild(scrollTopBtn);
  
  // Show/hide scroll to top button
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.visibility = 'visible';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top functionality
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Hover effect for scroll to top button
  scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px) scale(1.1)';
    this.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.5)';
  });
  
  scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.4)';
  });
  
  // ============================================
  // Programs Tabs
  // ============================================
  
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
  
  // ============================================
  // Lazy Loading Images (Performance Enhancement)
  // ============================================
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
  
  // ============================================
  // Enhanced Card Interactions
  // ============================================
  
  const interactiveCards = document.querySelectorAll('.feature-card, .value-card, .leadership-card, .college-card, .news-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
  
  // ============================================
  // Smooth Page Transitions
  // ============================================
  
  document.querySelectorAll('a[href^=""]').forEach(link => {
    if (link.hostname === window.location.hostname || !link.hostname) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          // Add fade out effect
          document.body.style.opacity = '0.8';
          document.body.style.transition = 'opacity 0.2s ease';
        }
      });
    }
  });
  
  // ============================================
  // Console Welcome Message
  // ============================================
  
  console.log('%cقسم الشبكات - Networks Department', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
  console.log('%cكلية تكنولوجيا المعلومات - جامعة بابل', 'color: #00ff88; font-size: 14px;');
  console.log('%cمرحباً بك في موقعنا الإلكتروني!', 'color: #00d4ff; font-size: 14px;');
  console.log('%cللاستفسارات: networks@uobabylon.edu.iq', 'color: #94a3b8; font-size: 12px;');
  
  // ============================================
  // Performance Monitoring
  // ============================================
  
  if ('performance' in window) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
      }, 0);
    });
  }
  
});
