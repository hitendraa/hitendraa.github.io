document.addEventListener('DOMContentLoaded', () => {
    // Remove any cursor-related elements and event listeners
    const elements = document.querySelectorAll('.cyber-cursor, .trail-dot');
    elements.forEach(el => el.remove());
    
    // Initialize elements
    const hireButton = document.querySelector('.hire-text');
    const modal = document.getElementById('hireModal');
    const modalClose = document.getElementById('modalClose');
    const options = document.querySelectorAll('.cyber-option');

    // Initial GSAP animations
    gsap.from('.cyber-nav', {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: 'power4.out'
    });

    gsap.from('.cyber-link', {
        duration: 0.5,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: 'back.out'
    });

    // Hero section animations
    const heroTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' }
    });

    heroTimeline
        .from('.hero-line', {
            scaleY: 0,
            scaleX: 0,
            duration: 1.5,
            stagger: 0.1
        })
        .from('.hero-stats', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.2
        }, '-=1')
        .from('.hero-meta', {
            opacity: 0,
            y: -20,
            duration: 0.5
        }, '-=0.5')
        .from('.hero-title .line', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power4.out'
        }, '-=0.3')
        .from('.hero-subtitle', {
            opacity: 0,
            y: 20,
            duration: 0.8
        }, '-=0.5')
        .from('.tech-tag', {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .from('.hero-cta > *', {
            opacity: 0,
            x: -20,
            duration: 0.5,
            stagger: 0.2
        }, '-=0.3')
        .from('.scroll-indicator', {
            opacity: 0,
            y: -20,
            duration: 0.5
        }, '-=0.2');

    // Add hover animations for tech tags
    gsap.utils.toArray('.tech-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            gsap.to(tag, {
                scale: 1.1,
                duration: 0.3,
                ease: 'back.out(2)'
            });
        });
        tag.addEventListener('mouseleave', () => {
            gsap.to(tag, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Disable parallax effect on hero content since background is removed
    // Instead add a subtle hover effect when mouse moves
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 10;
            const yPos = (clientY / window.innerHeight - 0.5) * 10;
            
            gsap.to(heroContent, {
                x: xPos,
                y: yPos,
                duration: 1,
                ease: 'power2.out'
            });
        });
        
        hero.addEventListener('mouseleave', () => {
            gsap.to(heroContent, {
                x: 0,
                y: 0,
                duration: 1,
                ease: 'power2.out'
            });
        });
    }

    // Modal open function
    const openModal = () => {
        modal.style.display = 'block';
        // Force reflow
        modal.offsetHeight;
        modal.classList.add('active');
        
        gsap.from('.cyber-option', {
            duration: 0.5,
            x: -50,
            opacity: 0,
            stagger: 0.1,
            ease: 'power4.out',
            delay: 0.2
        });
    };

    // Modal close function
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match transition duration
    };

    // Event listeners
    hireButton.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Prevent closing when clicking modal content
    modal.querySelector('.modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Hover animations for options
    options.forEach(option => {
        option.addEventListener('mouseenter', () => {
            gsap.to(option, {
                duration: 0.3,
                x: 10,
                ease: 'power2.out'
            });
        });

        option.addEventListener('mouseleave', () => {
            gsap.to(option, {
                duration: 0.3,
                x: 0,
                ease: 'power2.out'
            });
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Add theme switching functionality
    const themeSwitch = document.getElementById('themeSwitch');
    
    const createTransitionElements = () => {
        const grid = document.getElementById('themeGrid');
        grid.style.display = 'block';
        grid.innerHTML = '';

        const overlay = document.createElement('div');
        overlay.className = 'scan-overlay';
        
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        
        grid.appendChild(overlay);
        grid.appendChild(scanLine);
        
        return grid;
    };

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        const grid = createTransitionElements();

        // Enable smooth transitions during theme change
        document.documentElement.setAttribute('data-theme-changing', 'true');

        const tl = gsap.timeline({
            onComplete: () => {
                grid.style.display = 'none';
                document.documentElement.removeAttribute('data-theme-changing');
            }
        });

        // Scanning animation from right to left
        tl.to('.theme-switch', {
            scale: 0.95,
            duration: 0.2
        })
        .to('.scan-line', {
            opacity: 1,
            duration: 0.1
        })
        .to('.scan-line', {
            right: '100%',
            duration: 1,
            ease: 'power1.inOut',
            onUpdate: function() {
                const progress = this.progress();
                if (progress > 0.1) {
                    document.documentElement.setAttribute('data-theme', newTheme);
                }
            }
        })
        .to('.scan-overlay', {
            scaleX: 1,
            duration: 1,
            ease: 'power1.inOut'
        }, '<')
        .to('.theme-switch', {
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)'
        }, '-=0.3')
        .to('.scan-line', {
            opacity: 0,
            duration: 0.2
        }, '-=0.2');
    };

    themeSwitch.addEventListener('click', toggleTheme);

    // Mobile menu functionality
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileClose = document.getElementById('mobileClose');
    const overlay = document.getElementById('overlay');
    const mobileThemeSwitch = document.getElementById('mobilethemeSwitch');

    function openMobileMenu() {
        mobileNav.style.visibility = 'visible';
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            mobileNav.style.visibility = 'hidden';
        }, 300);
    }

    hamburgerMenu.addEventListener('click', openMobileMenu);
    mobileClose.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
    
    // Add theme switch functionality to mobile button
    mobileThemeSwitch.addEventListener('click', toggleTheme);

    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});


