// Global variables
let currentSection = 0;
const totalSections = 3;
let isTransitioning = false;
let loadingComplete = false;
let isMobileDevice = false;
let mobileMenuOpen = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    detectMobileDevice();
    initializeIntroSequence();
    initializeNavigation();
    initializeEmailJS();
    initializeContactForm();
    initializeFloatingNavigation();
    initializeMobileOptimizations();
});

// Mobile Device Detection
function detectMobileDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    const wasMobile = isMobileDevice;
    isMobileDevice = isMobile || (isSmallScreen && isTouchDevice);
    
    // Add/remove mobile class to body
    if (isMobileDevice) {
        document.body.classList.add('mobile-device');
    } else {
        document.body.classList.remove('mobile-device');
    }
    
    // If device type changed, reinitialize navigation
    if (wasMobile !== isMobileDevice && loadingComplete) {
        reinitializeNavigation();
    }
}

// Reinitialize navigation when switching between mobile/desktop
function reinitializeNavigation() {
    const wrapper = document.getElementById('horizontalWrapper');
    if (!wrapper) return;
    
    // Reset position based on current device type
    if (isMobileDevice) {
        const translateY = -currentSection * 100;
        wrapper.style.transform = `translateY(${translateY}vh)`;
    } else {
        const translateX = -currentSection * 100;
        wrapper.style.transform = `translateX(${translateX}vw)`;
        
        // Close mobile menu if it was open
        if (mobileMenuOpen) {
            closeMobileMenu();
        }
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    detectMobileDevice();
});

// Intro Sequence
function initializeIntroSequence() {
    const introSequence = document.getElementById('introSequence');
    const mainContent = document.getElementById('mainContent');
    
    // Complete intro sequence after logo animation
    setTimeout(() => {
        introSequence.classList.add('hidden');
        
        setTimeout(() => {
            introSequence.style.display = 'none';
            mainContent.classList.add('show');
            loadingComplete = true;
        }, 1000);
    }, 3500);
}

// Navigation System
function initializeNavigation() {
    const wrapper = document.getElementById('horizontalWrapper');
    const navItems = document.querySelectorAll('.nav-item');
    const navCta = document.querySelector('.nav-cta');
    
    // Wheel scroll navigation (only for desktop)
    document.addEventListener('wheel', function(e) {
        if (isTransitioning || !loadingComplete || isMobileDevice) return;
        
        e.preventDefault();
        
        if (e.deltaY > 0 && currentSection < totalSections - 1) {
            navigateToSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
            navigateToSection(currentSection - 1);
        }
    }, { passive: false });
    
    // Touch navigation
    let touchStartX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (isTransitioning || !loadingComplete) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchStartX - touchEndX;
        
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0 && currentSection < totalSections - 1) {
                navigateToSection(currentSection + 1);
            } else if (deltaX < 0 && currentSection > 0) {
                navigateToSection(currentSection - 1);
            }
        }
    }, { passive: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (isTransitioning || !loadingComplete) return;
        
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                if (currentSection < totalSections - 1) {
                    e.preventDefault();
                    navigateToSection(currentSection + 1);
                }
                break;
            case 'ArrowLeft':
                if (currentSection > 0) {
                    e.preventDefault();
                    navigateToSection(currentSection - 1);
                }
                break;
        }
    });
    
    // Navigation items
    navItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            if (!isTransitioning && loadingComplete) {
                goToSection(index);
            }
        });
    });
    
    // CTA button - go to contact
    if (navCta) {
        navCta.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav CTA clicked, isMobileDevice:', isMobileDevice);
            goToSection(2); // Contact section (index 2)
        });
    }
    
    // All other CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary:not(.submit-btn)');
    const secondaryButtons = document.querySelectorAll('.btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Primary button clicked, isMobileDevice:', isMobileDevice);
            goToSection(2); // Contact section
        });
    });
    
    secondaryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Secondary button clicked:', this.textContent, 'isMobileDevice:', isMobileDevice);
            if (this.textContent.includes('Learn More')) {
                goToSection(1); // About section
            } else {
                goToSection(2); // Contact section
            }
        });
    });
    
    function navigateToSection(sectionIndex) {
        if (sectionIndex === currentSection || isTransitioning) return;
        
        isTransitioning = true;
        currentSection = sectionIndex;
        
        // Update wrapper position - adaptive for mobile/desktop
        if (isMobileDevice) {
            const translateY = -sectionIndex * 100;
            wrapper.style.transform = `translateY(${translateY}vh)`;
        } else {
            const translateX = -sectionIndex * 100;
            wrapper.style.transform = `translateX(${translateX}vw)`;
        }
        
        // Update navigation
        navItems.forEach((item, index) => {
            item.classList.toggle('active', index === sectionIndex);
        });
        
        // Update mobile indicators
        const indicators = document.querySelectorAll('.nav-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === sectionIndex);
        });
        
        // Close mobile menu if open
        if (isMobileDevice && mobileMenuOpen) {
            closeMobileMenu();
        }
        
        // Reset transition flag
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }
    
    // Unified navigation function
    function goToSection(sectionIndex) {
        console.log('goToSection called:', sectionIndex, 'isMobileDevice:', isMobileDevice);
        if (isMobileDevice) {
            scrollToSection(sectionIndex);
        } else {
            navigateToSection(sectionIndex);
        }
    }
    
    // Expose navigate functions globally
    window.navigateToSection = navigateToSection;
    window.goToSection = goToSection;
}

// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceID: 'service_kwforce',
    templateID: 'template_contact',
    publicKey: 'YOUR_PUBLIC_KEY' // Will be configured with real keys
};

// Initialize EmailJS
function initializeEmailJS() {
    // Initialize EmailJS with public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
}

// Contact Form Handler with EmailJS
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Set custom validation messages in English
        setCustomValidationMessages(form);
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            const originalBg = submitBtn.style.background;
            
            // Show loading state
            submitBtn.textContent = '⏳ Sending...';
            submitBtn.style.background = '#6366f1';
            submitBtn.disabled = true;
            
            const formData = new FormData(this);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                message: formData.get('message')
            };
            
            // Prepare email parameters for EmailJS template
            const emailParams = {
                to_email: 'sales@kwforce.com',
                from_name: `${data.firstName} ${data.lastName}`,
                from_email: data.email,
                company: data.company,
                phone: data.phone || 'Not provided',
                message: data.message || 'No specific message provided',
                subject: `AI Consultation Request - ${data.company}`
            };
            
            // Try EmailJS first, fallback to mailto if it fails
            if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
                // Send email using EmailJS
                emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, emailParams)
                    .then(function(response) {
                        console.log('✅ Email sent successfully:', response);
                        showFormSuccess('✅ Message sent successfully!', '#059669');
                        form.reset();
                    })
                    .catch(function(error) {
                        console.error('❌ EmailJS failed:', error);
                        fallbackToMailto(data);
                        showFormSuccess('📧 Opening email client...', '#f59e0b');
                    })
                    .finally(function() {
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                            submitBtn.style.background = originalBg;
                            submitBtn.disabled = false;
                        }, 3000);
                    });
            } else {
                // Fallback to mailto immediately if EmailJS not configured
                console.log('📧 Using mailto fallback (EmailJS not configured)');
                fallbackToMailto(data);
                showFormSuccess('📧 Opening email client...', '#f59e0b');
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = originalBg;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }
}

