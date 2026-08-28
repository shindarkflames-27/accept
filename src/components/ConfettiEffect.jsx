import React, { useEffect, useRef } from 'react';

const CLAY_COLORS = [
  '#c84060', '#e07890', '#f0b8a8', '#f5d0c0',
  '#d8b8a0', '#f0d8c8', '#e0c0b0', '#ffffff',
  '#d8a890', '#a07060',
];

export default function ConfettiEffect() {
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

    const particleCount = 120;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * -height * 0.5,
      size: Math.random() * 8 + 5,
      color: CLAY_COLORS[Math.floor(Math.random() * CLAY_COLORS.length)],
      speedY: Math.random() * 2.5 + 1.5,
      speedX: Math.random() * 1.5 - 0.75,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 5 - 2.5,
      shape: Math.random() > 0.55 ? 'heart' : Math.random() > 0.5 ? 'circle' : 'pill',
      opacity: Math.random() * 0.35 + 0.65,
    }));

    // Draw a soft 3D clay heart
    function drawClayHeart(ctx, x, y, size, color, rot, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.globalAlpha = opacity;

      // Shadow beneath
      ctx.fillStyle = 'rgba(180, 80, 120, 0.12)';
      ctx.beginPath();
      const s = size * 1.1;
      const tc = s * 0.3;
      ctx.moveTo(2, tc + 3);
      ctx.bezierCurveTo(2, 3, -s / 2 + 2, 3, -s / 2 + 2, tc + 3);
      ctx.bezierCurveTo(-s / 2 + 2, (s + tc) / 2 + 3, 2, (s + tc) / 2 + 5, 2, s + 3);
      ctx.bezierCurveTo(2, (s + tc) / 2 + 5, s / 2 + 2, (s + tc) / 2 + 3, s / 2 + 2, tc + 3);
      ctx.bezierCurveTo(s / 2 + 2, 3, 2, 3, 2, tc + 3);
      ctx.closePath();
      ctx.fill();

      // Main heart body
      const grad = ctx.createLinearGradient(-size / 2, 0, size / 2, size);
      grad.addColorStop(0, color);
      grad.addColorStop(1, darkenColor(color, 0.15));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, tc);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, tc);
      ctx.bezierCurveTo(-size / 2, (size + tc) / 2, 0, (size + tc) / 2 + 3, 0, size);
      ctx.bezierCurveTo(0, (size + tc) / 2 + 3, size / 2, (size + tc) / 2, size / 2, tc);
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, tc);
      ctx.closePath();
      ctx.fill();

      // Highlight
      ctx.globalAlpha = opacity * 0.45;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(-size * 0.15, tc * 0.7, size * 0.12, size * 0.07, -0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // Draw a soft 3D clay circle
    function drawClayCircle(ctx, x, y, size, color, rot, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.globalAlpha = opacity;

      // Shadow
      ctx.fillStyle = 'rgba(180, 80, 120, 0.1)';
      ctx.beginPath();
      ctx.arc(1.5, 2, size / 2, 0, Math.PI * 2);
      ctx.fill();

      // Body with gradient
      const grad = ctx.createRadialGradient(-size * 0.15, -size * 0.15, size * 0.05, 0, 0, size / 2);
      grad.addColorStop(0, lightenColor(color, 0.2));
      grad.addColorStop(1, color);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
      ctx.fill();

      // Highlight
      ctx.globalAlpha = opacity * 0.35;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(-size * 0.12, -size * 0.15, size * 0.14, size * 0.08, -0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // Draw a soft 3D clay pill
    function drawClayPill(ctx, x, y, size, color, rot, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.globalAlpha = opacity;

      const w = size * 1.2;
      const h = size * 0.55;
      const r = h / 2;

      // Shadow
      ctx.fillStyle = 'rgba(180, 80, 120, 0.1)';
      ctx.beginPath();
      ctx.roundRect(-w / 2 + 1.5, -h / 2 + 2, w, h, r);
      ctx.fill();

      // Body
      const grad = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
      grad.addColorStop(0, lightenColor(color, 0.15));
      grad.addColorStop(1, color);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, r);
      ctx.fill();

      // Highlight
      ctx.globalAlpha = opacity * 0.35;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(-w / 2 + 2, -h / 2 + 1, w * 0.5, h * 0.3, r * 0.5);
      ctx.fill();

      ctx.restore();
    }

    function lightenColor(hex, amount) {
      const num = parseInt(hex.replace('#', ''), 16);
      const r = Math.min(255, ((num >> 16) & 255) + Math.floor(255 * amount));
      const g = Math.min(255, ((num >> 8) & 255) + Math.floor(255 * amount));
      const b = Math.min(255, (num & 255) + Math.floor(255 * amount));
      return `rgb(${r},${g},${b})`;
    }

    function darkenColor(hex, amount) {
      const num = parseInt(hex.replace('#', ''), 16);
      const r = Math.max(0, ((num >> 16) & 255) - Math.floor(255 * amount));
      const g = Math.max(0, ((num >> 8) & 255) - Math.floor(255 * amount));
      const b = Math.max(0, (num & 255) - Math.floor(255 * amount));
      return `rgb(${r},${g},${b})`;
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.015) * 0.6;
        p.rotation += p.rotSpeed;

        if (p.shape === 'heart') {
          drawClayHeart(ctx, p.x, p.y, p.size * 1.3, p.color, p.rotation, p.opacity);
        } else if (p.shape === 'circle') {
          drawClayCircle(ctx, p.x, p.y, p.size, p.color, p.rotation, p.opacity);
        } else {
          drawClayPill(ctx, p.x, p.y, p.size, p.color, p.rotation, p.opacity);
        }

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />;
}
