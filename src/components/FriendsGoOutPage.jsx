import React, { useState } from 'react';
import TeddyBear from './TeddyBear';
import TextReveal from './TextReveal';

const ACTIVITIES = [
  { id: 'movie', icon: '🎬', title: 'MOVIE', desc: 'Watch a movie together', reaction: 'Movie it is! 🎬🍿❤️', planName: '🎬 Movie' },
  { id: 'mall', icon: '🛍️', title: 'MALL', desc: 'Go shopping / hang out at the mall', reaction: 'Mall it is! 🛍️💕', planName: '🛍️ Mall' },
  { id: 'talk', icon: '💬', title: 'JUST TALK', desc: 'Just sit and talk', reaction: 'Just talking sounds nice 💬❤️', planName: '💬 Just Talk' },
  { id: 'park', icon: '🌳', title: 'PARK', desc: 'Go for a peaceful walk', reaction: 'Park it is! 🌳💗', planName: '🌳 Park' },
];

export default function FriendsGoOutPage({ onConfirmActivity }) {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleCardClick = (activity) => setSelectedActivity(activity);
  const handleConfirm = () => {
    if (selectedActivity) onConfirmActivity(selectedActivity.planName);
  };

  return (
    <div className="clay-card" style={{ maxWidth: '620px' }}>
      <div className="title-emoji">🌸💗</div>

      <TextReveal
        text="Sure! Let's go out sometime 🌸💗"
        className="card-title title-romantic"
        style={{ fontSize: '1.9rem' }}
      />

      <TextReveal
        text="What would you like to do?"
        className="card-subtitle"
        as="p"
      />

      <div className="activities-grid">
        {ACTIVITIES.map((act) => {
          const isSelected = selectedActivity?.id === act.id;
          return (
            <div
              key={act.id}
              className={`clay-activity ${isSelected ? 'selected' : ''}`}
              onClick={() => handleCardClick(act)}
              id={`friend-activity-${act.id}`}
            >
              <div className="activity-icon">{act.icon}</div>
              <div>
                <div className="activity-name">{act.title}</div>
                <div className="activity-desc">{act.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedActivity && (
        <div className="activity-selected-banner clay-inset-small">
          {selectedActivity.reaction}
        </div>
      )}

      {selectedActivity && (
        <div style={{ marginTop: '14px' }}>
          <button className="btn btn-clay btn-accept" onClick={handleConfirm} id="friend-sounds-good-btn">
            Sounds Good! 💕
          </button>
        </div>
      )}

      <div style={{ marginTop: '16px' }}>
        <TeddyBear mood="heart" />
      </div>
    </div>
  );
}
