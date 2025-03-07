document.addEventListener("DOMContentLoaded", () => {
    const Lenis = window.Lenis;  // Get Lenis from window object
    const lenis = new Lenis();
    
    // Rest of the initialization
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const workSection = document.querySelector(".work");
    const cardsContainer = document.querySelector(".cards");
    const moveDistance = window.innerWidth * 3; // Reduced from 5 to 3
    let currentXPosition = 0;

    const lerp = (start, end, t) => start + (end - start) * t;

    const gridCanvas = document.createElement("canvas")
    gridCanvas.id = "grid-canvas";
    workSection.appendChild(gridCanvas);
    const gridCtx = gridCanvas.getContext("2d");

    const resizeGridCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        [gridCanvas.width, gridCanvas.height] = [
            window.innerWidth * dpr,
            window.innerHeight * dpr
        ];
        [gridCanvas.style.width, gridCanvas.style.height] = [
            `${window.innerWidth}px`,
            `${window.innerHeight}px`
        ];
        gridCtx.scale(dpr, dpr);
    };
    resizeGridCanvas();

    const drawGrid = (scrollProgress) => {
        gridCtx.fillStyle = "black";
        gridCtx.fillRect(0, 0, gridCanvas.width, gridCanvas.height);
        gridCtx.fillStyle = "#00CED1"; // Changed from #f40c3f to #00CED1
        const [dotSize, spacing] = [1, 30];
        const [rows, cols] = [
            Math.ceil(gridCanvas.height / spacing),
            Math.ceil(gridCanvas.width / spacing) + 15
        ];
        const offset = (scrollProgress * spacing * 10) % spacing;

        for (let y = 0; y < rows; y++) {
            for (let x= 0; x < cols; x++) {
                gridCtx.beginPath();
                gridCtx.arc(
                    x * spacing - offset,
                    y * spacing,
                    dotSize,
                    0,
                    Math.PI * 2
                );
                gridCtx.fill();
            }
        }
    }

    const lettersScene = new THREE.Scene();
    const lettersCamera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    lettersCamera.position.z = 20;

    const lettersRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    })

    lettersRenderer.setSize(window.innerWidth, window.innerHeight);
    lettersRenderer.setClearColor(0x000000, 0);
    lettersRenderer.setPixelRatio(window.devicePixelRatio);
    lettersRenderer.domElement.id = "letters-canvas";
    workSection.appendChild(lettersRenderer.domElement);

    const createTextAnimationPath = (yPos, amplitude) => {
        const points = [];
        for (let i = 0; i <= 20; i++) {
            const t = i / 20;
            points.push(
                new THREE.Vector3(
                    -25 + 50 * t,
                    yPos + Math.sin(t * Math.PI) * -amplitude,
                    (1 - Math.pow(Math.abs(t - 0.5) * 2, 2)) * -5
                )
            )
        }
        const curve = new THREE.CatmullRomCurve3(points);
        const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(curve.getPoints(100)),
            new THREE.LineBasicMaterial({ color: 0x000, linewidth: 1 })
        )

        line.curve = curve;
        return line
    }

    const path = [
        createTextAnimationPath(10, 2),
        createTextAnimationPath(3.5, 1),
        createTextAnimationPath(-3.5, -1),
        createTextAnimationPath(-10, -2)
    ];

    path.forEach((line) => lettersScene.add(line));

    const textContainer = document.querySelector(".text-container");
    const letterpositions = new Map();
    path.forEach((line, i) => {
        line.letterElements = Array.from({length: 15}, (_, index) => { // Add index parameter
            const el = document.createElement("div");
            el.className = "letter"
            el.textContent = ["W", "O", "R", "K"][i];
            el.style.position = "absolute";
            // Add initial spread of letters
            el.style.transform = `translate(-50%, -50%) translateX(${(index - 7) * 100}px)`;
            textContainer.appendChild(el);
            letterpositions.set(el, {
                current: {
                    x: (index - 7) * 100, // Add initial X position
                    y: 0
                },
                target: {
                    x: (index - 7) * 100, // Add initial X position
                    y: 0
                }
            })
            return el;
        })
    })

    const lineSpeedMultipliers = [0.8, 1, 0.7, 0.9];
    const updateTargetPositions = (scrollProgress = 0) => {
        path.forEach((line, lineIndex) => {
            line.letterElements.forEach((element, i) => {
                const point = line.curve.getPoint(
                    (i/14 + scrollProgress * lineSpeedMultipliers[lineIndex]) % 1
                )
                const vector = point.clone().project(lettersCamera);
                const position = letterpositions.get(element);
                position.target = {
                    x: (-vector.x * 0.5 + 0.5) * window.innerWidth,
                    y: (-vector.y * 0.5 + 0.5) * window.innerHeight
                }
            })
        })
    }

    const updateLettersPosition = () => {
        letterpositions.forEach((position, element) => {
            const distX = position.target.x - position.current.x;
            const distY = position.target.y - position.current.y;
            
            if (Math.abs(distX) > window.innerWidth * 0.7) {
                position.current = {...position.target};
            } else {
                position.current.x = lerp(position.current.x, position.target.x, 0.07);
                position.current.y = lerp(position.current.y, position.target.y, 0.07);
            }
            
            element.style.transform = `translate(-50%, -50%) translate(${position.current.x}px, ${position.current.y}px)`;
        })
    }

    const updateCardsPosition = () => {
        const targetx = -moveDistance *(ScrollTrigger.getAll()[0]?.progress || 0);
        currentXPosition = lerp(currentXPosition, targetx, 0.07);
        gsap.set(cardsContainer, {
            x: currentXPosition
        })
    }

    const animate = () => {
        updateLettersPosition();
        updateCardsPosition();
        lettersRenderer.render(lettersScene, lettersCamera);
        requestAnimationFrame(animate);
    }

    ScrollTrigger.create({
        trigger: ".work",
        start: "top top",
        end: "+=700%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {  // Fixed typo: 'slef' to 'self'
            updateTargetPositions(self.progress);
            drawGrid(self.progress);
        }
    });

    drawGrid(0);
    animate()
    updateTargetPositions(0);

    window.addEventListener("resize", () => {
        resizeGridCanvas();
        drawGrid(ScrollTrigger.getAll()[0]?.progress || 0);
        lettersCamera.aspect = window.innerWidth / window.innerHeight;
        lettersCamera.updateProjectionMatrix();
        lettersRenderer.setSize(window.innerWidth, window.innerHeight);
        updateTargetPositions(ScrollTrigger.getAll()[0]?.progress || 0);
    })

    // Add this to handle card hover interactions
    document.querySelectorAll('.card').forEach(card => {
        // Add subtle 3D rotation effect on hover
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const centerX = cardRect.left + cardRect.width / 2;
            const centerY = cardRect.top + cardRect.height / 2;
            const rotateY = ((e.clientX - centerX) / cardRect.width) * 5; // Max 5 degrees rotation
            const rotateX = ((e.clientY - centerY) / cardRect.height) * -5; // Inverted for correct effect
            
            gsap.to(card, {
                rotateY: rotateY,
                rotateX: rotateX,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            // Also move the image slightly
            const img = card.querySelector('.browser-content img');
            gsap.to(img, {
                x: rotateY * 2,
                y: rotateX * -2,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            const img = card.querySelector('.browser-content img');
            gsap.to(img, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
});