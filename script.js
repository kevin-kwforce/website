// Global variables
let currentSection = 0;
const totalSections = 5; // Updated to 5: Home, About, Contact, Blog, FAQ
let isTransitioning = false;
let loadingComplete = false;
let isMobileDevice = false;
let initialTargetSection = 0; // Store initial URL target section

// ============================================
// BLOG ARTICLE SYSTEM - Must be defined early for initializeIntroSequence
// ============================================

// Blog articles content (global for access from initializeIntroSequence)
window.blogArticles = {
    'future-of-enterprise-ai': {
        category: 'AI Strategy',
        date: 'Dec 2025',
        readTime: '8 min read',
        title: 'The Future of Enterprise AI: From Hype to Reality',
        excerpt: 'As we approach 2026, artificial intelligence has moved beyond experimental phases into core business operations. Discover how leading companies are implementing AI strategies that deliver measurable ROI and sustainable competitive advantages.',
        content: `
            <h2>The AI Revolution is Here</h2>
            <p>After years of experimentation and pilot programs, artificial intelligence has finally reached the mainstream in enterprise environments. What was once considered cutting-edge technology is now becoming a critical component of business operations across industries.</p>
            
            <p>The transformation is remarkable: according to recent studies, over 75% of Fortune 500 companies now have active AI implementations, with the majority reporting measurable improvements in operational efficiency, decision-making, and customer satisfaction.</p>
            
            <h2>From Hype to Reality: What Changed?</h2>
            <p>Several key factors have contributed to this shift from experimental to essential:</p>
            
            <ul>
                <li><strong>Maturation of Technology:</strong> AI models have become more reliable, accurate, and easier to implement. Cloud-based solutions and pre-trained models have significantly lowered the technical barriers to entry.</li>
                <li><strong>Proven ROI:</strong> Early adopters have demonstrated clear returns on investment, making it easier for other companies to justify AI initiatives.</li>
                <li><strong>Competitive Pressure:</strong> Companies that don't adopt AI risk falling behind competitors who leverage it for efficiency gains and innovation.</li>
                <li><strong>Data Maturity:</strong> Organizations now have the data infrastructure and governance needed to effectively train and deploy AI systems.</li>
            </ul>
            
            <h2>Key Implementation Strategies</h2>
            <p>Successful enterprise AI implementations share several common characteristics:</p>
            
            <h3>Start with Clear Business Objectives</h3>
            <p>The most successful AI projects begin with specific, measurable business goals rather than technology-first thinking. Whether it's reducing customer support response times, improving forecasting accuracy, or automating document processing, clarity on desired outcomes is essential.</p>
            
            <h3>Build the Right Team</h3>
            <p>AI success requires collaboration between technical experts and business stakeholders. The most effective organizations create cross-functional teams that include data scientists, domain experts, and business leaders.</p>
            
            <h3>Focus on Data Quality</h3>
            <p>AI is only as good as the data it learns from. Investing in data infrastructure, governance, and quality assurance pays significant dividends in AI performance and reliability.</p>
            
            <h2>The Path Forward</h2>
            <p>As we look toward 2026 and beyond, several trends are emerging that will shape the future of enterprise AI:</p>
            
            <ul>
                <li><strong>Hybrid AI Approaches:</strong> Combining on-premise and cloud solutions to balance privacy, performance, and cost.</li>
                <li><strong>Industry-Specific Solutions:</strong> Moving beyond generic AI to specialized models trained for specific sectors and use cases.</li>
                <li><strong>Explainable AI:</strong> Growing emphasis on understanding and explaining AI decisions, particularly in regulated industries.</li>
                <li><strong>AI Governance:</strong> Establishing frameworks for ethical AI use, bias mitigation, and regulatory compliance.</li>
            </ul>
            
            <blockquote>The companies that will lead in the coming decade are those that view AI not as a technology project, but as a fundamental business transformation.</blockquote>
            
            <h2>Getting Started</h2>
            <p>If your organization is ready to move beyond AI hype to real implementation, the key is to start with a focused pilot project that addresses a specific business need. Success with one project builds organizational confidence and provides a foundation for broader AI adoption.</p>
            
            <p>At KWForce, we help companies navigate this transition with strategic planning, technical implementation, and ongoing support to ensure AI initiatives deliver measurable business value.</p>
        `
    },
    'local-llms-privacy-first': {
        category: 'Technology',
        date: 'Nov 2025',
        readTime: '6 min read',
        title: 'Local LLMs: Privacy-First AI Solutions',
        excerpt: 'Why more enterprises are choosing local Large Language Models over cloud-based alternatives. Learn about the security, compliance, and performance benefits of keeping your AI infrastructure in-house.',
        content: `
            <h2>The Privacy Challenge in AI</h2>
            <p>As organizations increasingly rely on Large Language Models (LLMs) for everything from document analysis to customer support, a critical question has emerged: where should this processing happen?</p>
            
            <p>While cloud-based AI services offer convenience and powerful capabilities, they come with significant privacy concerns. Every query, every document, every piece of data sent to cloud AI services leaves your organization's direct control.</p>
            
            <h2>Why Local LLMs Matter</h2>
            <p>Local LLMs—AI models that run entirely within your organization's infrastructure—offer a compelling alternative for enterprises with serious privacy and security requirements.</p>
            
            <h3>Complete Data Control</h3>
            <p>With local LLMs, your sensitive business information never leaves your premises. There's no third-party access, no cloud storage, no external processing.</p>
            
            <h2>Implementation Considerations</h2>
            <p>Deploying local LLMs requires careful planning but offers significant long-term benefits for data-sensitive organizations.</p>
        `
    },
    'ai-integration-guide': {
        category: 'Best Practices',
        date: 'Nov 2025',
        readTime: '10 min read',
        title: 'AI Integration: A Step-by-Step Guide',
        excerpt: 'Successfully integrating AI into existing workflows requires careful planning and execution. This comprehensive guide walks you through the essential steps, from assessment to deployment and beyond.',
        content: `
            <h2>The AI Integration Challenge</h2>
            <p>Integrating AI into existing business processes is more complex than simply deploying new technology. It requires organizational change, process redesign, and cultural adaptation alongside technical implementation.</p>
            
            <h2>Phase 1: Assessment and Planning</h2>
            <p>Start by mapping your current processes and identifying areas where AI can provide significant value.</p>
            
            <h2>Phase 2: Pilot Project</h2>
            <p>Don't attempt to transform your entire organization at once. Choose a pilot project that is important enough to matter but not mission-critical.</p>
        `
    },
    'automating-business-processes': {
        category: 'Innovation',
        date: 'Oct 2025',
        readTime: '7 min read',
        title: 'Automating Business Processes with AI',
        excerpt: 'Discover how intelligent automation is transforming traditional business processes. From document processing to customer service, AI is enabling unprecedented efficiency gains across industries.',
        content: `
            <h2>The Automation Revolution</h2>
            <p>Business process automation is entering a new era. While traditional automation handled structured, rule-based tasks, AI-powered automation can now handle complex, judgment-based processes that previously required human intelligence.</p>
            
            <h2>Key Areas for AI Automation</h2>
            <p>Document processing, customer service, and data analysis are seeing the most dramatic improvements from AI automation.</p>
        `
    },
    'reducing-search-time-90': {
        category: 'Case Study',
        date: 'Oct 2025',
        readTime: '5 min read',
        title: 'Reducing Search Time by 90% with AI Assistants',
        excerpt: 'A real-world case study showing how our Local LLM Assistant helped a Fortune 500 company dramatically reduce information retrieval time while maintaining complete data privacy and security.',
        content: `
            <h2>The Challenge</h2>
            <p>A Fortune 500 financial services company was struggling with a critical productivity problem: employees were spending an average of 12 hours per week searching for information across various systems, documents, and databases.</p>
            
            <h2>The Solution</h2>
            <p>We implemented our Local LLM Assistant with several key capabilities including universal content integration and intelligent search and retrieval.</p>
            
            <h2>Results</h2>
            <p>90% reduction in search time, from 12 hours/week to 1.2 hours/week per employee, saving $13.5 million annually in recovered productivity.</p>
        `
    },
    '2026-ai-trends': {
        category: 'Trends',
        date: 'Sep 2025',
        readTime: '9 min read',
        title: '2026 AI Trends Every Business Leader Should Know',
        excerpt: 'Stay ahead of the curve with our analysis of emerging AI trends for 2026. From multimodal AI to edge computing, understand what\'s coming and how to prepare your organization.',
        content: `
            <h2>The AI Landscape in 2026</h2>
            <p>As we approach 2026, artificial intelligence continues to evolve at a remarkable pace. Understanding emerging trends is essential for business leaders who want to maintain competitive advantage and capitalize on new opportunities.</p>
            
            <h2>1. Multimodal AI Systems</h2>
            <p>Multimodal AI can process and understand multiple types of input simultaneously—text, images, audio, video, and sensor data—rather than focusing on a single modality.</p>
            
            <h2>2. Edge AI</h2>
            <p>Processing AI workloads on devices at the "edge" of the network addresses critical limitations of cloud-based AI including latency, privacy, and cost.</p>
            
            <h2>Preparing Your Organization</h2>
            <p>Develop a 3-year AI roadmap aligned with business goals and assess current capabilities and gaps.</p>
        `
    }
};

