import React from 'react';

/**
 * 3D Clay-style Teddy Bear — soft rounded figure with clay shading.
 * Supports moods: 'heart' | 'sad' | 'flowers' | 'happy'
 */
export default function TeddyBear({ mood = 'heart', className = '' }) {
  const isSad = mood === 'sad' || mood === 'broken-heart';
  const isFlowers = mood === 'flowers';
  const isHappy = mood === 'happy' || mood === 'celebrate';

  return (
    <div className={`teddy-container ${className}`}>
      <svg
        viewBox="0 0 160 160"
        className={`teddy-svg ${isSad ? 'sad' : isHappy ? 'happy' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Clay Fur — warm pastel with 3D radial highlight */}
          <radialGradient id="bearFur" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#fce4d0" />
            <stop offset="40%" stopColor="#f0c8a8" />
            <stop offset="80%" stopColor="#dba880" />
            <stop offset="100%" stopColor="#c89068" />
          </radialGradient>

          {/* Clay Fur Shadow side */}
          <radialGradient id="bearFurShadow" cx="65%" cy="65%" r="60%">
            <stop offset="0%" stopColor="rgba(200,130,90,0)" />
            <stop offset="100%" stopColor="rgba(160,80,50,0.15)" />
          </radialGradient>

          {/* Inner Ear / Paw pads — soft pink clay */}
          <linearGradient id="innerPink" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffd6e3" />
            <stop offset="100%" stopColor="#ffb8cc" />
          </linearGradient>

          {/* Snout — cream clay */}
          <linearGradient id="snoutCream" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fffaf5" />
            <stop offset="100%" stopColor="#fce8d8" />
          </linearGradient>

          {/* Heart — pink clay */}
          <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8faa" />
            <stop offset="100%" stopColor="#e8507a" />
          </linearGradient>

          {/* Leaf — green clay */}
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a8e8c0" />
            <stop offset="100%" stopColor="#70c890" />
          </linearGradient>
        </defs>

        {/* ─── EARS ─── */}
        <circle cx="44" cy="46" r="22" fill="url(#bearFur)" stroke="#c89870" strokeWidth="1.8" />
        <circle cx="44" cy="46" r="22" fill="url(#bearFurShadow)" />
        <circle cx="44" cy="46" r="13" fill="url(#innerPink)" />

        <circle cx="116" cy="46" r="22" fill="url(#bearFur)" stroke="#c89870" strokeWidth="1.8" />
        <circle cx="116" cy="46" r="22" fill="url(#bearFurShadow)" />
        <circle cx="116" cy="46" r="13" fill="url(#innerPink)" />

        {/* ─── LEGS / FEET ─── */}
        <circle cx="50" cy="132" r="17" fill="url(#bearFur)" stroke="#c89870" strokeWidth="1.8" />
        <circle cx="50" cy="132" r="17" fill="url(#bearFurShadow)" />
        <ellipse cx="50" cy="132" rx="9" ry="8" fill="url(#innerPink)" />
        <circle cx="110" cy="132" r="17" fill="url(#bearFur)" stroke="#c89870" strokeWidth="1.8" />
        <circle cx="110" cy="132" r="17" fill="url(#bearFurShadow)" />
        <ellipse cx="110" cy="132" rx="9" ry="8" fill="url(#innerPink)" />

        {/* ─── BODY ─── */}
        <ellipse cx="80" cy="108" rx="42" ry="38" fill="url(#bearFur)" stroke="#c89870" strokeWidth="1.8" />
        <ellipse cx="80" cy="108" rx="42" ry="38" fill="url(#bearFurShadow)" />
        {/* Tummy */}
        <ellipse cx="80" cy="112" rx="25" ry="21" fill="url(#snoutCream)" opacity="0.92" />

        {/* ─── HEAD ─── */}
        <circle cx="80" cy="68" r="38" fill="url(#bearFur)" stroke="#c89870" strokeWidth="1.8" />
        <circle cx="80" cy="68" r="38" fill="url(#bearFurShadow)" />

        {/* Snout */}
        <ellipse cx="80" cy="76" rx="19" ry="14" fill="url(#snoutCream)" />
        {/* Nose */}
        <ellipse cx="80" cy="70" rx="5.5" ry="4" fill="#5c3520" />

        {/* Mouth */}
        {isSad ? (
          <path d="M74,83 Q80,78 86,83" fill="none" stroke="#5c3520" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <path d="M74,78 Q80,85 86,78" fill="none" stroke="#5c3520" strokeWidth="2" strokeLinecap="round" />
        )}

        {/* ─── EYES ─── */}
        {isSad ? (
          <>
            <ellipse cx="64" cy="62" rx="5" ry="6" fill="#381d08" />
            <circle cx="62" cy="60" r="2" fill="#ffffff" />
            <ellipse cx="96" cy="62" rx="5" ry="6" fill="#381d08" />
            <circle cx="94" cy="60" r="2" fill="#ffffff" />
            {/* Tears */}
            <path d="M60,67 C59,71 63,73 63,70 C63,68 60,67 60,67 Z" fill="#90caf9" />
            <path d="M98,67 C97,71 101,73 101,70 C101,68 98,67 98,67 Z" fill="#90caf9" />
            {/* Sad brows */}
            <path d="M57,53 Q64,56 69,52" fill="none" stroke="#8d6040" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M91,52 Q96,56 103,53" fill="none" stroke="#8d6040" strokeWidth="1.8" strokeLinecap="round" />
          </>
        ) : isHappy ? (
          <>
            <path d="M59,62 Q65,55 71,62" fill="none" stroke="#381d08" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M89,62 Q95,55 101,62" fill="none" stroke="#381d08" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Sparkly clay eyes */}
            <ellipse cx="64" cy="62" rx="5" ry="6" fill="#381d08" />
            <circle cx="62.5" cy="59.5" r="2.5" fill="#ffffff" />
            <circle cx="65.5" cy="64.5" r="1.2" fill="#ffffff" />
            <ellipse cx="96" cy="62" rx="5" ry="6" fill="#381d08" />
            <circle cx="94.5" cy="59.5" r="2.5" fill="#ffffff" />
            <circle cx="97.5" cy="64.5" r="1.2" fill="#ffffff" />
          </>
        )}

        {/* Blush cheeks — clay pink */}
        <ellipse cx="56" cy="72" rx="7" ry="4.5" fill="#ffaec5" opacity={isSad ? 0.3 : 0.55} />
        <ellipse cx="104" cy="72" rx="7" ry="4.5" fill="#ffaec5" opacity={isSad ? 0.3 : 0.55} />

        {/* ─── ARMS & ACCESSORIES ─── */}
        {isSad ? (
          <>
            {/* Broken heart */}
            <g transform="translate(80, 105) scale(0.9) translate(-25, -25)">
              <path
                d="M25,40 C15,30 5,20 5,10 C5,3 12,0 18,3 C22,5 24,10 25,12 L25,18 L21,22 L26,27 L22,32 L25,40 Z"
                fill="url(#heartGrad)"
                stroke="#c85080"
                strokeWidth="1.2"
              />
              <path
                d="M27,40 C37,30 47,20 47,10 C47,3 40,0 34,3 C30,5 28,10 27,12 L27,18 L23,22 L28,27 L24,32 L27,40 Z"
                fill="url(#heartGrad)"
                stroke="#c85080"
                strokeWidth="1.2"
              />
            </g>
            <ellipse cx="44" cy="102" rx="12" ry="9" fill="url(#bearFur)" stroke="#c89870" strokeWidth="1.8" transform="rotate(-20 44 102)" />
            <ellipse cx="116" cy="102" rx="12" ry="9" fill="url(#bearFur)" stroke="#c89870" strokeWidth="1.8" transform="rotate(20 116 102)" />
          </>
        ) : isFlowers ? (
          <>
            {/* Flower bouquet */}
            <g transform="translate(80, 104) scale(0.95) translate(-30, -30)">
              <path d="M20,40 Q10,30 24,24 Q30,35 20,40 Z" fill="url(#leafGrad)" />
              <path d="M40,40 Q50,30 36,24 Q30,35 40,40 Z" fill="url(#leafGrad)" />
              <polygon points="18,48 42,48 30,62" fill="#ffb8cc" stroke="#f0a0b8" strokeWidth="1.2" />
              <circle cx="22" cy="30" r="9" fill="#ff8faa" />
              <circle cx="22" cy="30" r="5" fill="#ffaec5" />
              <circle cx="38" cy="30" r="9" fill="#ff8faa" />
              <circle cx="38" cy="30" r="5" fill="#ffaec5" />
              <circle cx="30" cy="20" r="11" fill="#e8507a" />
              <circle cx="30" cy="20" r="6.5" fill="#ff6b8a" />
              <path d="M30,8 C27,4 23,6 23,9 C23,13 30,17 30,17 C30,17 37,13 37,9 C37,6 33,4 30,8 Z" fill="#ffffff" opacity="0.85" />
            </g>
            <circle cx="48" cy="104" r="10" fill="url(#bearFur)" stroke="#c89870" strokeWidth="1.8" />
            <circle cx="112" cy="104" r="10" fill="url(#bearFur)" stroke="#c89870" strokeWidth="1.8" />
          </>
        ) : (
          <>
            {/* Clay heart */}
            <g transform="translate(80, 105) scale(0.95) translate(-25, -25)">
              <path
                d="M25,44 C12,32 0,22 0,11 C0,4 6,0 12.5,0 C18,0 22.5,4 25,7.5 C27.5,4 32,0 37.5,0 C44,0 50,4 50,11 C50,22 38,32 25,44 Z"
                fill="url(#heartGrad)"
                stroke="#c85080"
                strokeWidth="1.2"
              />
              {/* Clay highlight */}
              <ellipse cx="12" cy="9" rx="5" ry="2.5" fill="#ffffff" opacity="0.5" transform="rotate(-30 12 9)" />
            </g>
            <circle cx="50" cy="104" r="10" fill="url(#bearFur)" stroke="#c89870" strokeWidth="1.8" />
            <circle cx="110" cy="104" r="10" fill="url(#bearFur)" stroke="#c89870" strokeWidth="1.8" />
          </>
        )}
      </svg>
    </div>
  );
}
