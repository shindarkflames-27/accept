import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import TeddyBear from './TeddyBear';
import TextReveal from './TextReveal';

export default function ProposalPage({ onAccept }) {
  const [rejectPos, setRejectPos] = useState({ isEscaped: false, top: 0, left: 0, rot: 0 });
  const acceptBtnRef = useRef(null);
  const rejectBtnRef = useRef(null);

  const moveRejectButton = (e) => {
    const btn = rejectBtnRef.current;
    if (!btn) return;

    const btnWidth = btn.offsetWidth || 130;
    const btnHeight = btn.offsetHeight || 50;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const padding = 20;
    const mouseX = e?.clientX ?? -999;
    const mouseY = e?.clientY ?? -999;
    let newLeft, newTop, attempts = 0;

    do {
      newLeft = Math.floor(Math.random() * (screenWidth - btnWidth - padding * 2)) + padding;
      newTop = Math.floor(Math.random() * (screenHeight - btnHeight - padding * 2)) + padding;
      attempts++;

      const distToCursor = Math.hypot(mouseX - (newLeft + btnWidth / 2), mouseY - (newTop + btnHeight / 2));
      const farFromCursor = distToCursor > 100;

      let overlapAccept = false;
      if (acceptBtnRef.current) {
        const acceptRect = acceptBtnRef.current.getBoundingClientRect();
        overlapAccept = newLeft < acceptRect.right + 30 && newLeft + btnWidth + 30 > acceptRect.left &&
          newTop < acceptRect.bottom + 30 && newTop + btnHeight + 30 > acceptRect.top;
      }

      if (farFromCursor && !overlapAccept) break;
    } while (attempts < 40);

    newLeft = Math.max(padding, Math.min(newLeft, screenWidth - btnWidth - padding));
    newTop = Math.max(padding, Math.min(newTop, screenHeight - btnHeight - padding));

    const newRot = (Math.random() * 24 - 12).toFixed(1);
    setRejectPos({ isEscaped: true, left: newLeft, top: newTop, rot: newRot });
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!rejectBtnRef.current || !rejectPos.isEscaped) return;
      const rect = rejectBtnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      if (dist < 90) moveRejectButton(e);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [rejectPos.isEscaped]);

  const rejectButton = (
    <button
      ref={rejectBtnRef}
      className="btn btn-reject reject-escaped-fullscreen"
      style={{
        position: 'fixed',
        left: `${rejectPos.left}px`,
        top: `${rejectPos.top}px`,
        transform: `rotate(${rejectPos.rot}deg)`,
        zIndex: 9999,
      }}
      onMouseEnter={(e) => moveRejectButton(e)}
      onTouchStart={(e) => { e.preventDefault(); moveRejectButton(e); }}
      onClick={(e) => { e.preventDefault(); moveRejectButton(e); }}
    >
      Reject 😭
    </button>
  );

  return (
    <div className="clay-card proposal-card">
      <div className="title-emoji">💗</div>

      <TextReveal text="I Love You ❤️" className="card-title" />

      <TextReveal
        text="Will you accept my little confession? 🥹"
        className="card-subtitle"
        as="p"
      />

      <div className="btn-group">
        <button
          ref={acceptBtnRef}
          className="btn btn-clay btn-accept"
          onClick={onAccept}
          id="accept-btn"
        >
          Accept 💕
        </button>

        {!rejectPos.isEscaped && (
          <button
            ref={rejectBtnRef}
            className="btn btn-clay btn-reject"
            onMouseEnter={(e) => moveRejectButton(e)}
            onTouchStart={(e) => { e.preventDefault(); moveRejectButton(e); }}
            onClick={(e) => { e.preventDefault(); moveRejectButton(e); }}
          >
            Reject 😭
          </button>
        )}
      </div>

      {rejectPos.isEscaped && createPortal(rejectButton, document.body)}

      <TeddyBear mood="heart" />
    </div>
  );
}
