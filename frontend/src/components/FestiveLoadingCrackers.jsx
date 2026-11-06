import React, { useEffect, useRef } from 'react';

/**
 * High-Density Realistic 3D Crackers Explosion Canvas for Diwali Loading Screen.
 * Features aerial multi-stage rocket bursts, golden sparkling showers,
 * colorful blooming willow shells, and light flashes.
 */
const FestiveLoadingCrackers = () => {
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

    // Multi-color realistic cracker palettes
    const crackerPalettes = [
      ['#fde047', '#eab308', '#ca8a04', '#fffbeb'], // Golden Diya Sparklers
      ['#fb923c', '#ea580c', '#c2410c', '#fff7ed'], // Fiery Orange Anar
      ['#38bdf8', '#0284c7', '#0369a1', '#f0f9ff'], // Electric Cyan Rocket
      ['#f43f5e', '#e11d48', '#be123c', '#ffe4e6'], // Ruby Chakri
      ['#a855f7', '#9333ea', '#7e22ce', '#faf5ff'], // Royal Purple Sparkler
      ['#4ade80', '#22c55e', '#16a34a', '#f0fdf4']  // Emerald Green Flash
    ];

    class SparkParticle {
      constructor(x, y, color, isHeavy = false) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (isHeavy ? 6.5 : 4.5) + 1.2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.friction = 0.955;
        this.gravity = 0.08;
        this.alpha = 1;
        this.decay = Math.random() * 0.018 + 0.012;
        this.radius = Math.random() * 2.8 + 1.2;
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
        context.shadowColor = this.color;
        context.shadowBlur = 12;
        context.fill();
        context.restore();
      }
    }

    class Rocket {
      constructor() {
        this.x = Math.random() * (width * 0.8) + width * 0.1;
        this.y = height + 10;
        this.targetY = Math.random() * (height * 0.55) + height * 0.1;
        this.speed = Math.random() * 3 + 9;
        this.palette = crackerPalettes[Math.floor(Math.random() * crackerPalettes.length)];
        this.exploded = false;
      }

      update() {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
          this.exploded = true;
        }
      }

      draw(context) {
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        context.fillStyle = '#fef08a';
        context.shadowColor = '#facc15';
        context.shadowBlur = 14;
        context.fill();
        context.restore();
      }
    }

    let particles = [];
    let rockets = [];
    let lastRocketTime = 0;

    const burst = (x, y, palette) => {
      const colors = palette || crackerPalettes[Math.floor(Math.random() * crackerPalettes.length)];
      const count = Math.floor(Math.random() * 30) + 40;
      for (let i = 0; i < count; i++) {
        const c = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new SparkParticle(x, y, c, Math.random() > 0.5));
      }
    };

    // Instant welcoming bursts across screen
    burst(width * 0.2, height * 0.3);
    burst(width * 0.8, height * 0.3);
    burst(width * 0.5, height * 0.25);

    const loop = (timestamp) => {
      ctx.clearRect(0, 0, width, height);

      // Launch aerial cracker rockets continuously
      if (timestamp - lastRocketTime > 380) {
        rockets.push(new Rocket());
        lastRocketTime = timestamp;
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.update();
        r.draw(ctx);
        if (r.exploded) {
          burst(r.x, r.y, r.palette);
          rockets.splice(i, 1);
        }
      }

      // Update explosion particles
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
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default FestiveLoadingCrackers;
