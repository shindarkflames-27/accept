import React from 'react';
import TeddyBear from './TeddyBear';
import TextReveal from './TextReveal';

export default function TalkPage({ onContinue }) {
  return (
    <div className="clay-card">
      <div className="title-emoji">💬</div>

      <TextReveal text="Let's Talk 💬❤️" className="card-title" />

      <TextReveal
        text="Tell me what you wanna talk about 😊"
        className="card-subtitle"
        as="p"
      />

      <div style={{ margin: '24px 0' }}>
        <button className="btn btn-clay btn-accept" onClick={onContinue} id="talk-continue-btn">
          Continue 💕
        </button>
      </div>

      <TeddyBear mood="heart" />
    </div>
  );
}
