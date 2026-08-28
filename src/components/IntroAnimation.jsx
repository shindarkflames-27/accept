import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText, ScrollTrigger);

/**
 * IntroAnimation — exact user-provided horizontal scroll text animation.
 * Uses SplitText + ScrollTrigger with pin and containerAnimation.
 */
export default function IntroAnimation({ onComplete }) {
  const wrapperRef = useRef(null);
  const hintRef = useRef(null);
  const finishedRef = useRef(false);
  const splitRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const hint = hintRef.current;
    const text = wrapper.querySelector('.Horizontal__text');

    // Animate scroll hint: fade in, then fade out on first scroll
    if (hint) {
      gsap.fromTo(hint, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power2.out' });

      const hideHint = () => {
        gsap.to(hint, { opacity: 0, y: -10, duration: 0.4, ease: 'power2.in' });
        window.removeEventListener('scroll', hideHint);
      };
      window.addEventListener('scroll', hideHint, { passive: true });
    }

    const split = SplitText.create('.Horizontal__text', { type: 'chars, words' });
    splitRef.current = split;

    const scrollTween = gsap.to(text, {
      xPercent: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        end: '+=5000px',
        scrub: true,
        onUpdate: (self) => {
          if (self.progress >= 0.95 && !finishedRef.current) {
            finishedRef.current = true;

            // Revert SplitText and kill ScrollTriggers BEFORE React unmounts
            split.revert();
            ScrollTrigger.getAll().forEach((st) => st.kill());

            gsap.to(wrapper, {
              opacity: 0,
              duration: 0.6,
              ease: 'power2.inOut',
              onComplete: () => {
                window.scrollTo(0, 0);
                onComplete?.();
              },
            });
          }
        },
      },
    });

    split.chars.forEach((char) => {
      gsap.from(char, {
        yPercent: 'random(-200, 200)',
        rotation: 'random(-20, 20)',
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: char,
          containerAnimation: scrollTween,
          start: 'left 100%',
          end: 'left 30%',
          scrub: 1,
        },
      });
    });

    return () => {
      splitRef.current?.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(wrapper);
      gsap.killTweensOf(text);
      if (hint) gsap.killTweensOf(hint);
    };
  }, [onComplete]);

  return (
    <section ref={wrapperRef} className="Horizontal">
      <div className="container">
        <h3 className="Horizontal__text heading-xl">
          Hi, I am Shashir. This is for you 💕
        </h3>
      </div>
      <div ref={hintRef} className="scroll-hint">
        <span className="scroll-hint-text">Scroll Down</span>
        <span className="scroll-hint-arrow">↓</span>
      </div>
    </section>
  );
}
