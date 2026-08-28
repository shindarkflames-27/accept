import React from 'react';
import TeddyBear from './TeddyBear';
import TextReveal from './TextReveal';

export default function FriendsTalkPage({ onContinue }) {
  return (
    <div className="clay-card">
      <div className="title-emoji">💬</div>

      <TextReveal
        text="Let's Talk 💬❤️"
        className="card-title"
      />

      <TextReveal
        text="I'm always happy to have a nice conversation 😊"
        className="card-subtitle"
        as="p"
      />

      <div className="talk-bubbles" aria-hidden="true">
        <span className="talk-bubble">Hi! 🥰</span>
        <span className="talk-bubble talk-bubble-alt">Hey you 💗</span>
        <span className="talk-bubble">How's your day? 😊</span>
      </div>

      <div style={{ margin: '18px 0' }}>
        <button className="btn btn-clay btn-accept" onClick={onContinue} id="friend-talk-ok-btn">
          Okay 💕
        </button>
      </div>

      <TeddyBear mood="heart" />
    </div>
  );
}
