// Student Robotics Portfolio JavaScript - maker vibes and interactions ✨
// mobile-first, bouncy, and satisfying af for student makers

class StudentMakerPortfolio {
    constructor() {
        this.isTouch = 'ontouchstart' in window;
        this.scrollThreshold = 50;
        this.lastScrollY = 0;
        this.ticking = false;
        this.makerEmojis = ['🤖', '⚡', '🔧', '💻', '⚙️', '🛠️', '🔌', '📟', '🎯', '✨'];
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        // Core student maker functionality
        this.initSmoothScroll();
        this.initScrollAnimations();
        this.initBouncyInteractions();
        this.initFloatingEmojis();
        this.initNavigationBehavior();
        this.initProjectCardHovers();
        this.initContactInteractions();
        this.initSkillsInteractions();
        this.initPerformanceOptimizations();
        this.initMakerEasterEggs();
        
        // Mobile-specific enhancements
        if (this.isTouch) {
            this.initTouchFeedback();
            this.initHapticFeedback();
        }
        
        // Add loading animation
        this.initLoadingAnimation();
        
        console.log('student maker portfolio loaded - ready to build! 🤖✨');
    }

    // Fixed smooth scroll with maker bounce - CORRECTED VERSION
    initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.nav')?.offsetHeight || 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;
                    
