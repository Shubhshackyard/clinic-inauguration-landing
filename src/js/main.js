document.addEventListener('DOMContentLoaded', function() {
    // Form functionality (if needed in the future)
    const form = document.getElementById('guest-invitation-form');
    const submitButton = document.getElementById('submit-button');
    const successMessage = document.getElementById('success-message');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (successMessage) {
                successMessage.style.display = 'block';
            }
            form.reset();
        });
    }

    if (submitButton && successMessage) {
        submitButton.addEventListener('click', function() {
            successMessage.style.display = 'none';
        });
    }

    // Define WhatsApp RSVP elements - MOVED TO A SINGLE LOCATION
    const whatsappButton = document.getElementById('whatsapp-button');
    const guestNameInput = document.getElementById('guest-name');
    const guestCountSelect = document.getElementById('guest-count');
    
    // Attach WhatsApp button functionality
    if (whatsappButton && guestNameInput) {
        whatsappButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const name = guestNameInput.value.trim();
            const guestCount = guestCountSelect ? guestCountSelect.value : "1";
            
            if (!name) {
                alert('Please enter your name');
                return;
            }
            
            const phoneNumber = '916200064926';
            
            const message = encodeURIComponent(
                `I am honored to confirm my attendance for Dr. Umesh Kumar's clinic inauguration and look forward to celebrating this special milestone.\n\n` +
                `Name: ${name}\n\n` +
                `Thank you!`
            );
            
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    }
    
    // Confetti effect functions
    const confettiCanvas = document.getElementById('confetti-canvas');
    const ctx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
    let confettiAnimationId = null;
    let particles = [];
    
    function resizeCanvas() {
        if (confettiCanvas) {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        }
    }
    
    function initConfetti() {
        if (!ctx) return;
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim();
        const neutralColor = getComputedStyle(document.documentElement).getPropertyValue('--neutral').trim();
        
        particles = [];
        const particleCount = Math.min(150, window.innerWidth / 5);
        const colors = [
            primaryColor || '#4FACAD', 
            secondaryColor || '#A3C9A8', 
            neutralColor || '#E8ECEF',
            '#FFFFFF',
            '#FFC107'
        ];
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * confettiCanvas.width,
                y: -20 - Math.random() * 100,
                size: Math.random() * 6 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                angle: Math.random() * Math.PI * 2,
                spin: Math.random() < 0.5 ? -0.05 : 0.05,
                shape: Math.random() < 0.33 ? 'circle' : Math.random() < 0.66 ? 'square' : 'triangle'
            });
        }
        
        if (confettiAnimationId) {
            cancelAnimationFrame(confettiAnimationId);
        }
        animate();
    }
    
    function animate() {
        if (!ctx) return;
        
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        let particlesToKeep = [];
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            p.y += p.speed;
            p.angle += p.spin;
            
            if (p.y < confettiCanvas.height + 100) {
                particlesToKeep.push(p);
                
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.fillStyle = p.color;
                
                if (p.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else if (p.shape === 'square') {
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                } else {
                    ctx.beginPath();
                    ctx.moveTo(0, -p.size / 2);
                    ctx.lineTo(-p.size / 2, p.size / 2);
                    ctx.lineTo(p.size / 2, p.size / 2);
                    ctx.closePath();
                    ctx.fill();
                }
                
                ctx.restore();
            }
        }
        
        particles = particlesToKeep;
        
        if (particles.length > 0) {
            confettiAnimationId = requestAnimationFrame(animate);
        } else {
            if (confettiCanvas) {
                confettiCanvas.style.display = 'none';
            }
        }
    }
    
    // Map toggle functionality
    const toggleMapBtn = document.getElementById('toggle-map-btn');
    const mapWrapper = document.getElementById('map-wrapper');
    
    if (toggleMapBtn && mapWrapper) {
        toggleMapBtn.addEventListener('click', function() {
            toggleMapBtn.classList.toggle('active');
            mapWrapper.classList.toggle('hidden');
            
            // If map is now visible, scroll to it for better UX
            if (!mapWrapper.classList.contains('hidden')) {
                setTimeout(() => {
                    mapWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    }
    
    // SINGLE window.load event handler - combined the duplicate handlers
    window.addEventListener('load', function() {
        setTimeout(function() {
            const loader = document.getElementById('loader-wrapper');
            
            // Start confetti as the loader fades out
            initConfetti();
            
            if (loader) {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                document.body.style.overflow = 'visible';
                
                const sections = document.querySelectorAll('section');
                sections.forEach((section, index) => {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, 100 * (index + 1));
                });
                
                // Second wave of confetti
                setTimeout(() => {
                    initConfetti();
                    
                    setTimeout(() => {
                        if (confettiAnimationId) {
                            cancelAnimationFrame(confettiAnimationId);
                            confettiAnimationId = null;
                        }
                        if (confettiCanvas) {
                            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
                        }
                    }, 7000);
                }, 2000);
            }
        }, 2000);
    });
});