// Show article function (global - defined early)
window.showArticle = function(articleId) {
    const article = window.blogArticles[articleId];
    if (!article) {
        console.log('Article not found:', articleId);
        return;
    }
    
    console.log('Showing article:', articleId);
    
    const articleView = document.getElementById('blogArticleView');
    const articleContent = document.getElementById('articleContent');
    const blogSection = document.querySelector('[data-section="3"]');
    
    if (!articleView || !articleContent) {
        console.log('Article view elements not found');
        return;
    }
    
    // Build article HTML
    const articleHTML = `
        <div class="article-header">
            <div class="article-meta">
                <span class="article-category">${article.category}</span>
                <span class="article-date">${article.date}</span>
                <span class="article-read-time">⏱️ ${article.readTime}</span>
            </div>
            <h1 class="article-title">${article.title}</h1>
            <p class="article-excerpt">${article.excerpt}</p>
        </div>
        <div class="article-body">
            ${article.content}
        </div>
    `;
    
    articleContent.innerHTML = articleHTML;
    
    // Hide blog section, show article view
    if (blogSection) blogSection.style.display = 'none';
    articleView.style.display = 'block';
    
    // Scroll to top
    articleView.scrollTop = 0;
    
    // Update URL
    const newURL = `/blog/${articleId}`;
    if (window.location.pathname !== newURL) {
        history.pushState({ article: articleId }, '', newURL);
    }
    
    console.log('Article displayed:', articleId);
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check URL first to set initial target section
    checkInitialURL();
    
    detectMobileDevice();
    initializeIntroSequence();
    initializeNavigation();
    initializeEmailJS();
    initializeContactForm();
    initializeFloatingNavigation();
    initializeMobileOptimizations();
    initializeBrowserNavigation();
    initializeFAQ();
    initializeBlogCTA();
    initializeBlogArticles();
    
    // Initialize comprehensive responsive design system
    initializeResponsiveDesign();
    adjustResponsiveLayout();
    
    // Optimize image when it loads
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.addEventListener('load', function() {
            if (isMobileDevice) {
                setTimeout(() => {
                    optimizeImageForScreenSize();
                }, 100);
            }
        });
        
        // Also optimize if image is already loaded
        if (heroImage.complete) {
            setTimeout(() => {
                if (isMobileDevice) {
                    optimizeImageForScreenSize();
                }
            }, 100);
        }
    }
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

