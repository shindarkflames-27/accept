import React from 'react';
import TeddyBear from './TeddyBear';
import TextReveal from './TextReveal';

export default function FriendsTalkFinalPage({ onRestart }) {
  return (
    <div className="clay-card">
      <div className="title-emoji">💬💖</div>

      <TextReveal
        text="Let's Talk! 💬❤️"
        className="card-title title-romantic"
        style={{ fontSize: '2rem' }}
      />

      <TextReveal
        text="Looking forward to talking with you 😊"
        className="card-subtitle"
        as="p"
      />

      <div style={{ margin: '10px 0 18px 0' }}>
        <TeddyBear mood="happy" />
      </div>

      <div>
        <button className="btn btn-clay btn-secondary" onClick={onRestart} id="friend-talk-restart-btn">
          Start Again 💕
        </button>
      </div>
    </div>
  );
}
