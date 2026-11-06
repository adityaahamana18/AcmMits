import React, { useEffect, useRef } from 'react';

/**
 * FireworksCanvas renders realistic firework bursts, warm sparkling trails,
 * and glowing firecracker explosions on canvas.
 * Also allows user to click anywhere to trigger a custom colorful cracker burst.
 */
const FireworksCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Warm festive & cracker palettes (Golden, Amber, Orange, Cyan, Magenta, Lime)
    const colorPalettes = [
      ['#fbbf24', '#f59e0b', '#d97706', '#fef08a'], // Golden Glow
      ['#f97316', '#ea580c', '#c2410c', '#ffedd5'], // Fiery Amber
      ['#38bdf8', '#0284c7', '#0369a1', '#e0f2fe'], // Electric Cyan
      ['#ec4899', '#db2777', '#f472b6', '#fdf2f8'], // Radiant Magenta
      ['#a855f7', '#9333ea', '#7e22ce', '#f3e8ff'], // Royal Violet
      ['#4ade80', '#22c55e', '#16a34a', '#dcfce7']  // Emerald Spark
    ];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        // Radial explosion velocities
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5.5 + 1.2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.friction = 0.96;
        this.gravity = 0.07;
        this.alpha = 1;
        this.decay = Math.random() * 0.016 + 0.008;
        this.radius = Math.random() * 2.4 + 1.2;
      }

      update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw(context) {
        context.save();
        context.globalAlpha = Math.max(0, this.alpha);
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        // Warm shining glow
        context.shadowColor = this.color;
        context.shadowBlur = 10;
        context.fill();
        context.restore();
      }
    }

    class FireworkRocket {
      constructor(targetX, targetY) {
        this.x = Math.random() * (width * 0.7) + width * 0.15;
        this.y = height + 10;
        this.targetX = targetX || Math.random() * (width * 0.8) + width * 0.1;
        this.targetY = targetY || Math.random() * (height * 0.5) + height * 0.08;
        const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
        const speed = Math.random() * 3 + 9;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.color = '#fde047';
        this.exploded = false;
        this.palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        // Check if rocket has reached near its target altitude
        if (this.vy >= 0 || this.y <= this.targetY) {
          this.exploded = true;
        }
      }

      draw(context) {
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        context.fillStyle = '#fef08a';
        context.shadowColor = '#facc15';
        context.shadowBlur = 12;
        context.fill();
        context.restore();
      }
    }

    let rockets = [];
    let particles = [];
    let lastLaunch = 0;

    const createExplosion = (x, y, palette) => {
      const chosenPalette = palette || colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      const count = Math.floor(Math.random() * 35) + 45;
      for (let i = 0; i < count; i++) {
        const color = chosenPalette[Math.floor(Math.random() * chosenPalette.length)];
        particles.push(new Particle(x, y, color));
      }
    };

    // User click anywhere on page to trigger a cracker explosion!
    const handleClick = (e) => {
      createExplosion(e.clientX, e.clientY);
    };
    window.addEventListener('pointerdown', handleClick);

    const loop = (timestamp) => {
      // Create trailing light effect
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // Launch automated festive crackers periodically
      if (timestamp - lastLaunch > 1100) {
        rockets.push(new FireworkRocket());
        lastLaunch = timestamp;
      }

      // Update & draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.update();
        r.draw(ctx);
        if (r.exploded) {
          createExplosion(r.x, r.y, r.palette);
          rockets.splice(i, 1);
        }
      }

      // Update & draw cracker spark particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="festive-fireworks-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 5,
        opacity: 0.95
      }}
    />
  );
};

export default FireworksCanvas;