// Handle window resize and orientation change
window.addEventListener('resize', function() {
    detectMobileDevice();
    // Add debouncing for better performance
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        optimizeImageForScreenSize();
        // Update responsive design system
        initializeResponsiveDesign();
        adjustResponsiveLayout();
    }, 250);
});

// Handle orientation change specifically for mobile
window.addEventListener('orientationchange', function() {
    // Wait for orientation change to complete
    setTimeout(() => {
        detectMobileDevice();
        optimizeImageForScreenSize();
        
        // Update responsive design system
        initializeResponsiveDesign();
        adjustResponsiveLayout();
        
        // Additional optimization for orientation change
        if (isMobileDevice) {
            const heroImage = document.querySelector('.hero-image');
            const heroImageContainer = document.querySelector('.hero-image-container');
            
            if (heroImage && heroImageContainer) {
                // Force reflow and reoptimization
                heroImage.style.display = 'none';
                heroImage.offsetHeight; // Force reflow
                heroImage.style.display = '';
                
                setTimeout(() => {
                    optimizeImageForScreenSize();
                }, 50);
            }
        }
    }, 100);
});

// Intro Sequence
function initializeIntroSequence() {
    const introSequence = document.getElementById('introSequence');
    const mainContent = document.getElementById('mainContent');
    
    // Skip intro if accessing /about or /contact directly
    const skipIntro = initialTargetSection !== 0;
    
    if (skipIntro) {
        console.log('Skipping intro, direct access to section:', initialTargetSection);
        
        // Hide intro immediately
        introSequence.style.display = 'none';
        mainContent.classList.add('show');
        loadingComplete = true;
        
        // Set current section
        currentSection = initialTargetSection;
        
        // Pre-position the horizontal wrapper
        const wrapper = document.getElementById('horizontalWrapper');
        if (wrapper && !isMobileDevice) {
            const translateX = -initialTargetSection * 100;
            wrapper.style.transform = `translateX(${translateX}vw)`;
            wrapper.style.transition = 'none';
        }
        
        // Update navigation immediately
        setTimeout(() => {
            // Update nav items
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach((item, index) => {
                item.classList.toggle('active', index === initialTargetSection);
            });
            
            // Update mobile indicators
            const indicators = document.querySelectorAll('.nav-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === initialTargetSection);
            });
            
            // Check if should show an article (for /blog/article-name URLs)
            const pathname = window.location.pathname;
            if (pathname.startsWith('/blog/')) {
                const articleId = pathname.substring(6); // Remove '/blog/'
                if (articleId && window.blogArticles && window.blogArticles[articleId]) {
                    console.log('Direct article access detected:', articleId);
                    // Wait longer to ensure all DOM elements are ready
                    setTimeout(() => {
                        console.log('Attempting to show article:', articleId);
                        if (typeof window.showArticle === 'function') {
                            window.showArticle(articleId);
                        } else {
                            console.error('showArticle function not available');
                        }
                    }, 500);
                }
            }
            
            // For mobile, scroll to the correct section
            if (isMobileDevice) {
                const sections = document.querySelectorAll('.h-section');
                const mainContent = document.querySelector('.main-content');
                
                if (sections[initialTargetSection] && mainContent) {
                    const targetSection = sections[initialTargetSection];
                    const offsetTop = targetSection.offsetTop;
                    const scrollOffset = offsetTop - 20;
                    
                    mainContent.scrollTo({
                        top: Math.max(0, scrollOffset),
                        behavior: 'auto'
                    });
                }
            }
        }, 10);
        
        return; // Exit early, no intro animation
    }
    
    // Normal intro sequence for home page
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
    
    // Function to update URL based on section
    function updateURLForSection(sectionIndex) {
        let url = '/';
        switch(sectionIndex) {
            case 0:
                url = '/';
                break;
            case 1:
                url = '/about';
                break;
            case 2:
                url = '/contact';
                break;
            case 3:
                url = '/blog';
                break;
            case 4:
                url = '/faq';
                break;
        }
        
        // Update URL without reloading the page
        // Only push state if URL is different
        const currentPath = window.location.pathname;
        
        // Don't change URL if already at the target path (maintain SEO-friendly URLs)
        if (currentPath === url) {
            console.log('URL already correct, maintaining:', url);
            return;
        }
        
        // Special case: maintain SEO-friendly URLs
        if ((currentPath === '/about' && sectionIndex === 1) || 
            (currentPath === '/contact' && sectionIndex === 2) ||
            (currentPath === '/blog' && sectionIndex === 3) ||
            (currentPath === '/faq' && sectionIndex === 4)) {
            console.log('Maintaining current URL for SEO:', currentPath);
            return;
        }
        
        console.log('Updating URL from', currentPath, 'to', url);
        history.pushState({ section: sectionIndex }, '', url);
    }
    
    // Wheel scroll navigation (only for desktop) - improved with scroll threshold
    let wheelTimeout;
    let wheelDelta = 0;
    const wheelThreshold = 50; // Reduced threshold for more responsive navigation
    
    document.addEventListener('wheel', function(e) {
        // Don't navigate if article is open
        const articleView = document.getElementById('blogArticleView');
        if (articleView && articleView.style.display === 'block') return;
        
        if (isTransitioning || !loadingComplete || isMobileDevice) return;
        
        // Get current section element
        const currentSectionElement = document.querySelector(`.h-section[data-section="${currentSection}"]`);
        if (currentSectionElement) {
            const hasOverflow = currentSectionElement.scrollHeight > currentSectionElement.clientHeight;
            const isAtTop = currentSectionElement.scrollTop <= 1; // Small tolerance for floating point precision
            const isAtBottom = currentSectionElement.scrollTop + currentSectionElement.clientHeight >= currentSectionElement.scrollHeight - 5; // Small tolerance
            
            // Debug info for scroll navigation
            if (e.deltaY < 0 && currentSection > 0) {
                console.log('Scroll up detected:', {
                    currentSection,
                    hasOverflow,
                    isAtTop,
                    scrollTop: currentSectionElement.scrollTop,
                    scrollHeight: currentSectionElement.scrollHeight,
                    clientHeight: currentSectionElement.clientHeight
                });
            }
            
            // Handle scroll within section vs section navigation
            if (hasOverflow) {
                // If scrolling down and not at bottom, allow normal scroll
                if (e.deltaY > 0 && !isAtBottom) {
                    return; // Allow normal scrolling down within the section
                }
                // If scrolling up and not at top, allow normal scroll
                if (e.deltaY < 0 && !isAtTop) {
                    return; // Allow normal scrolling up within the section
                }
            }
            
            // At this point, we're either at the boundary of the section or there's no overflow
            // So we should handle section navigation
            
            // Prevent default to handle section navigation
            e.preventDefault();
            
            // Accumulate wheel delta to prevent accidental navigation
            wheelDelta += e.deltaY;
            
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (Math.abs(wheelDelta) >= wheelThreshold) {
                    // Navigate to next section (scroll down)
                    if (wheelDelta > 0 && currentSection < totalSections - 1) {
                        navigateToSection(currentSection + 1);
                    }
                    // Navigate to previous section (scroll up)
                    else if (wheelDelta < 0 && currentSection > 0) {
                        navigateToSection(currentSection - 1);
                    }
                }
                wheelDelta = 0;
            }, 50);
        } else {
            // Fallback: if no current section found, prevent default and handle navigation
            e.preventDefault();
            wheelDelta += e.deltaY;
            
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (Math.abs(wheelDelta) >= wheelThreshold) {
                    if (wheelDelta > 0 && currentSection < totalSections - 1) {
                        navigateToSection(currentSection + 1);
                    } else if (wheelDelta < 0 && currentSection > 0) {
                        navigateToSection(currentSection - 1);
                    }
                }
                wheelDelta = 0;
            }, 50);
        }
    }, { passive: false });
    
    // Touch navigation
    let touchStartX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        // Don't navigate if article is open
        const articleView = document.getElementById('blogArticleView');
        if (articleView && articleView.style.display === 'block') return;
        
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
        // Don't navigate if article is open
        const articleView = document.getElementById('blogArticleView');
        if (articleView && articleView.style.display === 'block') return;
        
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
        const previousSection = currentSection;
        currentSection = sectionIndex;
        
        // Update URL
        updateURLForSection(sectionIndex);
        
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
            // Desktop: Smooth horizontal transition with better performance
            const translateX = -sectionIndex * 100;
            
            // Reset any section scroll positions to prevent "drop" effect
            const sections = document.querySelectorAll('.h-section');
            sections.forEach((section, index) => {
                if (index !== sectionIndex) {
                    // Smoothly reset scroll position to prevent jarring jumps
                    if (section.scrollTop > 0) {
                        section.style.scrollBehavior = 'auto';
                        section.scrollTop = 0;
                        // Restore smooth scrolling after reset
                        setTimeout(() => {
                            section.style.scrollBehavior = 'smooth';
                        }, 50);
                    }
                }
            });
            
            // Apply transform with improved transition
            wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            wrapper.style.transform = `translateX(${translateX}vw)`;
            
            // Ensure transform is applied
            wrapper.offsetHeight; // Force reflow
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
        
        // Reset transition flag with proper timing
        setTimeout(() => {
            isTransitioning = false;
            
            // Clear transition property to allow normal scrolling within sections
            if (!isMobileDevice) {
                wrapper.style.transition = '';
            }
        }, 850);
    }
    
    // Unified navigation function
    function goToSection(sectionIndex) {
        console.log('goToSection called:', sectionIndex, 'isMobileDevice:', isMobileDevice);
        
        if (isMobileDevice) {
            // Update URL for mobile
            updateURLForSection(sectionIndex);
            
            // On mobile, scroll to the section smoothly
            currentSection = sectionIndex;
            
            // Update navigation indicators
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach((item, index) => {
                item.classList.toggle('active', index === sectionIndex);
            });
            
            // Scroll to section on mobile
            scrollToSectionMobile(sectionIndex);
        } else {
            // For desktop, navigateToSection will handle URL update
            navigateToSection(sectionIndex);
        }
    }
    
    // Function to scroll to sections on mobile
    function scrollToSectionMobile(sectionIndex) {
        const sections = document.querySelectorAll('.h-section');
        const mainContent = document.querySelector('.main-content');
        
        if (sections[sectionIndex] && mainContent) {
            const targetSection = sections[sectionIndex];
            const offsetTop = targetSection.offsetTop;
            
            console.log('Scrolling to section', sectionIndex, 'offsetTop:', offsetTop);
            
            // Smooth scroll to section with offset for better positioning
            const scrollOffset = offsetTop - 20; // Small offset for better view
            
            mainContent.scrollTo({
                top: Math.max(0, scrollOffset),
                behavior: 'smooth'
            });
        }
    }
    
    // Expose navigate functions globally
    window.navigateToSection = navigateToSection;
    window.goToSection = goToSection;
    window.updateURLForSection = updateURLForSection;
}

