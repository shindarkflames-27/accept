import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FLAIR_SRCS = [
  'https://assets.codepen.io/16327/Revised+Flair.png',
  'https://assets.codepen.io/16327/Revised+Flair-1.png',
  'https://assets.codepen.io/16327/Revised+Flair-2.png',
  'https://assets.codepen.io/16327/Revised+Flair-3.png',
  'https://assets.codepen.io/16327/Revised+Flair-4.png',
  'https://assets.codepen.io/16327/Revised+Flair-5.png',
  'https://assets.codepen.io/16327/Revised+Flair-6.png',
  'https://assets.codepen.io/16327/Revised+Flair-7.png',
  'https://assets.codepen.io/16327/Revised+Flair-8.png',
];

export default function FlairCursor() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const images = Array.from(wrap.querySelectorAll('.flair'));
    let index = 0;
    const wrappedIndex = gsap.utils.wrap(0, images.length);
    let lastMousePos = { x: 0, y: 0 };
    let cachedMousePos = { x: 0, y: 0 };
    const gap = 100;

    function playAnimation(shape) {
      const tl = gsap.timeline();
      tl.from(shape, {
        opacity: 0,
        scale: 0,
        ease: 'elastic.out(1,0.3)',
      })
        .to(shape, {
          rotation: 'random([-360, 360])',
        }, '<')
        .to(shape, {
          y: '120vh',
          ease: 'back.in(.4)',
          duration: 1,
        }, 0);
    }

    function animateImage(mousePos) {
      const img = images[wrappedIndex(index)];
      gsap.killTweensOf(img);
      gsap.set(img, { clearProps: 'all' });
      gsap.set(img, {
        opacity: 1,
        left: mousePos.x,
        top: mousePos.y,
        xPercent: -50,
        yPercent: -50,
      });
      playAnimation(img);
      index++;
    }

    const onMove = (e) => {
      const mousePos = { x: e.clientX, y: e.clientY };
      const travelDistance = Math.hypot(
        lastMousePos.x - mousePos.x,
        lastMousePos.y - mousePos.y
      );
      if (travelDistance > gap) {
        animateImage(mousePos);
        lastMousePos = mousePos;
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Double the set so the trail wraps smoothly with 18 images.
  const srcs = [...FLAIR_SRCS, ...FLAIR_SRCS];

  return (
    <div ref={wrapRef} className="flair-wrap" aria-hidden="true">
      {srcs.map((src, i) => (
        <img key={i} className="flair" src={src} alt="" draggable="false" />
      ))}
    </div>
  );
}