                    // Use easeInOutCubic for smooth maker-style scrolling
                    this.smoothScrollTo(offsetPosition, 1000);
                }
            });
        });
    }

    // Enhanced smooth scroll with cubic easing
    smoothScrollTo(targetY, duration) {
        const startY = window.pageYOffset;
        const difference = targetY - startY;
        const startTime = performance.now();
        
        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startY + difference * ease);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    }

    // Scroll animations with student maker personality
    initScrollAnimations() {
        const sections = document.querySelectorAll(
            '.about, .projects, .contact, .project-section, .hero-content > *, .about-content > *, .skills-container > *'
        );
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation delay for maker-style reveal
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                        
                        // Special handling for project cards
                        if (entry.target.classList.contains('projects')) {
                            this.animateProjectCards(entry.target);
                        }
                        
                        // Special handling for skills
                        if (entry.target.classList.contains('skills-container')) {
                            this.animateSkills(entry.target);
                        }
                    }, index * 100);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            section.classList.add('fade-up');
            observer.observe(section);
        });
    }

    // Animate project cards with maker flair
    animateProjectCards(projectsSection) {
        const cards = projectsSection.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('bounce-in');
            }, index * 150);
        });
    }

    // Animate skills with tech vibes
    animateSkills(skillsContainer) {
        const skillTags = skillsContainer.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.classList.add('skill-reveal');
            }, index * 50);
        });
    }

    // Bouncy interactions for student maker energy
    initBouncyInteractions() {
        const interactiveElements = document.querySelectorAll(
            '.hero-cta, .contact-btn, .nav-link, .skill-tag'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!this.isTouch) {
                    element.classList.add('bounce-hover');
                }
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('bounce-hover');
            });
            
            element.addEventListener('click', () => {
                element.classList.add('bounce-click');
                setTimeout(() => {
                    element.classList.remove('bounce-click');
                }, 150);
            });
        });
    }

    // Floating emojis for maker personality
    initFloatingEmojis() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        // Create floating emojis container if it doesn't exist
        let emojiContainer = heroSection.querySelector('.floating-emojis');
        if (!emojiContainer) {
            emojiContainer = document.createElement('div');
            emojiContainer.className = 'floating-emojis';
            heroSection.appendChild(emojiContainer);
        }
        
        // Add floating maker emojis
        this.makerEmojis.slice(0, 4).forEach((emoji, index) => {
            const emojiElement = document.createElement('span');
            emojiElement.className = 'floating-emoji';
            emojiElement.textContent = emoji;
            emojiElement.style.animationDelay = `${index * 2}s`;
            emojiContainer.appendChild(emojiElement);
        });
    }

    // Navigation behavior with smooth interactions
    initNavigationBehavior() {
        const nav = document.querySelector('.nav');
        if (!nav) return;
        
        let lastScrollY = window.pageYOffset;
        
        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;
            
            if (currentScrollY > 100) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
            
            lastScrollY = currentScrollY;
        };
        
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // Enhanced project card hover effects
    initProjectCardHovers() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!this.isTouch) {
                    card.classList.add('project-hover');
                    
                    // Add subtle parallax to tech tags
                    const techTags = card.querySelectorAll('.tech-tag');
                    techTags.forEach((tag, index) => {
                        tag.style.transform = `translateY(-${index * 2}px)`;
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('project-hover');
                
                // Reset tech tag positions
                const techTags = card.querySelectorAll('.tech-tag');
                techTags.forEach(tag => {
                    tag.style.transform = '';
                });
            });
        });
    }

    // Contact interactions with personality
    initContactInteractions() {
        const contactBtn = document.querySelector('.contact-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', (e) => {
                // Add satisfying click animation
                contactBtn.classList.add('btn-clicked');
                setTimeout(() => {
                    contactBtn.classList.remove('btn-clicked');
                }, 300);
            });
        }
    }

    // Skills interactions with tech vibes
    initSkillsInteractions() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('click', () => {
                // Toggle active state for fun interaction
                tag.classList.toggle('skill-active');
                
                // Remove active state after 2 seconds
                setTimeout(() => {
                    tag.classList.remove('skill-active');
                }, 2000);
            });
        });
    }

    // Performance optimizations
    initPerformanceOptimizations() {
        // Optimize images with lazy loading attributes
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
        
        // Add will-change for animated elements
        const animatedElements = document.querySelectorAll(
            '.floating-emoji, .project-card, .hero-cta'
        );
        
        animatedElements.forEach(element => {
            element.style.willChange = 'transform';
        });
    }

    // Easter eggs for curious visitors
    initMakerEasterEggs() {
        // Console message for developers
        console.log(`
🤖 hey fellow maker! 🔧
thanks for checking out the code
built with student energy and lots of ☕
feel free to reach out if you want to build something cool together!
`);
        
        // Konami code easter egg
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                this.activateSecretMode();
            }
        });
        
        // Click counter easter egg
        let clickCount = 0;
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.addEventListener('click', (e) => {
                clickCount++;
                if (clickCount >= 10) {
                    e.preventDefault();
                    this.showMakerSecret();
                    clickCount = 0;
                }
            });
        }
    }

    // Secret mode activation
    activateSecretMode() {
        document.body.classList.add('secret-mode');
        
        // Add rainbow gradient to headings
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach(heading => {
            heading.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24, #f0932b, #eb4d4b, #6c5ce7)';
            heading.style.backgroundSize = '400% 400%';
            heading.style.webkitBackgroundClip = 'text';
            heading.style.webkitTextFillColor = 'transparent';
            heading.style.animation = 'rainbow 3s ease infinite';
        });
        
        console.log('🌈 secret maker mode activated! 🚀');
        
        // Disable after 10 seconds
        setTimeout(() => {
            document.body.classList.remove('secret-mode');
            headings.forEach(heading => {
                heading.style.background = '';
                heading.style.backgroundSize = '';
                heading.style.webkitBackgroundClip = '';
                heading.style.webkitTextFillColor = '';
                heading.style.animation = '';
            });
        }, 10000);
    }

    // Show maker secret message
    showMakerSecret() {
        const message = document.createElement('div');
        message.className = 'maker-secret';
        message.innerHTML = `
            <div class="secret-content">
                <h3>🔧 maker secret unlocked! 🤖</h3>
                <p>you found the hidden message!</p>
                <p>thanks for being curious - that's the maker spirit!</p>
                <button onclick="this.parentElement.parentElement.remove()">close</button>
            </div>
        `;
        
        document.body.appendChild(message);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 5000);
    }

    // Touch feedback for mobile users
    initTouchFeedback() {
        const touchableElements = document.querySelectorAll(
            'a, button, .project-card, .skill-tag, .nav-link'
        );
        
        touchableElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-feedback');
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-feedback');
                }, 150);
            }, { passive: true });
        });
    }

    // Haptic feedback for supported devices
    initHapticFeedback() {
        if ('vibrate' in navigator) {
            const feedbackElements = document.querySelectorAll(
                '.hero-cta, .contact-btn, .project-card'
            );
            
            feedbackElements.forEach(element => {
                element.addEventListener('touchstart', () => {
                    navigator.vibrate(10); // Subtle haptic feedback
                }, { passive: true });
            });
        }
    }

    // Loading animation
    initLoadingAnimation() {
        // Add entrance animation to hero elements
        const heroElements = document.querySelectorAll('.hero-greeting, .hero-title, .hero-subtitle, .hero-cta');
        
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + index * 200);
        });
    }

    // Viewport height fix for mobile browsers
    updateViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
}



// Initialize the portfolio
const portfolio = new StudentMakerPortfolio();

// Handle viewport changes
window.addEventListener('resize', () => {
    portfolio.updateViewportHeight();
});

window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        portfolio.updateViewportHeight();
    }, 500);
});

// Initialize viewport height
portfolio.updateViewportHeight();