// Check initial URL and navigate to correct section
function checkInitialURL() {
    const pathname = window.location.pathname;
    
    console.log('Checking initial URL:', pathname);
    
    // Determine target section based on URL
    if (pathname === '/about' || pathname === '/about.html') {
        initialTargetSection = 1;
    } else if (pathname === '/contact' || pathname === '/contact.html') {
        initialTargetSection = 2;
    } else if (pathname === '/blog' || pathname === '/blog.html' || pathname.startsWith('/blog/')) {
        initialTargetSection = 3;
        // Note: Article will be shown by checkForArticleInURL() after intro
    } else if (pathname === '/faq' || pathname === '/faq.html') {
        initialTargetSection = 4;
    } else {
        initialTargetSection = 0; // Home
    }
    
    console.log('Initial target section set to:', initialTargetSection);
}

// Browser Navigation (Back/Forward buttons)
function initializeBrowserNavigation() {
    // Set initial state if not set
    if (!history.state) {
        const pathname = window.location.pathname;
        let section = 0;
        if (pathname === '/about' || pathname === '/about.html') {
            section = 1;
        } else if (pathname === '/contact' || pathname === '/contact.html') {
            section = 2;
        }
        history.replaceState({ section: section }, '', pathname);
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        console.log('Popstate event triggered:', event.state, window.location.pathname);
        
        // Determine which section to navigate to based on URL
        let targetSection = 0;
        const pathname = window.location.pathname;
        
        if (pathname === '/' || pathname === '/index.html') {
            targetSection = 0;
        } else if (pathname === '/about' || pathname === '/about.html') {
            targetSection = 1;
        } else if (pathname === '/contact' || pathname === '/contact.html') {
            targetSection = 2;
        } else if (pathname === '/blog' || pathname === '/blog.html') {
            targetSection = 3;
        } else if (pathname === '/faq' || pathname === '/faq.html') {
            targetSection = 4;
        }
        
        console.log('Navigating to section:', targetSection, 'from URL:', pathname);
        
        // Navigate to the section without adding to history
        if (event.state && event.state.section !== undefined) {
            targetSection = event.state.section;
        }
        
        // Navigate directly without updating URL again
        navigateToSectionWithoutHistory(targetSection);
    });
    
    // Function to navigate without updating history (for popstate)
    function navigateToSectionWithoutHistory(sectionIndex) {
        console.log('navigateToSectionWithoutHistory called:', sectionIndex);
        
        if (sectionIndex === currentSection) {
            console.log('Already at section', sectionIndex);
            return;
        }
        
        currentSection = sectionIndex;
        
        if (isMobileDevice) {
            // Mobile navigation
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach((item, index) => {
                item.classList.toggle('active', index === sectionIndex);
            });
            
            const sections = document.querySelectorAll('.h-section');
            const mainContent = document.querySelector('.main-content');
            
            if (sections[sectionIndex] && mainContent) {
                const targetSection = sections[sectionIndex];
                const offsetTop = targetSection.offsetTop;
                const scrollOffset = offsetTop - 20;
                
                mainContent.scrollTo({
                    top: Math.max(0, scrollOffset),
                    behavior: 'smooth'
                });
            }
        } else {
            // Desktop navigation
            const wrapper = document.getElementById('horizontalWrapper');
            const navItems = document.querySelectorAll('.nav-item');
            
            if (wrapper) {
                const translateX = -sectionIndex * 100;
                wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                wrapper.style.transform = `translateX(${translateX}vw)`;
                
                setTimeout(() => {
                    wrapper.style.transition = '';
                }, 850);
            }
            
            // Update navigation
            navItems.forEach((item, index) => {
                item.classList.toggle('active', index === sectionIndex);
            });
        }
        
        // Update mobile indicators
        const indicators = document.querySelectorAll('.nav-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === sectionIndex);
        });
    }
    
    // Expose function globally
    window.navigateToSectionWithoutHistory = navigateToSectionWithoutHistory;
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
            let sectionIndex = 0;
            
            switch(targetSection) {
                case 'home':
                    sectionIndex = 0;
                    break;
                case 'about':
                    sectionIndex = 1;
                    break;
                case 'contact':
                    sectionIndex = 2;
                    break;
            }
            
            // Use goToSection which handles URL updates
            goToSection(sectionIndex);
            
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
    
    // Remove section-based navigation for mobile - just use natural scroll
    removeMobileSectionNavigation();
    
    // Hide floating navigation elements on mobile
    hideFloatingNavigationOnMobile();
    
    // Add mobile-specific styles
    addMobileStyles();
    
    // Optimize image for current screen size
    optimizeImageForScreenSize();
    
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

