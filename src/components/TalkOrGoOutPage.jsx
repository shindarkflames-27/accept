import React from 'react';
import TeddyBear from './TeddyBear';
import TextReveal from './TextReveal';

export default function TalkOrGoOutPage({ onSelectTalk, onSelectGoOut }) {
  return (
    <div className="clay-card">
      <div className="title-emoji">💕</div>

      <TextReveal
        text="Do you wanna talk or go out with me? 💕"
        className="card-title"
      />

      <TextReveal
        text="Maybe we could spend some time together? 🥹❤️"
        className="card-subtitle"
        as="p"
      />

      <div className="btn-group" style={{ flexWrap: 'wrap' }}>
        <button className="btn btn-clay btn-secondary" onClick={onSelectTalk} id="talk-btn">
          Talk 💬
        </button>
        <button className="btn btn-clay btn-accept" onClick={onSelectGoOut} id="go-out-btn">
          Go Out 💕
        </button>
      </div>

      <TeddyBear mood="heart" />
    </div>
  );
}
