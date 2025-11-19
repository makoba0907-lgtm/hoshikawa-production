// Main JavaScript for Hoshikawa Engineering Website
// Features: Smooth scrolling, Navigation highlighting, Form handling, Animations

(function() {
    'use strict';

    // ====== DOM Ready ======
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Hoshikawa Engineering - Website Loaded');
        
        // Initialize all features
        initNavigation();
        initSmoothScroll();
        initFormHandling();
        initAnimations();
        hideLoading();
    });

    // ====== Hide Loading Screen ======
    function hideLoading() {
        const splash = document.getElementById('splash');
        if (splash) {
            setTimeout(function() {
                splash.style.opacity = '0';
                splash.style.visibility = 'hidden';
                splash.style.transition = 'all 0.5s ease';
            }, 1500);
        }
    }

    // ====== Navigation Highlighting ======
    function initNavigation() {
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
            });
        });

        // Highlight on scroll
        window.addEventListener('scroll', function() {
            updateActiveNavLink();
        });
    }

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // ====== Smooth Scrolling ======
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for sticky header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ====== Form Handling ======
    function initFormHandling() {
        // Form submission (if contact form exists)
        const contactForm = document.querySelector('form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                
                // Validate form
                if (validateForm(formData)) {
                    console.log('Form submitted successfully');
                    // Here you would typically send data to a server
                    showNotification('お問い合わせありがとうございます。確認後ご連絡いたします。', 'success');
                    this.reset();
                } else {
                    showNotification('入力項目をご確認ください。', 'error');
                }
            });
        }
    }

    function validateForm(formData) {
        let isValid = true;
        
        for (let [key, value] of formData.entries()) {
            if (!value || value.trim() === '') {
                console.warn('Missing field: ' + key);
                isValid = false;
            }
        }
        
        return isValid;
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = 'notification ' + type;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            border-radius: 5px;
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(function() {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ====== Animations (WOW.js integration) ======
    function initAnimations() {
        // Check if WOW.js is available
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }
        
        // Additional animation triggers
        observeElements();
    }

    function observeElements() {
        const elements = document.querySelectorAll('.wow');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            elements.forEach(el => observer.observe(el));
        }
    }

    // ====== Mobile Menu Toggle ======
    function initMobileMenu() {
        const menuBtn = document.querySelector('.menu-btn');
        const nav = document.querySelector('nav');
        
        if (menuBtn) {
            menuBtn.addEventListener('click', function() {
                nav.classList.toggle('active');
            });
        }
    }

    // ====== Utility: Track Events ======
    function trackEvent(category, action, label) {
        if (typeof ga !== 'undefined') {
            ga('send', 'event', category, action, label);
        }
        console.log('Event tracked:', category, action, label);
    }

    // ====== Utility: Debounce Function ======
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ====== Scroll Event Optimization ======
    window.addEventListener('scroll', debounce(function() {
        updateActiveNavLink();
    }, 100));

    // ====== Global Functions (exposed for debugging) ======
    window.HoshikawaEngg = {
        trackEvent: trackEvent,
        showNotification: showNotification
    };

})();
