// Custom easing functions
CustomEase.create("easeOutFast", "M0,0 C0.25,0.1 0.25,1 1,1"); // Opening ease
CustomEase.create("easeInFast", "M0,0 C0.5,0 0.75,0.2 1,1"); // Closing ease
CustomEase.create("easeOutBack", "M0,0 C0.175,0.885 0.32,1.275 1,1"); // Bounce out ease

const menuBtn = document.getElementById("menu-btn");
const dropdown = document.getElementById("dropdown");
const dropdownContent = document.querySelector(".dropdown__content");
const allContent = document.getElementById("all-content");
const navigation = document.getElementById("navigation");
const navLogo = document.querySelector(".navigation__logo");
const navRight = document.querySelector(".navigation__right");
const menuButtons = document.querySelectorAll(".dropdown__button");
let isOpen = false;
let heroAnimationsStarted = false; // Flag to prevent duplicate animations

// Hero Animation Timeline
function initHeroAnimations() {
  // Prevent duplicate animations
  if (heroAnimationsStarted) {
    console.log("Hero animations already started, skipping...");
    return;
  }
  
  heroAnimationsStarted = true;
  console.log("Initializing hero animations...");
  
  // Register ScrollTrigger plugin first
  gsap.registerPlugin(ScrollTrigger);
  
  // Main hero animation timeline with immediate start
  const heroTimeline = gsap.timeline({ delay: 0.3 });

  heroTimeline
    // 1. Animate hero title lines with dramatic effect
    .fromTo(".hero__title-line", 
      { y: "100%", opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      }
    )
    
    // 2. Subtitle with typewriter effect feel
    .fromTo(".hero__subtitle",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
    
    // 3. Description with smooth reveal
    .fromTo(".hero__description",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
    
    // 4. Buttons with bounce effect
    .fromTo(".hero__cta",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.4")
    
    // 5. Visual elements with dramatic entrance
    .fromTo(".hero__visual",
      { scale: 0.8, opacity: 0, rotation: -5 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.4,
        ease: "power3.out"
      }, "-=1")
    
    // 6. Scroll indicator with delay
    .fromTo(".hero__scroll-indicator",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.2");

  // Add continuous subtle animations after main animation completes
  heroTimeline.call(() => {
    console.log("Starting continuous animations...");
    
    // Add subtle breathing animation to title
    gsap.to(".hero__title", {
      scale: 1.02,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    // Avatar breathing effect
    gsap.to(".hero__avatar", {
      scale: 1.05,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    // Rotating circles
    gsap.to(".decorative-circle--1", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    gsap.to(".decorative-circle--2", {
      rotation: -360,
      duration: 25,
      repeat: -1,
      ease: "none"
    });
  });

  // Enhanced button hover animations (only add once)
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(button => {
    // Remove any existing listeners to prevent duplicates
    button.removeEventListener("mouseenter", buttonHoverIn);
    button.removeEventListener("mouseleave", buttonHoverOut);
    
    // Add new listeners
    button.addEventListener("mouseenter", buttonHoverIn);
    button.addEventListener("mouseleave", buttonHoverOut);
  });

  // Magnetic effect for avatar (only add once)
  const avatar = document.querySelector(".hero__avatar");
  if (avatar) {
    // Remove any existing listeners
    avatar.removeEventListener("mousemove", avatarMouseMove);
    avatar.removeEventListener("mouseleave", avatarMouseLeave);
    
    // Add new listeners
    avatar.addEventListener("mousemove", avatarMouseMove);
    avatar.addEventListener("mouseleave", avatarMouseLeave);
  }
  
  // Parallax effect for hero elements on scroll
  gsap.to(".hero__visual", {
    y: -100,
    scrollTrigger: {
      trigger: ".hero",
      start: "top center",
      end: "bottom top",
      scrub: 1
    }
  });

  gsap.to(".decorative-circle", {
    y: -50,
    rotation: 180,
    scrollTrigger: {
      trigger: ".hero",
      start: "top center", 
      end: "bottom top",
      scrub: 1.5
    }
  });

  gsap.to(".hero__title", {
    y: -30,
    opacity: 0.8,
    scrollTrigger: {
      trigger: ".hero",
      start: "top center",
      end: "bottom top",
      scrub: 0.5
    }
  });
}

// Separate functions for event handlers to prevent duplicates
function buttonHoverIn() {
  gsap.to(this, {
    scale: 1.08,
    y: -3,
    duration: 0.3,
    ease: "power2.out"
  });
}

function buttonHoverOut() {
  gsap.to(this, {
    scale: 1,
    y: 0,
    duration: 0.3,
    ease: "power2.out"
  });
}

function avatarMouseMove(e) {
  const rect = this.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  gsap.to(this, {
    x: x * 0.1,
    y: y * 0.1,
    duration: 0.3,
    ease: "power2.out"
  });
}

function avatarMouseLeave() {
  gsap.to(this, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "power2.out"
  });
}

// Button functionality
function scrollToProjects() {
  // Smooth scroll to projects section (will be added later)
  gsap.to(window, {
    duration: 1.5,
    scrollTo: "#projects",
    ease: "power2.inOut"
  });
}

function downloadResume() {
  // Download the resume PDF
  const link = document.createElement('a');
  link.href = 'Resume.pdf';
  link.download = 'Hitendra_Singh_Choudhary_Resume.pdf';
  link.click();
}

// Initialize all animations when page loads - SINGLE TRIGGER ONLY
document.addEventListener("DOMContentLoaded", () => {
  if (!heroAnimationsStarted) {
    initHeroAnimations();
    initProjectsAnimations();
    initExperienceAnimations();
    initSkillsAnimations();
    initContactAnimations();
  }
});

menuBtn.addEventListener("click", () => {
  if (!isOpen) {
    openMenu();
  } else {
    closeMenu();
  }
  isOpen = !isOpen;
});

function openMenu() {
  // Add active class to hamburger button
  menuBtn.classList.add("active");
  
  // Show the dropdown but keep content invisible initially
  dropdown.classList.add("open");

  // Add menu-open class to all-content for border radius
  allContent.classList.add("menu-open");

  // Reset the visibility and position of menu buttons
  gsap.set(menuButtons, {
    opacity: 0,
    y: 20,
    filter: "blur(10px)" // Start with heavy blur
  });

  // Create timeline for animations
  const openTimeline = gsap.timeline();

  openTimeline
    // Add padding to body to reveal background
    .to(document.body, {
      paddingTop: "20px",
      paddingLeft: "20px",
      paddingRight: "20px",
      duration: 0.3,
      ease: "easeOutFast"
    })

    // Push all navigation elements equally
    .to(
      [navLogo, navRight],
      {
        x: function (i) {
          return i === 0 ? 20 : -20; // Push logo right, contact left
        },
        duration: 0.3,
        ease: "easeOutFast",
        force3D: true // Force 3D transforms for better performance
      },
      "<"
    ) // Start at the same time as the content animation

    // Also push the dropdown down to match the content padding
    .to(
      dropdown,
      {
        marginTop: "20px",
        duration: 0.3,
        ease: "easeOutFast"
      },
      "<"
    )

    // Animate the dropdown expanding from the top
    .fromTo(
      dropdown,
      {
        opacity: 0,
        scaleY: 0,
        maxHeight: 0
      },
      {
        opacity: 1,
        scaleY: 1,
        maxHeight: "60vh", // Increased for better content display
        duration: 0.4,
        ease: "easeOutFast",
        force3D: true // Force 3D transforms for better performance
      },
      "-=0.2"
    )
    // Staggered animation for menu buttons with blur effect (top to bottom)
    .to(
      menuButtons,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)", // Animate to no blur
        stagger: 0.05,
        duration: 0.3,
        ease: "easeOutFast",
        force3D: true
      },
      "-=0.1"
    );
}

function closeMenu() {
  // Remove active class from hamburger button
  menuBtn.classList.remove("active");
  
  // Create an array of menu buttons in reverse order for bottom-to-top animation
  const reversedButtons = Array.from(menuButtons).reverse();

  // Create timeline for animations
  const closeTimeline = gsap.timeline({
    onComplete: () => {
      // Hide the dropdown when animations complete
      dropdown.classList.remove("open");

      // Remove menu-open class from all-content
      allContent.classList.remove("menu-open");
    }
  });

  closeTimeline
    // 1. Animate out the menu buttons with staggered effect
    .to(
      reversedButtons,
      {
        opacity: 0,
        y: 20,
        filter: "blur(10px)", // Animate back to blur
        stagger: 0.03,
        duration: 0.2,
        ease: "easeInFast",
        force3D: true
      }
    )

    // 2. After a small delay, start collapsing the dropdown
    .to(
      dropdown,
      {
        opacity: 0,
        scaleY: 0,
        maxHeight: 0,
        duration: 0.4,
        ease: "easeInFast",
        force3D: true
      },
      "+=0.05"
    ) // Small delay after buttons fade out

    // 3. Reset dropdown margin alongside the dropdown collapse
    .to(
      dropdown,
      {
        marginTop: "0",
        duration: 0.4,
        ease: "easeInFast"
      },
      "<"
    )

    // 4. Remove padding from body after dropdown starts collapsing
    .to(
      document.body,
      {
        paddingTop: "0",
        paddingLeft: "0",
        paddingRight: "0",
        duration: 0.3,
        ease: "easeInFast"
      },
      "-=0.2"
    )

    // 5. Reset navigation elements position alongside body padding
    .to(
      [navLogo, navRight],
      {
        x: 0,
        duration: 0.3,
        ease: "easeInFast",
        force3D: true
      },
      "<"
    );
}

// Projects Animation Timeline
function initProjectsAnimations() {
  console.log("Initializing projects animations...");
  
  // Projects header animation
  gsap.fromTo(".projects__header", 
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".projects",
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Animate title lines
  gsap.fromTo(".projects__title-line",
    { y: "100%", opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".projects__header",
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Animate subtitle
  gsap.fromTo(".projects__subtitle",
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.3,
      scrollTrigger: {
        trigger: ".projects__header",
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Project cards staggered animation
  gsap.fromTo(".project-card",
    { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".projects__grid",
        start: "top 85%",
        end: "top 40%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Enhanced project card hover animations
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach(card => {
    // Remove existing listeners to prevent duplicates
    card.removeEventListener("mouseenter", projectCardHoverIn);
    card.removeEventListener("mouseleave", projectCardHoverOut);
    
    // Add new listeners
    card.addEventListener("mouseenter", projectCardHoverIn);
    card.addEventListener("mouseleave", projectCardHoverOut);
  });

  // Tech tags hover animations
  const techTags = document.querySelectorAll(".tech-tag");
  techTags.forEach(tag => {
    tag.removeEventListener("mouseenter", techTagHoverIn);
    tag.removeEventListener("mouseleave", techTagHoverOut);
    
    tag.addEventListener("mouseenter", techTagHoverIn);
    tag.addEventListener("mouseleave", techTagHoverOut);
  });
}

// Project card hover functions
function projectCardHoverIn() {
  gsap.to(this, {
    y: -8,
    duration: 0.3,
    ease: "power2.out"
  });
  
  gsap.to(this.querySelector(".project-card__title"), {
    color: "#1a1a1a",
    duration: 0.3,
    ease: "power2.out"
  });
}

function projectCardHoverOut() {
  gsap.to(this, {
    y: 0,
    duration: 0.3,
    ease: "power2.out"
  });
  
  gsap.to(this.querySelector(".project-card__title"), {
    color: "var(--color-foreground)",
    duration: 0.3,
    ease: "power2.out"
  });
}

// Tech tag hover functions
function techTagHoverIn() {
  gsap.to(this, {
    y: -2,
    scale: 1.05,
    duration: 0.2,
    ease: "power2.out"
  });
}

function techTagHoverOut() {
  gsap.to(this, {
    y: 0,
    scale: 1,
    duration: 0.2,
    ease: "power2.out"
  });
}

// Test function to check if GSAP is working
function testGSAP() {
  console.log("Testing GSAP...");
  console.log("GSAP version:", gsap.version);
  
  // Test simple animation
  gsap.to(".hero__title", {
    scale: 1.1,
    duration: 0.5,
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut"
  });
}

// Project popup functionality
const projectPopup = document.getElementById("project-popup");
const popupClose = document.getElementById("popup-close");
const popupOverlay = document.querySelector(".project-popup__overlay");

// Project data with live demo links
const projectData = {
  sonica: {
    title: "Sonica",
    subtitle: "Music Streaming Platform",
    status: "Currently Working",
    date: "May 2025 - Present",
    description: "Full-stack music streaming platform with real-time playback, personalized recommendations, and responsive UI using Next.js. Building cross-platform mobile apps with React Native for seamless user experience across devices.",
    tech: ["Next.js", "React Native", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    liveDemo: "https://sonica-web.vercel.app/"
  },
  "expert-india": {
    title: "Expert India",
    subtitle: "Legal Consultancy Platform",
    status: "Completed",
    date: "Jun 12 - Jul 3, 2025",
    description: "Full-stack legal consultancy platform with comprehensive user management, payment integrations, and custom client functionalities. Built with modern Next.js architecture for optimal performance and scalability.",
    tech: ["Next.js", "Payment Gateway", "User Management", "PostgreSQL", "Prisma", "Tailwind CSS"],
    liveDemo: "https://theexpertindia.com/"
  },
  "habit-tracker": {
    title: "Habit Tracker",
    subtitle: "Productivity Application",
    status: "Completed",
    date: "May 2025",
    description: "Habit-tracking app with 95% user satisfaction, featuring intuitive UI, animated progress charts, and gamified achievements. Improved daily retention by 40% through engaging user experience design.",
    tech: ["React", "GSAP", "PostgreSQL", "Express.js", "Chart.js", "CSS3"],
    liveDemo: "https://habit-tracker-peach-phi.vercel.app/"
  },
  kynok: {
    title: "Kynok Startup Site",
    subtitle: "E-commerce Platform",
    status: "Completed",
    date: "Dec 2024 - Jan 2025",
    description: "Fully animated e-commerce website using MERN stack, GSAP, and Framer Motion. Custom payment gateway and tailored client functionality for enhanced user engagement and seamless shopping experience.",
    tech: ["MERN Stack", "GSAP", "Framer Motion", "Payment Gateway", "MongoDB", "Express.js"],
    liveDemo: "https://kynok.com/"
  },
  "chat-pdf": {
    title: "Chat With PDF",
    subtitle: "AI-Powered Document Assistant",
    status: "Completed",
    date: "2024",
    description: "AI platform for interactive PDF conversations using LangChain and Generative AI. Features tiered subscriptions with usage limits and vector database integration for intelligent document processing.",
    tech: ["LangChain", "Generative AI", "Vector DB", "Python", "FastAPI", "OpenAI"],
    liveDemo: "https://chat-with-pdf-challenge-mocha.vercel.app/"
  },
  "apple-website": {
    title: "Apple Website",
    subtitle: "3D Interactive Experience",
    status: "Completed",
    date: "2024",
    description: "Interactive iPhone product page replica with 3D models, smooth animations, and Apple-style UI components including carousels and seamless transitions. Built with modern web technologies for immersive user experience.",
    tech: ["React.js", "Three.js", "GSAP", "3D Modeling", "WebGL", "CSS3"],
    liveDemo: "https://apple-website-liard.vercel.app/"
  }
};

// Open project popup
function openProjectPopup(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  // Update popup content
  document.getElementById("popup-title").textContent = project.title;
  document.getElementById("popup-subtitle").textContent = project.subtitle;
  document.getElementById("popup-status").textContent = project.status;
  document.getElementById("popup-date").textContent = project.date;
  document.getElementById("popup-description").innerHTML = `<p>${project.description}</p>`;
  document.getElementById("popup-live-demo").href = project.liveDemo;
  document.getElementById("popup-preview-text").textContent = project.title;

  // Update status styling
  const statusElement = document.getElementById("popup-status");
  statusElement.className = "project-popup__status";
  if (projectKey === "sonica") {
    statusElement.style.backgroundColor = "#4CAF50";
  } else {
    statusElement.style.backgroundColor = "var(--color-accent)";
  }

  // Update tech tags
  const techContainer = document.getElementById("popup-tech");
  techContainer.innerHTML = project.tech.map(tech => 
    `<span class="tech-tag">${tech}</span>`
  ).join("");

  // Show popup with animation
  projectPopup.classList.add("active");
  document.body.style.overflow = "hidden";

  // GSAP animation for popup entrance
  gsap.fromTo(".project-popup__container", 
    { scale: 0.8, y: 50, opacity: 0 },
    { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
  );

  // Animate popup content
  gsap.fromTo(".project-popup__info > *", 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "power2.out" }
  );
}

// Close project popup
function closeProjectPopup() {
  gsap.to(".project-popup__container", {
    scale: 0.8,
    y: 50,
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      projectPopup.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// Event listeners for popup
popupClose.addEventListener("click", closeProjectPopup);
popupOverlay.addEventListener("click", closeProjectPopup);

// Close popup on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectPopup.classList.contains("active")) {
    closeProjectPopup();
  }
});

// Update project cards to use popup and live demo links
document.addEventListener("DOMContentLoaded", () => {
  // Add click handlers to project cards and buttons
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach(card => {
    const projectKey = card.getAttribute("data-project");
    
    // View Details buttons
    const viewDetailsBtn = card.querySelector(".project-btn--primary");
    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openProjectPopup(projectKey);
      });
    }

    // Live Demo buttons
    const liveDemoBtn = card.querySelector(".project-btn--secondary");
    if (liveDemoBtn && projectData[projectKey]) {
      liveDemoBtn.onclick = (e) => {
        e.preventDefault();
        window.open(projectData[projectKey].liveDemo, "_blank");
      };
    }
  });
});

// Professional, modern GSAP animation for the vertical experience timeline
function initExperienceAnimations() {
  console.log("Initializing experience timeline animations...");
  
  // Animate the main timeline progress line based on scroll
  const timeline = document.querySelector('.experience__timeline');
  if (timeline) {
    gsap.to(timeline, {
      '--timeline-progress': '100%',
      scrollTrigger: {
        trigger: '.experience__timeline',
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress * 100;
          gsap.set(timeline, {
            '--timeline-progress': `${progress}%`
          });
          // Update CSS custom property for the timeline line height
          timeline.style.setProperty('--timeline-height', `${progress}%`);
        }
      }
    });
  }

  // Animate individual experience items
  gsap.utils.toArray('.experience-item').forEach((item, i) => {
    // Main item animation
    gsap.fromTo(item,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate dot with scale and glow effect
    const dot = item.querySelector('.experience-item__dot');
    if (dot) {
      gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            end: 'top 55%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              // Add active state when dot comes into view
              gsap.to(dot, {
                boxShadow: '0 0 0 4px var(--color-background), 0 0 20px rgba(197, 184, 165, 0.4)',
                scale: 1.1,
                duration: 0.3
              });
            },
            onLeave: () => {
              // Remove active state when scrolling past
              gsap.to(dot, {
                boxShadow: '0 0 0 4px var(--color-background)',
                scale: 1,
                duration: 0.3
              });
            },
            onEnterBack: () => {
              // Re-add active state when scrolling back up
              gsap.to(dot, {
                boxShadow: '0 0 0 4px var(--color-background), 0 0 20px rgba(197, 184, 165, 0.4)',
                scale: 1.1,
                duration: 0.3
              });
            },
            onLeaveBack: () => {
              // Remove active state when scrolling back up past
              gsap.to(dot, {
                boxShadow: '0 0 0 4px var(--color-background)',
                scale: 1,
                duration: 0.3
              });
            }
          }
        }
      );
    }

    // Enhanced content hover animations
    const content = item.querySelector('.experience-item__content');
    if (content) {
      content.addEventListener('mouseenter', function() {
        gsap.to(content, { 
          y: -5, 
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)', 
          duration: 0.3, 
          ease: 'power2.out' 
        });
        const company = content.querySelector('.experience-item__company');
        if (company) {
          gsap.to(company, { 
            color: '#1a1a1a', 
            duration: 0.3 
          });
        }
        // Animate tech tags on hover
        const techTags = content.querySelectorAll('.tech-tag');
        gsap.to(techTags, {
          y: -2,
          scale: 1.05,
          duration: 0.2,
          stagger: 0.02,
          ease: 'power2.out'
        });
      });
      
      content.addEventListener('mouseleave', function() {
        gsap.to(content, { 
          y: 0, 
          boxShadow: 'none', 
          duration: 0.3, 
          ease: 'power2.out' 
        });
        const company = content.querySelector('.experience-item__company');
        if (company) {
          gsap.to(company, { 
            color: 'var(--color-foreground)', 
            duration: 0.3 
          });
        }
        // Reset tech tags
        const techTags = content.querySelectorAll('.tech-tag');
        gsap.to(techTags, {
          y: 0,
          scale: 1,
          duration: 0.2,
          stagger: 0.02,
          ease: 'power2.out'
        });
      });
    }
  });
}

// Skills Section Animations
function initSkillsAnimations() {
  console.log("Initializing skills animations...");

  // Animate skills header
  gsap.utils.toArray('.skills__title-line').forEach((line, i) => {
    gsap.fromTo(line,
      { y: "100%", opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills__header',
          start: 'top 70%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        },
        delay: i * 0.1
      }
    );
  });

  gsap.fromTo('.skills__subtitle',
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.skills__header',
        start: 'top 70%',
        end: 'top 50%',
        toggleActions: 'play none none reverse'
      },
      delay: 0.3
    }
  );

  // Animate skills content container
  gsap.fromTo('.skills__content',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills__content',
        start: 'top 80%',
        end: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Animate skill rows with pyramid effect
  gsap.utils.toArray('.skills__row').forEach((row, i) => {
    gsap.fromTo(row,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
          end: 'top 65%',
          toggleActions: 'play none none reverse'
        },
        delay: i * 0.2
      }
    );

    // Animate individual tech tags within each row
    const techTags = row.querySelectorAll('.tech-tag');
    techTags.forEach((tag, index) => {
      gsap.fromTo(tag,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tag,
            start: 'top 90%',
            end: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.05
        }
      );
    });
  });
}

// Contact Section Animations
function initContactAnimations() {
  console.log("Initializing contact animations...");

  // Header animations
  gsap.fromTo(".contact__header",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Title lines animation
  gsap.fromTo(".contact__title-line",
    { y: "100%", opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact__title',
        start: 'top 85%',
        end: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Subtitle animation
  gsap.fromTo(".contact__subtitle",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact__subtitle',
        start: 'top 85%',
        end: 'top 60%',
        toggleActions: 'play none none reverse'
      },
      delay: 0.3
    }
  );

  // Content animation
  gsap.fromTo(".contact__content",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact__content',
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Contact methods animation
  const contactMethods = document.querySelectorAll('.contact__method');
  contactMethods.forEach((method, index) => {
    gsap.fromTo(method,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: method,
          start: 'top 85%',
          end: 'top 60%',
          toggleActions: 'play none none reverse'
        },
        delay: index * 0.1
      }
    );
  });

  // Form animation
  gsap.fromTo(".contact__form",
    { opacity: 0, x: 30 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact__form',
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Form notice links animation
  const noticeLinks = document.querySelectorAll('.contact__notice-link');
  noticeLinks.forEach((link, index) => {
    gsap.fromTo(link,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: link,
          start: 'top 90%',
          end: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        delay: index * 0.1
      }
    );
  });

  // Specialties tags animation
  const specialtyTags = document.querySelectorAll('.contact__specialties-list .tech-tag');
  specialtyTags.forEach((tag, index) => {
    gsap.fromTo(tag,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: tag,
          start: 'top 90%',
          end: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        delay: index * 0.05
      }
    );
  });

  // Footer animation
  gsap.fromTo(".contact__footer",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact__footer',
        start: 'top 90%',
        end: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  );
}

// Contact form will be implemented later when SMTP is set up
// For now, users are directed to use email or LinkedIn for contact
