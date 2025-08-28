// Global variables
let currentSection = 0;
const totalSections = 3;
let isTransitioning = false;
let loadingComplete = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeIntroSequence();
    initializeNavigation();
    initializeEmailJS();
    initializeContactForm();
    initializeFloatingNavigation();
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
    
    // Wheel scroll navigation
    document.addEventListener('wheel', function(e) {
        if (isTransitioning || !loadingComplete) return;
        
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
                navigateToSection(index);
            }
        });
    });
    
    // CTA button - go to contact
    if (navCta) {
        navCta.addEventListener('click', function(e) {
            e.preventDefault();
            if (!isTransitioning && loadingComplete) {
                navigateToSection(3); // Contact section
            }
        });
    }
    
    // All other CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary:not(.submit-btn)');
    const secondaryButtons = document.querySelectorAll('.btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToSection(3); // Contact section
        });
    });
    
    secondaryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.textContent.includes('Learn More')) {
                navigateToSection(1); // About section
            } else {
                navigateToSection(3); // Contact section
            }
        });
    });
    
    function navigateToSection(sectionIndex) {
        if (sectionIndex === currentSection || isTransitioning) return;
        
        isTransitioning = true;
        currentSection = sectionIndex;
        
        // Update wrapper position
        const translateX = -sectionIndex * 100;
        wrapper.style.transform = `translateX(${translateX}vw)`;
        
        // Update navigation
        navItems.forEach((item, index) => {
            item.classList.toggle('active', index === sectionIndex);
        });
        
        // Reset transition flag
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }
    
    // Expose navigate function globally
    window.navigateToSection = navigateToSection;
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

// Console branding
console.log('%c🚀 KWForce Enterprise AI Solutions', 'color: #F0841D; font-size: 20px; font-weight: bold;');
console.log('%c⚡ Professional horizontal experience loaded', 'color: #059669; font-size: 14px; font-weight: 600;');
console.log('%c✨ Hidden floating navigation activated', 'color: #F0841D; font-size: 12px; font-style: italic;');
console.log('%c📧 EmailJS contact system ready (with mailto fallback)', 'color: #6366f1; font-size: 12px; font-style: italic;');