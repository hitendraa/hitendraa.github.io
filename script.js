document.addEventListener('DOMContentLoaded', () => {
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

    // Add hover animations for CTA buttons
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

    // Enhanced parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        gsap.to('.hero-content', {
            y: scrolled * 0.1,
            duration: 0.8,
            ease: 'none'
        });
        gsap.to('.hero-title .line', {
            x: scrolled * 0.1,
            duration: 0.8,
            ease: 'none',
            stagger: 0.1
        });
        gsap.to('.hero-decorations', {
            y: scrolled * 0.05,
            duration: 0.8,
            ease: 'none'
        });
    });

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
    const createThemeTransition = () => {
        const overlay = document.createElement('div');
        overlay.className = 'theme-transition';
        document.body.appendChild(overlay);
        return overlay;
    };

    const themeSwitch = document.getElementById('themeSwitch');
    
    const createHexGrid = () => {
        const grid = document.getElementById('themeGrid');
        grid.style.display = 'block';
        grid.innerHTML = '';
        
        const hexSize = 100;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const cols = Math.ceil(w / hexSize) + 2;
        const rows = Math.ceil(h / hexSize) + 2;
        
        for(let y = 0; y < rows; y++) {
            for(let x = 0; x < cols; x++) {
                const hex = document.createElement('div');
                hex.className = 'hex-container';
                hex.style.width = `${hexSize}px`;
                hex.style.height = `${hexSize}px`;
                hex.style.left = `${(x * hexSize * 0.75) - hexSize}px`;
                hex.style.top = `${(y * hexSize * 0.87) - hexSize}px`;
                grid.appendChild(hex);
            }
        }
        return grid;
    };

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

        // Subtle particle effect
        gsap.to('#bgCanvas', {
            opacity: 0.7,
            duration: 0.3,
            yoyo: true,
            repeat: 1
        });
    };

    themeSwitch.addEventListener('click', toggleTheme);
});


