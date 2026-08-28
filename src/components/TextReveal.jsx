import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * TextReveal — splits text into individual characters and animates them
 * with the 3D flip-in effect (opacity:0 → 1, scale:0 → 1, y:80 → 0,
 * rotationX:180 → 0). Reverts split after animation completes.
 *
 * No GSAP SplitText plugin needed — pure React char splitting.
 */
export default function TextReveal({
  text,
  className = '',
  as: Component = 'h1',
  id,
  trigger = 'mount',   // 'mount' | 'hover' | 'click'
  onRef,               // optional ref callback
  style,
}) {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('.char');
    if (!chars.length) return;

    // Reset initial state
    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(chars, {
      opacity: 0,
      scale: 0,
      y: 80,
      rotationX: 180,
      transformOrigin: '0% 50% -50px',
    });

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        duration: 1,
        opacity: 1,
        scale: 1,
        y: 0,
        rotationX: 0,
        ease: 'back.out(1.7)',
        stagger: 0.05,
        delay: 0.15,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  // Split text into character spans, preserving spaces and emojis
  const words = text.split(' ');

  return (
    <Component
      ref={(el) => {
        containerRef.current = el;
        if (onRef) onRef(el);
      }}
      className={`text-reveal-container ${className}`}
      id={id}
      style={style}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {Array.from(word).map((char, ci) => (
            <span
              key={ci}
              className="char"
              style={{
                display: 'inline-block',
                willChange: 'transform, opacity',
                transformStyle: 'preserve-3d',
              }}
              aria-hidden="true"
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span className="char-space" style={{ display: 'inline-block', width: '0.3em' }}>
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </Component>
  );
}