// Remove section-based navigation for mobile
function removeMobileSectionNavigation() {
    // Remove mobile navigation indicators
    const mobileIndicators = document.querySelector('.mobile-nav-indicators');
    if (mobileIndicators) {
        mobileIndicators.style.display = 'none';
    }
    
    // Remove scroll-snap behavior
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.scrollSnapType = 'none';
        mainContent.style.scrollSnapStop = 'normal';
    }
    
    // Remove section scroll-snap
    const sections = document.querySelectorAll('.h-section');
    sections.forEach(section => {
        section.style.scrollSnapAlign = 'none';
        section.style.scrollSnapStop = 'normal';
    });
}

// Hide floating navigation elements on mobile
function hideFloatingNavigationOnMobile() {
    const floatingElements = document.querySelectorAll('.floating-nav');
    floatingElements.forEach(element => {
        element.style.display = 'none';
    });
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
        // Don't navigate if article is open
        const articleView = document.getElementById('blogArticleView');
        if (articleView && articleView.style.display === 'block') return;
        
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

// Mobile smooth scroll tracking - simplified for continuous scrolling
function initializeMobileScrollTracking() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
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
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
        
        if (isAtBottom) {
            document.body.classList.add('at-bottom');
            console.log('Added at-bottom class');
        } else {
            document.body.classList.remove('at-bottom');
        }
        
        // Update active navigation based on scroll position
        updateActiveNavigationFromScroll(scrollTop, clientHeight);
    }, { passive: true });
}