// Fallback to mailto if EmailJS fails or isn't configured
function fallbackToMailto(data) {
    const emailBody = `
NEW ENTERPRISE INQUIRY - KWForce AI Solutions

CONTACT INFORMATION:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company}

MESSAGE:
${data.message || 'No specific message provided'}

---
This inquiry was submitted through the KWForce website.
    `.trim();
    
    const subject = `AI Consultation Request - ${data.company}`;
    const mailtoLink = `mailto:sales@kwforce.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.open(mailtoLink, '_blank');
}

function showFormSuccess(message = '✅ Message sent successfully!', color = '#059669') {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.textContent = message;
        submitBtn.style.background = color;
        submitBtn.disabled = true;
    }
}

// Set custom validation messages in English
function setCustomValidationMessages(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Set custom validation messages
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            
            const field = this;
            let message = '';
            
            if (field.validity.valueMissing) {
                switch(field.name) {
                    case 'firstName':
                        message = 'Please enter your first name.';
                        break;
                    case 'lastName':
                        message = 'Please enter your last name.';
                        break;
                    case 'email':
                        message = 'Please enter your email address.';
                        break;
                    case 'company':
                        message = 'Please enter your company name.';
                        break;
                    case 'message':
                        message = 'Please tell us about your project.';
                        break;
                    default:
                        message = 'Please fill out this field.';
                }
            } else if (field.validity.typeMismatch && field.type === 'email') {
                message = 'Please enter a valid email address.';
            } else if (field.validity.tooShort) {
                message = `Please enter at least ${field.minLength} characters.`;
            } else if (field.validity.tooLong) {
                message = `Please enter no more than ${field.maxLength} characters.`;
            }
            
            field.setCustomValidity(message);
        });
        
        // Clear custom message when user starts typing
        input.addEventListener('input', function() {
            this.setCustomValidity('');
        });
        
        // Also clear on focus to ensure clean state
        input.addEventListener('focus', function() {
            this.setCustomValidity('');
        });
    });
}

// Floating Navigation
function initializeFloatingNavigation() {
    const floatingNavElements = document.querySelectorAll('.floating-nav');
    
    floatingNavElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const targetSection = this.getAttribute('data-nav');
            
            switch(targetSection) {
                case 'home':
                    navigateToSection(0);
                    break;
                case 'about':
                    navigateToSection(1);
                    break;
                case 'contact':
                    navigateToSection(2);
                    break;
            }
            
            // Add a subtle click effect
            this.style.transform = 'scale(1.6)';
            this.style.filter = 'brightness(1.5) drop-shadow(0 0 30px rgba(240, 132, 29, 1))';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.filter = '';
            }, 200);
        });
        
        // Add subtle glow effect on hover
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 25px rgba(240, 132, 29, 0.8)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Mobile Optimizations
function initializeMobileOptimizations() {
    if (!isMobileDevice) return;
    
    // Create mobile menu toggle
    createMobileMenuToggle();
    
    // Modify touch navigation for vertical scrolling
    modifyTouchNavigation();
    
    // Add mobile-specific styles
    addMobileStyles();
    
    // Add outside click handler
    addMobileMenuOutsideClickHandler();
}

function createMobileMenuToggle() {
    const bottomNav = document.querySelector('.bottom-nav');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('Creating mobile menu toggle:', {
        bottomNav: !!bottomNav,
        navMenu: !!navMenu,
        isMobileDevice: isMobileDevice
    });
    
    if (!bottomNav || !navMenu) {
        console.error('Cannot create mobile menu toggle - missing elements');
        return;
    }
    
    // Check if hamburger button already exists
    if (document.querySelector('.mobile-menu-toggle')) {
        console.log('Mobile menu toggle already exists');
        return;
    }
    
    // Create hamburger button
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.className = 'mobile-menu-toggle';
    hamburgerBtn.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;
    
    // Insert hamburger button
    bottomNav.insertBefore(hamburgerBtn, navMenu);
    
    // Add click handler
    hamburgerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Hamburger button clicked');
        toggleMobileMenu();
    });
    
    console.log('Mobile menu toggle created successfully');
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburgerBtn = document.querySelector('.mobile-menu-toggle');
    
    console.log('toggleMobileMenu called:', {
        navMenu: !!navMenu,
        hamburgerBtn: !!hamburgerBtn,
        isMobileDevice: isMobileDevice,
        currentMenuOpen: mobileMenuOpen
    });
    
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        navMenu.classList.add('mobile-menu-open');
        hamburgerBtn.classList.add('active');
        document.body.classList.add('menu-open');
        console.log('Menu opened - classes added');
    } else {
        closeMobileMenu();
        console.log('Menu closed');
    }
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburgerBtn = document.querySelector('.mobile-menu-toggle');
    
    mobileMenuOpen = false;
    navMenu.classList.remove('mobile-menu-open');
    hamburgerBtn.classList.remove('active');
    document.body.classList.remove('menu-open');
    console.log('Menu closed - classes removed');
}

// Add click handler to close menu when clicking outside
function addMobileMenuOutsideClickHandler() {
    document.addEventListener('click', function(e) {
        if (mobileMenuOpen && isMobileDevice) {
            const navMenu = document.querySelector('.nav-menu');
            const hamburgerBtn = document.querySelector('.mobile-menu-toggle');
            
            // Close menu if clicking outside of it
            if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
}

function modifyTouchNavigation() {
    // Implement smooth scroll tracking for mobile
    if (!isMobileDevice) return;
    
    initializeMobileScrollTracking();
    
    // Optional: Add edge swipe navigation for quick section jumps
    let touchStartY = 0;
    let touchStartX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (isTransitioning || !loadingComplete) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const deltaY = touchStartY - touchEndY;
        const deltaX = Math.abs(touchStartX - touchEndX);
        
        // Only trigger section navigation for very long swipes from screen edge
        const isEdgeSwipe = touchStartX < 50 || touchStartX > window.innerWidth - 50;
        const isLongSwipe = Math.abs(deltaY) > 150;
        const isVerticalSwipe = deltaX < 50;
        
        if (isEdgeSwipe && isLongSwipe && isVerticalSwipe) {
            if (deltaY > 0 && currentSection < totalSections - 1) {
                goToSection(currentSection + 1);
            } else if (deltaY < 0 && currentSection > 0) {
                goToSection(currentSection - 1);
            }
        }
    }, { passive: true });
}

function addMobileStyles() {
    // Add click handlers to mobile indicators
    const indicators = document.querySelectorAll('.nav-indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            if (!isTransitioning && loadingComplete) {
                goToSection(index);
            }
        });
    });
    
    console.log('Mobile optimizations applied');
}

// Mobile smooth scroll tracking
function initializeMobileScrollTracking() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    let scrollTimeout;
    let hasScrolled = false;
    
    mainContent.addEventListener('scroll', function() {
        // Hide scroll hint after first scroll
        if (!hasScrolled) {
            hasScrolled = true;
            document.body.classList.add('has-scrolled');
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateCurrentSectionFromScroll();
        }, 100);
    }, { passive: true });
}

function updateCurrentSectionFromScroll() {
    const sections = document.querySelectorAll('.h-section');
    const scrollTop = document.querySelector('.main-content').scrollTop;
    const windowHeight = window.innerHeight;
    
    let newCurrentSection = 0;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Check if section is in view (at least 50% visible)
        if (scrollTop >= sectionTop - windowHeight * 0.5 && 
            scrollTop < sectionTop + sectionHeight - windowHeight * 0.5) {
            newCurrentSection = index;
        }
    });
    
    if (newCurrentSection !== currentSection) {
        currentSection = newCurrentSection;
        
        // Update navigation indicators
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentSection);
        });
        
        const indicators = document.querySelectorAll('.nav-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSection);
        });
    }
}

// Smooth scroll to section for mobile
function scrollToSection(sectionIndex) {
    console.log('scrollToSection called:', sectionIndex);
    const sections = document.querySelectorAll('.h-section');
    const mainContent = document.querySelector('.main-content');
    
    if (sections[sectionIndex] && mainContent) {
        const targetSection = sections[sectionIndex];
        const offsetTop = targetSection.offsetTop;
        
        console.log('Scrolling to section', sectionIndex, 'offsetTop:', offsetTop);
        
        mainContent.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        currentSection = sectionIndex;
        
        // Update indicators immediately
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.classList.toggle('active', index === sectionIndex);
        });
        
        const indicators = document.querySelectorAll('.nav-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === sectionIndex);
        });
    } else {
        console.log('Section or mainContent not found:', {
            sectionExists: !!sections[sectionIndex],
            mainContentExists: !!mainContent,
            totalSections: sections.length
        });
    }
}

// Console branding
console.log('%c🚀 KWForce Enterprise AI Solutions', 'color: #F0841D; font-size: 20px; font-weight: bold;');
console.log('%c⚡ Professional horizontal experience loaded', 'color: #059669; font-size: 14px; font-weight: 600;');
console.log('%c✨ Hidden floating navigation activated', 'color: #F0841D; font-size: 12px; font-style: italic;');
console.log('%c📧 EmailJS contact system ready (with mailto fallback)', 'color: #6366f1; font-size: 12px; font-style: italic;');