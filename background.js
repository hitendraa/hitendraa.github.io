class CyberBackground {
    constructor() {
        this.canvas = document.getElementById('bgCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.trailPoints = [];
        this.maxTrailLength = 15;
        this.particleCount = 200;
        
        this.init();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                z: Math.random() * 3, // Depth factor
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // Update trail
            this.trailPoints.unshift({ x: e.clientX, y: e.clientY });
            if (this.trailPoints.length > this.maxTrailLength) {
                this.trailPoints.pop();
            }
        });
    }

    update() {
        this.particles.forEach(p => {
            // Move particle down and add slight x movement
            p.y += p.speed * (p.z * 1.5);
            p.x += Math.sin(p.y * 0.01) * 0.5;

            // Mouse interaction
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                p.x -= Math.cos(angle) * (1 - distance / 100) * 2;
                p.y -= Math.sin(angle) * (1 - distance / 100) * 2;
            }

            // Reset particle when it goes off screen
            if (p.y > this.canvas.height) {
                p.y = -10;
                p.x = Math.random() * this.canvas.width;
            }
            if (p.x > this.canvas.width) {
                p.x = 0;
            } else if (p.x < 0) {
                p.x = this.canvas.width;
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw particles
        this.particles.forEach(p => {
            this.ctx.beginPath();
            const color = `rgba(0, 0, 0, ${p.opacity * (p.z / 3)})`;
            this.ctx.fillStyle = color;
            this.ctx.arc(p.x, p.y, p.size * p.z, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw mouse trail
        if (this.trailPoints.length > 1) {
            this.ctx.beginPath();
            this.trailPoints.forEach((point, i) => {
                const alpha = 1 - (i / this.maxTrailLength);
                
                // Create gradient for each trail segment
                const gradient = this.ctx.createRadialGradient(
                    point.x, point.y, 0,
                    point.x, point.y, 50
                );
                gradient.addColorStop(0, `rgba(244, 12, 63, ${alpha * 0.2})`);
                gradient.addColorStop(1, 'rgba(244, 12, 63, 0)');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, 50, 0, Math.PI * 2);
                this.ctx.fill();
            });
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize background
new CyberBackground();