// Function to update active navigation based on visible content
function updateActiveNavigationFromScroll(scrollTop, clientHeight) {
    if (!isMobileDevice) {
        console.log('Not mobile device, returning');
        return;
    }
    
    const navItems = document.querySelectorAll('.nav-item');
    console.log('Found nav items:', navItems.length);
    
    // Check what content is visible in the viewport
    const heroImage = document.querySelector('.hero-image');
    const sectionHeader = document.querySelector('.section-header');
    const contactForm = document.querySelector('.contact-form');
    
    console.log('Elements found:', {
        heroImage: !!heroImage,
        sectionHeader: !!sectionHeader,
        contactForm: !!contactForm
    });
    
    let activeSection = 0;
    
    if (heroImage) {
        const imageRect = heroImage.getBoundingClientRect();
        console.log('Image rect:', imageRect);
        // If image is visible (not scrolled past it)
        if (imageRect.bottom > 0 && imageRect.top < clientHeight) {
            activeSection = 0; // Home - when image_main is visible
            console.log('Home section active - image visible');
        }
    }
    
    if (sectionHeader && activeSection === 0) {
        const headerRect = sectionHeader.getBoundingClientRect();
        console.log('Header rect:', headerRect);
        // If we've scrolled past the image and see the section header
        if (headerRect.top < clientHeight * 0.5) {
            activeSection = 1; // About - when LLM/Consultancy is visible
            console.log('About section active - header visible');
        }
    }
    
    if (contactForm && activeSection !== 0) {
        const formRect = contactForm.getBoundingClientRect();
        console.log('Form rect:', formRect);
        // If we're near the contact form
        if (formRect.top < clientHeight * 0.7) {
            activeSection = 2; // Contact - when email/connect/touch is visible
            console.log('Contact section active - form visible');
        }
    }
    
    console.log('Final active section:', activeSection);
    
    // Update navigation items
    navItems.forEach((item, index) => {
        const wasActive = item.classList.contains('active');
        if (index === activeSection) {
            item.classList.add('active');
            if (!wasActive) console.log(`Activated nav item ${index}: ${item.textContent}`);
        } else {
            item.classList.remove('active');
            if (wasActive) console.log(`Deactivated nav item ${index}: ${item.textContent}`);
        }
    });
}

// Image optimization function for mobile devices
function optimizeImageForScreenSize() {
    if (!isMobileDevice) return;
    
    const heroImage = document.querySelector('.hero-image');
    const heroImageContainer = document.querySelector('.hero-image-container');
    
    if (!heroImage || !heroImageContainer) return;
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isLandscape = screenWidth > screenHeight;
    
    console.log('Optimizing image for screen:', {
        width: screenWidth,
        height: screenHeight,
        isLandscape: isLandscape,
        orientation: screenWidth > screenHeight ? 'landscape' : 'portrait'
    });
    
    // Apply dynamic sizing based on screen dimensions
    if (screenWidth <= 320) {
        // Extremely small screens
        heroImage.style.maxHeight = '20vh';
        heroImageContainer.style.minHeight = '160px';
        heroImageContainer.style.padding = '0 0.125rem';
    } else if (screenWidth <= 360) {
        // Very small screens
        heroImage.style.maxHeight = '25vh';
        heroImageContainer.style.minHeight = '180px';
        heroImageContainer.style.padding = '0 0.25rem';
    } else if (screenWidth <= 480) {
        // Small screens
        heroImage.style.maxHeight = '30vh';
        heroImageContainer.style.minHeight = '200px';
        heroImageContainer.style.padding = '0 0.5rem';
    } else if (screenWidth <= 768) {
        // Medium screens
        heroImage.style.maxHeight = '35vh';
        heroImageContainer.style.minHeight = '250px';
        heroImageContainer.style.padding = '0 1rem';
    }
    
    // Handle landscape orientation for short screens
    if (isLandscape && screenHeight <= 500) {
        heroImage.style.maxHeight = '35vh';
        heroImageContainer.style.minHeight = '200px';
        heroImageContainer.style.padding = '0 1rem';
    } else if (isLandscape && screenHeight <= 400) {
        heroImage.style.maxHeight = '30vh';
        heroImageContainer.style.minHeight = '150px';
        heroImageContainer.style.padding = '0 0.5rem';
    }
    
    // Ensure image is fully visible
    heroImage.style.objectFit = 'contain';
    heroImage.style.objectPosition = 'center';
    heroImage.style.width = '100%';
    heroImage.style.height = 'auto';
    
    console.log('Image optimization applied:', {
        maxHeight: heroImage.style.maxHeight,
        minHeight: heroImageContainer.style.minHeight,
        padding: heroImageContainer.style.padding
    });
}

