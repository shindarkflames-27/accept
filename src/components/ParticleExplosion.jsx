import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';

gsap.registerPlugin(Physics2DPlugin);

const emitterSize = 100;
const dotQuantity = 25;
const dotSizeMax = 20;
const dotSizeMin = 10;
const speed = 3;
const gravity = 3;

function createExplosion(container) {
  const tl = gsap.timeline();
  for (let i = 0; i < dotQuantity; i++) {
    const dot = document.createElement('div');
    dot.className = 'pop-dot';
    const size = gsap.utils.random(dotSizeMin, dotSizeMax, 1);
    container.appendChild(dot);

    const angle = Math.random() * Math.PI * 2;
    const length = Math.random() * (emitterSize / 2 - size / 2);

    gsap.set(dot, {
      x: Math.cos(angle) * length,
      y: Math.sin(angle) * length,
      width: size,
      height: size,
      xPercent: -50,
      yPercent: -50,
      force3D: true,
    });

    tl.to(
      dot,
      {
        physics2D: {
          angle: (angle * 180) / Math.PI,
          velocity: (100 + Math.random() * 250) * speed,
          gravity: 500 * gravity,
        },
        duration: 1 + Math.random(),
      },
      0
    ).to(
      dot,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      },
      0.7
    );
  }
  return tl;
}

export default function ParticleExplosion() {
  const containerRef = useRef(null);
  const explosionRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const explosion = createExplosion(container);
    explosionRef.current = explosion;

    function explodeAt(x, y) {
      gsap.set(container, { x, y });
      explosion.play(0);
    }

    function onClick(e) {
      explodeAt(e.clientX, e.clientY);
    }

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pop-emitter"
      aria-hidden="true"
    />
  );
}
