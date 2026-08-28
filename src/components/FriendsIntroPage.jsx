import React from 'react';
import TeddyBear from './TeddyBear';
import TextReveal from './TextReveal';

export default function FriendsIntroPage({ onTalk, onGoOut }) {
  return (
    <div className="clay-card">
      <div className="title-emoji">🫶💗</div>

      <TextReveal
        text="Of course! 🫶💗"
        className="card-title title-romantic"
        style={{ fontSize: '2rem' }}
      />

      <TextReveal
        text="Then let's start with a conversation 😊"
        className="card-subtitle"
        as="p"
      />

      <div className="btn-group" style={{ flexWrap: 'wrap' }}>
        <button className="btn btn-clay btn-secondary" onClick={onTalk} id="friend-talk-btn">
          Talk 💬
        </button>
        <button className="btn btn-clay btn-accept" onClick={onGoOut} id="friend-go-out-btn">
          Can we go out? 🌸
        </button>
      </div>

      <TeddyBear mood="heart" />
    </div>
  );
}