// Comprehensive responsive design system
function initializeResponsiveDesign() {
    // Only initialize responsive design on mobile devices
    if (!isMobileDevice) return;
    
    const body = document.body;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const aspectRatio = screenWidth / screenHeight;
    
    // Remove all existing responsive classes
    body.classList.remove(
        'screen-xs', 'screen-sm', 'screen-md', 'screen-lg', 'screen-xl', 'screen-2xl', 'screen-3xl',
        'orientation-portrait', 'orientation-landscape',
        'aspect-square', 'aspect-wide', 'aspect-ultra-wide', 'aspect-tall'
    );
    
    // Add screen size classes for mobile
    if (screenWidth <= 319) {
        body.classList.add('screen-xs');
    } else if (screenWidth <= 479) {
        body.classList.add('screen-sm');
    } else if (screenWidth <= 767) {
        body.classList.add('screen-md');
    }
    
    // Add orientation classes
    if (screenWidth > screenHeight) {
        body.classList.add('orientation-landscape');
    } else {
        body.classList.add('orientation-portrait');
    }
    
    // Add aspect ratio classes
    if (aspectRatio >= 0.8 && aspectRatio <= 1.2) {
        body.classList.add('aspect-square');
    } else if (aspectRatio <= 0.6) {
        body.classList.add('aspect-tall');
    } else if (aspectRatio > 1.2) {
        body.classList.add('aspect-wide');
    }
    
    // Apply responsive classes to elements
    applyResponsiveClasses();
    
    console.log('Mobile responsive design initialized:', {
        width: screenWidth,
        height: screenHeight,
        aspectRatio: aspectRatio.toFixed(2),
        classes: Array.from(body.classList).filter(cls => cls.startsWith('screen-') || cls.startsWith('orientation-') || cls.startsWith('aspect-'))
    });
}

// Apply responsive classes to specific elements
function applyResponsiveClasses() {
    // Only apply responsive classes on mobile devices
    if (isMobileDevice) {
        // Hero section
        const heroSection = document.querySelector('.h-section[data-section="0"]');
        if (heroSection) {
            heroSection.classList.add('section-responsive');
        }
        
        // About section
        const aboutSection = document.querySelector('.h-section[data-section="1"]');
        if (aboutSection) {
            aboutSection.classList.add('section-responsive');
        }
        
        // Contact section
        const contactSection = document.querySelector('.h-section[data-section="2"]');
        if (contactSection) {
            contactSection.classList.add('section-responsive');
        }
        
        // Navigation
        const bottomNav = document.querySelector('.bottom-nav');
        if (bottomNav) {
            bottomNav.classList.add('bottom-nav-responsive');
        }
        
        // Hero content
        const homeContent = document.querySelector('.home-content');
        if (homeContent) {
            homeContent.classList.add('content-spacing-responsive');
        }
        
        // Hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.classList.add('text-scale-responsive-5xl');
        }
        
        // Hero description
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
            heroDescription.classList.add('text-scale-responsive-lg');
        }
        
        // Hero actions
        const heroActions = document.querySelector('.hero-actions');
        if (heroActions) {
            heroActions.classList.add('flex-responsive');
        }
        
        // Buttons
        const primaryButtons = document.querySelectorAll('.btn-primary');
        const secondaryButtons = document.querySelectorAll('.btn-secondary');
        
        primaryButtons.forEach(btn => {
            btn.classList.add('btn-scale-responsive-lg');
        });
        
        secondaryButtons.forEach(btn => {
            btn.classList.add('btn-scale-responsive-lg');
        });
        
        // Solution cards
        const solutionCards = document.querySelectorAll('.solution-card');
        solutionCards.forEach(card => {
            card.classList.add('solution-card-responsive');
        });
        
        // Solutions grid
        const solutionsGrid = document.querySelector('.solutions-grid');
        if (solutionsGrid) {
            solutionsGrid.classList.add('solutions-grid-responsive');
        }
        
        // Contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.classList.add('contact-form-responsive');
        }
        
        // Contact grid
        const contactGrid = document.querySelector('.contact-grid');
        if (contactGrid) {
            contactGrid.classList.add('contact-grid-responsive');
        }
        
        // Section headers
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            header.classList.add('content-spacing-responsive');
        });
        
        // Section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            title.classList.add('text-scale-responsive-4xl');
        });
        
        // Section subtitles
        const sectionSubtitles = document.querySelectorAll('.section-subtitle');
        sectionSubtitles.forEach(subtitle => {
            subtitle.classList.add('text-scale-responsive-lg');
        });
    }
}

