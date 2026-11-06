import React, { useEffect, useRef } from 'react';

/**
 * Lightweight Festive Crackers Canvas meant exclusively for the Loading Screen.
 * Automatically halts when loading finishes to ensure zero CPU/GPU overhead on the website.
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

    const colorPalettes = [
      ['#fef08a', '#facc15', '#f59e0b', '#fb923c'], // Golden sparkle
      ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3'], // Rose burst
      ['#38bdf8', '#0ea5e9', '#0284c7', '#bae6fd'], // Sky cyan
      ['#a855f7', '#c084fc', '#d8b4fe', '#f3e8ff'], // Royal purple
      ['#4ade80', '#22c55e', '#86efac', '#dcfce7']  // Emerald green
    ];

    class SparkParticle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1.2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.friction = 0.95;
        this.gravity = 0.08;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.radius = Math.random() * 2 + 1;
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
        context.shadowBlur = 8;
        context.fill();
        context.restore();
      }
    }

    let particles = [];
    let lastBurst = 0;

    const burst = (x, y) => {
      const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      const count = 30;
      for (let i = 0; i < count; i++) {
        const color = palette[Math.floor(Math.random() * palette.length)];
        particles.push(new SparkParticle(x, y, color));
      }
    };

    // Initial festive bursts on show
    burst(width * 0.25, height * 0.35);
    burst(width * 0.75, height * 0.35);

    const loop = (timestamp) => {
      ctx.clearRect(0, 0, width, height);

      // Periodically burst a celebration cracker on left/right edges
      if (timestamp - lastBurst > 550) {
        const rx = Math.random() > 0.5 ? Math.random() * (width * 0.3) + width * 0.05 : Math.random() * (width * 0.3) + width * 0.65;
        const ry = Math.random() * (height * 0.5) + height * 0.15;
        burst(rx, ry);
        lastBurst = timestamp;
      }

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
