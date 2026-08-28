import React from 'react';
import TeddyBear from './TeddyBear';
import TextReveal from './TextReveal';

export default function IntroPage({ onStart }) {
  return (
    <div className="clay-card intro-card">
      <TextReveal
        text="Hi,"
        className="intro-reveal intro-line-1"
        as="div"
      />

      <TextReveal
        text="I am Shashir."
        className="intro-reveal intro-line-2"
        as="div"
      />

      <TextReveal
        text="This is for you 💕"
        className="intro-reveal intro-line-3 title-romantic"
        as="div"
      />

      <div className="intro-teddy-wrap">
        <TeddyBear mood="heart" />
      </div>

      <div className="intro-btn-wrap">
        <button
          className="btn btn-clay btn-accept"
          onClick={onStart}
          id="open-proposal-btn"
        >
          Open My Message 💌
        </button>
      </div>
    </div>
  );
}