// Dynamic responsive adjustments
function adjustResponsiveLayout() {
    // Only adjust layout on mobile devices
    if (!isMobileDevice) return;
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Adjust container max-width dynamically for mobile only
    const root = document.documentElement;
    let containerMaxWidth = '100%';
    let containerPadding = '1rem';
    
    if (screenWidth >= 768) {
        containerPadding = '1.5rem';
    } else if (screenWidth >= 480) {
        containerPadding = '1.25rem';
    } else if (screenWidth >= 360) {
        containerPadding = '1rem';
    } else if (screenWidth >= 320) {
        containerPadding = '0.75rem';
    } else {
        containerPadding = '0.5rem';
    }
    
    root.style.setProperty('--container-max-width', containerMaxWidth);
    root.style.setProperty('--container-padding', containerPadding);
    
    // Adjust navigation height for mobile
    let navHeight = '65px';
    if (screenWidth <= 480) {
        navHeight = screenWidth <= 360 ? (screenWidth <= 320 ? '50px' : '55px') : '60px';
    }
    
    root.style.setProperty('--nav-height', navHeight);
    
    console.log('Mobile responsive layout adjusted:', {
        containerMaxWidth,
        containerPadding,
        navHeight,
        screenWidth,
        screenHeight
    });
}

// FAQ Accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle current item
            const isActive = item.classList.contains('active');
            
            // Optionally close other items (accordion behavior)
            // Comment out these lines if you want multiple items open at once
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
    
    console.log('FAQ accordion initialized');
}

// Blog CTA functionality
function initializeBlogCTA() {
    // Blog section CTA button
    const blogCtaButton = document.querySelector('.blog-cta .btn-primary');
    if (blogCtaButton) {
        blogCtaButton.addEventListener('click', function(e) {
            e.preventDefault();
            goToSection(2); // Navigate to Contact section
        });
    }
    
    // FAQ section CTA button
    const faqCtaButton = document.querySelector('.faq-cta .btn-primary');
    if (faqCtaButton) {
        faqCtaButton.addEventListener('click', function(e) {
            e.preventDefault();
            goToSection(2); // Navigate to Contact section
        });
    }
    
    console.log('Blog and FAQ CTAs initialized');
}

// Initialize blog article system
function initializeBlogArticles() {
    const blogCards = document.querySelectorAll('.blog-card');
    const articleView = document.getElementById('blogArticleView');
    const articleContent = document.getElementById('articleContent');
    const backBtn = document.getElementById('articleBackBtn');
    const articleCtaBtn = document.querySelector('.article-cta-btn');
    
    if (!articleView || !articleContent || !backBtn) return;
    
    // Make blog cards clickable
    blogCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article');
            if (articleId && typeof window.showArticle === 'function') {
                window.showArticle(articleId);
            }
        });
    });
    
    // Back button functionality
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        hideArticle();
    });
    
    // Article CTA button
    if (articleCtaBtn) {
        articleCtaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideArticle();
            goToSection(2); // Go to Contact section
        });
    }
    
    console.log('Blog articles system initialized');
}

// Hide article function
function hideArticle() {
    const articleView = document.getElementById('blogArticleView');
    const blogSection = document.querySelector('[data-section="3"]');
    
    // Show blog section, hide article view
    if (blogSection) blogSection.style.display = 'block';
    if (articleView) articleView.style.display = 'none';
    
    // Update URL back to /blog
    if (window.location.pathname.startsWith('/blog/')) {
        history.pushState({}, '', '/blog');
    }
    
    // Navigate back to blog section
    const currentURL = window.location.pathname;
    if (currentURL === '/blog' || currentURL.startsWith('/blog/')) {
        // Force navigation to blog section
        navigateToSection(3);
    }
}

// Check for article in URL (called from initializeBlogArticles, not needed separately)
function checkForArticleInURL() {
    const path = window.location.pathname;
    if (path.startsWith('/blog/')) {
        const articleId = path.substring(6); // Remove '/blog/'
        if (window.blogArticles && window.blogArticles[articleId]) {
            // Navigate to blog section first, then show article
            currentSection = 3;
            goToSection(3);
            setTimeout(() => {
                if (typeof window.showArticle === 'function') {
                    window.showArticle(articleId);
                }
            }, 100);
        }
    }
}

// Handle browser back/forward for articles (only attach once)
(function() {
    let popstateHandlerAttached = false;
    if (!popstateHandlerAttached) {
        window.addEventListener('popstate', function(e) {
            const path = window.location.pathname;
            if (path.startsWith('/blog/')) {
                const articleId = path.substring(6);
                if (window.blogArticles && window.blogArticles[articleId]) {
                    if (typeof window.showArticle === 'function') {
                        window.showArticle(articleId);
                    }
                }
            } else if (path === '/blog') {
                if (typeof hideArticle === 'function') {
                    hideArticle();
                }
            }
        });
        popstateHandlerAttached = true;
    }
})();

// Console branding
console.log('%c🚀 KWForce Enterprise AI Solutions', 'color: #F0841D; font-size: 20px; font-weight: bold;');
console.log('%c⚡ Professional horizontal experience loaded', 'color: #059669; font-size: 14px; font-weight: 600;');
console.log('%c✨ Hidden floating navigation activated', 'color: #F0841D; font-size: 12px; font-style: italic;');
console.log('%c📧 EmailJS contact system ready (with mailto fallback)', 'color: #6366f1; font-size: 12px; font-style: italic;');
console.log('%c📱 Mobile image optimization system activated', 'color: #F0841D; font-size: 12px; font-style: italic;');
console.log('%c🎯 Mobile-responsive design system activated', 'color: #8B5CF6; font-size: 12px; font-style: italic;');
console.log('%c🌐 Desktop layout preserved, mobile optimized', 'color: #10B981; font-size: 12px; font-style: italic;');
console.log('%c📰 Blog and FAQ sections loaded', 'color: #F0841D; font-size: 12px; font-style: italic;');