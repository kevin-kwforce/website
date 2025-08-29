// Global variables
let currentSection = 0;
const totalSections = 3;
let isTransitioning = false;
let loadingComplete = false;
let isMobileDevice = false;

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
                const sectionIndex = parseInt(this.getAttribute('data-section')) || index;
                goToSection(sectionIndex);
            }
        });
    });
    
    // CTA button - go to contact form (Get Consultation)
    if (navCta) {
        navCta.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav CTA clicked, isMobileDevice:', isMobileDevice);
            goToSection(2); // Contact section (index 2) - goes to form
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
            // On mobile, just scroll to the section smoothly
            const sections = document.querySelectorAll('.h-section');
            if (sections[sectionIndex]) {
                const targetSection = sections[sectionIndex];
                const offsetTop = targetSection.offsetTop;
                
                document.querySelector('.main-content').scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
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
        
        // Hide scroll hint when reaching contact section (section 2) in mobile
        if (isMobileDevice && sectionIndex === 2) {
            document.body.classList.add('at-contact-section');
        } else if (isMobileDevice) {
            document.body.classList.remove('at-contact-section');
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
    
    // Modify touch navigation for vertical scrolling
    modifyTouchNavigation();
    
    // Add mobile-specific styles
    addMobileStyles();
    
    // Check initial position for scroll hint
    setTimeout(() => {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            const scrollTop = mainContent.scrollTop;
            const clientHeight = mainContent.clientHeight;
            const scrollHeight = mainContent.scrollHeight;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
            
            if (isAtBottom) {
                document.body.classList.add('at-bottom');
                console.log('Initial check: Added at-bottom class');
            }
        }
    }, 1000);
}

// Hamburger menu removed for mobile

// Mobile menu functions removed



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
        
        // Add momentum scrolling for better mobile experience
        const velocity = Math.abs(deltaY) / 100; // Calculate swipe velocity
        if (velocity > 2 && !isEdgeSwipe) {
            // Fast swipes get momentum scrolling
            const momentum = Math.min(velocity * 50, 200);
            mainContent.scrollBy({
                top: deltaY > 0 ? momentum : -momentum,
                behavior: 'smooth'
            });
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
                // Add visual feedback
                indicator.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    indicator.style.transform = '';
                }, 200);
                
                goToSection(index);
            }
        });
    });
    
    // Add smooth scroll behavior for better mobile experience
    if (isMobileDevice) {
        document.documentElement.style.scrollBehavior = 'smooth';
        document.body.style.scrollBehavior = 'smooth';
    }
    
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
        
        // Check if user is at the bottom of the page
        const scrollTop = mainContent.scrollTop;
        const clientHeight = mainContent.clientHeight;
        const scrollHeight = mainContent.scrollHeight;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20; // Increased threshold
        
        console.log('Scroll check:', {
            scrollTop,
            clientHeight,
            scrollHeight,
            isAtBottom,
            difference: scrollHeight - (scrollTop + clientHeight)
        });
        
        if (isAtBottom) {
            document.body.classList.add('at-bottom');
            console.log('Added at-bottom class');
        } else {
            document.body.classList.remove('at-bottom');
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateCurrentSectionFromScroll();
        }, 100);
    }, { passive: true });
    
    // Add scrollend event listener for better bottom detection
    mainContent.addEventListener('scrollend', function() {
        const scrollTop = mainContent.scrollTop;
        const clientHeight = mainContent.clientHeight;
        const scrollHeight = mainContent.scrollHeight;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
        
        if (isAtBottom) {
            document.body.classList.add('at-bottom');
            console.log('Scrollend: Added at-bottom class');
        }
    }, { passive: true });
}

function updateCurrentSectionFromScroll() {
    const sections = document.querySelectorAll('.h-section');
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    const scrollTop = mainContent.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = mainContent.scrollHeight;
    
    let newCurrentSection = 0;
    let bestMatch = 0;
    let bestVisibility = 0;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Calculate how much of the section is visible
        const visibleTop = Math.max(0, Math.min(windowHeight, sectionBottom - scrollTop));
        const visibleBottom = Math.max(0, Math.min(windowHeight, scrollTop + windowHeight - sectionTop));
        const visibleHeight = Math.min(visibleTop, visibleBottom);
        const visibility = visibleHeight / Math.min(sectionHeight, windowHeight);
        
        // Find the section with the highest visibility
        if (visibility > bestVisibility) {
            bestVisibility = visibility;
            bestMatch = index;
        }
        
        // Also check if we're in the middle of a section
        const sectionCenter = sectionTop + sectionHeight / 2;
        const viewportCenter = scrollTop + windowHeight / 2;
        
        if (Math.abs(sectionCenter - viewportCenter) < windowHeight * 0.3) {
            newCurrentSection = index;
        }
    });
    
    // Use the best match if no clear section center was found
    if (newCurrentSection === 0 && bestVisibility > 0.3) {
        newCurrentSection = bestMatch;
    }
    
            if (newCurrentSection !== currentSection) {
            currentSection = newCurrentSection;
            
            // Update navigation indicators with smooth transition
            const navItems = document.querySelectorAll('.nav-item');
            const indicators = document.querySelectorAll('.nav-indicator');
            
            navItems.forEach((item, index) => {
                item.classList.toggle('active', index === currentSection);
            });
            
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSection);
            });
            
            // Hide scroll hint when reaching contact section (section 2)
            if (currentSection === 2) {
                document.body.classList.add('at-contact-section');
            } else {
                document.body.classList.remove('at-contact-section');
            }
            
            console.log('Section changed to:', currentSection, 'Visibility:', bestVisibility);
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
        const windowHeight = window.innerHeight;
        
        // Calculate optimal scroll position (center the section)
        const sectionHeight = targetSection.offsetHeight;
        const optimalOffset = offsetTop - (windowHeight - sectionHeight) / 2;
        const finalOffset = Math.max(0, optimalOffset);
        
        console.log('Scrolling to section', sectionIndex, 'offsetTop:', finalOffset);
        
        // Smooth scroll with easing
        mainContent.scrollTo({
            top: finalOffset,
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
        
        // Hide scroll hint when reaching contact section (section 2)
        if (sectionIndex === 2) {
            document.body.classList.add('at-contact-section');
        } else {
            document.body.classList.remove('at-contact-section');
        }
        
        // Add a small delay to prevent scroll tracking conflicts
        setTimeout(() => {
            updateCurrentSectionFromScroll();
            
            // Check bottom position after scroll
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                const scrollTop = mainContent.scrollTop;
                const clientHeight = mainContent.clientHeight;
                const scrollHeight = mainContent.scrollHeight;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
                
                if (isAtBottom) {
                    document.body.classList.add('at-bottom');
                    console.log('Post-scroll: Added at-bottom class');
                }
            }
        }, 500);
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