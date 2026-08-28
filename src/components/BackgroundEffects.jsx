import React, { useMemo } from 'react';

const EMOJI_HEARTS = ['💖', '💗', '💕', '🩷', '❤️', '🩵'];

const BUBBLE_COLORS = [
  { color: '#f5d0c0', colorDark: '#d8b0a0' },
  { color: '#e8d0c0', colorDark: '#d0b8a8' },
  { color: '#f0d8c8', colorDark: '#d8c0a8' },
  { color: '#f8e0d0', colorDark: '#e0c8b0' },
];

export default function BackgroundEffects() {
  const hearts = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      emoji: EMOJI_HEARTS[i % EMOJI_HEARTS.length],
      left: `${(i * 6.5 + Math.random() * 4) % 92 + 3}%`,
      size: `${13 + Math.floor(Math.random() * 14)}px`,
      duration: `${9 + Math.floor(Math.random() * 10)}s`,
      delay: `${(Math.random() * 8).toFixed(1)}s`,
      drift: `${(Math.random() * 45 - 22).toFixed(0)}px`,
      rot: `${(Math.random() * 35 - 17).toFixed(0)}deg`,
      opacity: (0.25 + Math.random() * 0.3).toFixed(2),
    })), []);

  const bubbles = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => {
      const c = BUBBLE_COLORS[i % BUBBLE_COLORS.length];
      return {
        id: i,
        color: c.color,
        colorDark: c.colorDark,
        size: `${35 + Math.floor(Math.random() * 50)}px`,
        left: `${Math.floor(Math.random() * 88) + 5}%`,
        top: `${Math.floor(Math.random() * 80) + 5}%`,
        duration: `${10 + Math.floor(Math.random() * 8)}s`,
        delay: `${(Math.random() * 5).toFixed(1)}s`,
        driftY: `${(Math.random() * 30 - 15).toFixed(0)}px`,
        driftX: `${(Math.random() * 20 - 10).toFixed(0)}px`,
        driftY2: `${(Math.random() * 20 - 10).toFixed(0)}px`,
        driftX2: `${(Math.random() * 16 - 8).toFixed(0)}px`,
        opacity: (0.18 + Math.random() * 0.2).toFixed(2),
      };
    }), []);

  const sparkles = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      top: `${Math.floor(Math.random() * 90) + 4}%`,
      left: `${Math.floor(Math.random() * 90) + 4}%`,
      size: `${3 + Math.floor(Math.random() * 5)}px`,
      duration: `${2.5 + Math.random() * 3.5}s`,
      delay: `${(Math.random() * 6).toFixed(1)}s`,
    })), []);

  return (
    <>
      <div className="bg-dof" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
      </div>
      <div className="background-canvas" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={`h-${h.id}`}
          className="floating-heart"
          style={{
            left: h.left,
            '--size': h.size,
            '--duration': h.duration,
            '--delay': h.delay,
            '--drift': h.drift,
            '--rot': h.rot,
            '--opacity': h.opacity,
          }}
        >
          {h.emoji}
        </span>
      ))}

      {bubbles.map((b) => (
        <span
          key={`b-${b.id}`}
          className="clay-bubble"
          style={{
            left: b.left,
            top: b.top,
            '--size': b.size,
            '--color': b.color,
            '--color-dark': b.colorDark,
            '--duration': b.duration,
            '--delay': b.delay,
            '--drift-y': b.driftY,
            '--drift-x': b.driftX,
            '--drift-y2': b.driftY2,
            '--drift-x2': b.driftX2,
            '--opacity': b.opacity,
          }}
        />
      ))}

      {sparkles.map((s) => (
        <span
          key={`s-${s.id}`}
          className="sparkle-dot"
          style={{
            top: s.top,
            left: s.left,
            '--size': s.size,
            '--duration': s.duration,
            '--delay': s.delay,
          }}
        />
      ))}
      </div>
    </>
  );
}
