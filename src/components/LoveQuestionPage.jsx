import React from 'react';
import TeddyBear from './TeddyBear';
import TextReveal from './TextReveal';

export default function LoveQuestionPage({ noCount, onNoClick, onYesClick }) {
  let reactionMessage = '';
  if (noCount === 1) reactionMessage = 'Are you serious? 🥺';
  else if (noCount === 2) reactionMessage = 'Really? 😭';

  const yesScale = 1 + noCount * 0.28;

  return (
    <div className="clay-card">
      <div className="title-emoji">💖</div>

      <TextReveal text="Do you love me? 💗" className="card-title" />

      {reactionMessage && (
        <TextReveal text={reactionMessage} className="reaction-text" as="div" />
      )}

      <div
        className="btn-group"
        style={{ minHeight: '80px', alignItems: 'center', gap: `${18 + noCount * 12}px` }}
      >
        <button
          className="btn btn-clay btn-accept"
          onClick={onYesClick}
          style={{
            transform: `scale(${yesScale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: 5,
          }}
          id="yes-btn"
        >
          Yes ❤️
        </button>

        <button
          className="btn btn-clay btn-reject"
          onClick={onNoClick}
          id="no-btn"
        >
          No 😭
        </button>
      </div>

      <TeddyBear mood={noCount > 0 ? 'sad' : 'heart'} />
    </div>
  );
}
