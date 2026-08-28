import React from 'react';
import TeddyBear from './TeddyBear';
import TextReveal from './TextReveal';

export default function NoPage({ onThinkAgain, onBeFriends }) {
  return (
    <div className="clay-card letter-card-container">
      <div className="letter-scroll-area">
        <div style={{ textAlign: 'center', marginBottom: '6px' }}>
          <div className="title-emoji">🥺💔</div>

          <TextReveal
            text="Wait... You really said NO? 😭"
            className="card-title"
            style={{ fontSize: '1.7rem' }}
          />

          <TeddyBear mood="broken-heart" />
        </div>

        <div className="letter-paper clay-inset">
          <div className="letter-stamp">💌</div>

          <TextReveal
            text="To someone really special 💌"
            className="letter-header"
            as="h2"
          />

          <div className="letter-body">
            <TextReveal text="Hey... 🥺❤️" as="p" />
            <TextReveal text="I understand that your answer is no, and that's completely okay." as="p" />
            <TextReveal text="I just wanted to be honest about how I feel. I really enjoy talking with you and spending time with you, and I think you're a really special person. 💗" as="p" />
            <TextReveal text="I don't want you to feel pressured at all. Your feelings matter, and I'll respect whatever you choose." as="p" />
            <TextReveal text="So maybe we can still stay friends? 🫶" as="p" />
            <TextReveal text="And who knows... maybe we can talk, hang out, or just spend some time together sometime. 😊❤️" as="p" />
            <div className="letter-signature">
              <TextReveal
                text="— From someone who enjoys your company ❤️"
                as="div"
              />
            </div>
          </div>
        </div>

        <div className="btn-group" style={{ marginTop: '16px', marginBottom: '8px' }}>
          <button className="btn btn-clay btn-accept" onClick={onThinkAgain} id="think-again-btn">
            Okay, I'll think again 💕
          </button>
          <button className="btn btn-clay btn-secondary" onClick={onBeFriends} id="be-friends-btn">
            Can we be friends? 🫶
          </button>
        </div>
      </div>
    </div>
  );
}
