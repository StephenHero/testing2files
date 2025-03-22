const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Logo text configuration
const text = 'ANIMAGENT';
let angle = 0;
let hue = 0;

// Animation loop
function animate() {
    // Clear canvas with semi-transparent black for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate center position
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw main text
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(Math.sin(angle) * 0.1);
    
    // Draw letters in a circle
    for (let i = 0; i < text.length; i++) {
        const letterAngle = (i / text.length) * Math.PI * 2 + angle;
        const radius = 100 + Math.sin(angle * 2) * 20;
        const x = Math.cos(letterAngle) * radius;
        const y = Math.sin(letterAngle) * radius;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(letterAngle + Math.PI / 2);
        ctx.fillStyle = `hsl(${hue + i * 25}, 100%, 50%)`;
        ctx.font = '48px "Press Start 2P"';
        ctx.fillText(text[i], -20, 0);
        ctx.restore();
    }
    ctx.restore();

    // Update animation values
    angle += 0.02;
    hue = (hue + 0.5) % 360;

    requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const enterButton = document.querySelector('.enter-button');
    const landing = document.querySelector('.landing');
    const mainContent = document.querySelector('.main-content');

    enterButton.addEventListener('click', () => {
        landing.classList.add('fade-out');
        mainContent.classList.add('fade-in');
    });

    // Start animation
    animate();
}); 