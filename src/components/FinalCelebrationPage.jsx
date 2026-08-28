import React, { useRef, useState, useCallback } from 'react';
import html2canvas from 'html2canvas';
import TeddyBear from './TeddyBear';
import ConfettiEffect from './ConfettiEffect';
import TextReveal from './TextReveal';

const planName = (p) => (p && p.trim() ? p : '💬 Just Talk');

export default function FinalCelebrationPage({ selectedPlan, onRestart, variant = 'celebrate' }) {
  const isFriends = variant === 'friends';
  const cardRef = useRef(null);
  const [sharing, setSharing] = useState(false);
  const [snapHint, setSnapHint] = useState(false);
  const [showSocial, setShowSocial] = useState(false);

  const plan = planName(selectedPlan);

  // Capture the celebration card as a PNG screenshot
  const captureCard = useCallback(async () => {
    const node = cardRef.current;
    if (!node) return null;
    try {
      const canvas = await html2canvas(node, {
        scale: 2,
        backgroundColor: '#fdf5ee',
        useCORS: true,
        logging: false,
      });
      return canvas.toDataURL('image/png');
    } catch (err) {
      console.error('Screenshot failed', err);
      return null;
    }
  }, []);

  const waMessage = () =>
    `Hey! 💗 I made this cute little proposal for you! 🧸❤️\n\nOur plan: ${plan} 💕`;

  // Open WhatsApp chat with the specific number + pre-filled (not auto-sent) message.
  // Wa.me opens the WhatsApp app on Android and WhatsApp Web on desktop.
  const handleShare = () => {
    const number = '919493709278';
    const url = `https://wa.me/${number}?text=${encodeURIComponent(waMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSave = async () => {
    setSharing(true);
    const dataUrl = await captureCard();
    setSharing(false);
    if (!dataUrl) return;

    const link = document.createElement('a');
    link.download = 'our-plan.png';
    link.href = dataUrl;
    link.click();
  };

  // Open the Instagram profile in a new tab (IG app on mobile when supported).
  const handleInstagram = () => {
    const username = 'Shashir_s.s.n';
    window.open(`https://www.instagram.com/${username}/`, '_blank', 'noopener,noreferrer');
  };

  // Try to open Snapchat directly; fall back to a friendly prompt when unsupported.
  const handleSnapchat = () => {
    const deepLink = 'https://www.snapchat.com/add/shashir_mouli';
    // Best-effort: try opening the app/web profile, else ask the user to search.
    try {
      window.open(deepLink, '_blank', 'noopener,noreferrer');
    } catch {
      setSnapHint(true);
    }
    // Always also show the fallback hint so the user can search by display name.
    setSnapHint(true);
  };

  return (
    <>
      <ConfettiEffect />
      <div className="clay-card" ref={cardRef} style={{ zIndex: 30, overflow: 'visible' }}>
        <div className="celebration-glow" />

        <div className="title-emoji" style={{ fontSize: '3.4rem', animation: 'heartPulse 1.8s ease-in-out infinite' }}>
          💖
        </div>

        <TextReveal
          text={isFriends ? 'YAY! 💖🥰' : 'YAYYY! 🥰💖'}
          className="card-title title-romantic"
          style={{ fontSize: '2.4rem', color: '#a83050' }}
        />

        <TextReveal
          text={isFriends ? 'Looking forward to spending some time together! ❤️' : 'I knew it! ❤️'}
          className="card-subtitle"
          as="p"
          style={{ fontSize: '1.2rem', fontWeight: '800', color: '#c84060' }}
        />

        <div className="celebration-badge clay-badge">
          <TextReveal
            text={`Our plan: ${plan}`}
            as="span"
          />
        </div>

        <div className="celebration-emoji-row" aria-hidden="true">
          <span>💐</span><span>💖</span><span>🌸</span>
        </div>

        <div style={{ margin: '4px 0 14px 0' }}>
          <TeddyBear mood="flowers" />
        </div>

        <button
          className="btn btn-clay btn-social"
          onClick={() => setShowSocial((s) => !s)}
          id="social-toggle-btn"
        >
          {showSocial ? 'Hide Social Media 🔽' : 'Social Media 📲'}
        </button>

        {showSocial && (
          <>
            <div className="social-btns">
              <button
                className="btn btn-clay btn-accept"
                onClick={handleShare}
                id="share-whatsapp-btn"
                style={{ background: 'linear-gradient(155deg, #6dd389 0%, #3fae5a 60%, #2f8f47 100%)' }}
              >
                Share on WhatsApp 💚
              </button>
              <button
                className="btn btn-clay btn-secondary"
                onClick={handleInstagram}
                id="open-instagram-btn"
                style={{ background: 'linear-gradient(155deg, #f9a8d4 0%, #e14d86 55%, #a4459c 100%)' }}
              >
                Open Instagram 📸
              </button>
              <button
                className="btn btn-clay btn-secondary"
                onClick={handleSnapchat}
                id="open-snapchat-btn"
                style={{ background: 'linear-gradient(155deg, #fce588 0%, #f7cf2d 55%, #eab308 100%)' }}
              >
                Open Snapchat 👻
              </button>
            </div>

            {snapHint && (
              <p className="share-status" style={{ textAlign: 'center', fontSize: '0.95rem', margin: '10px 0 0' }}>
                Couldn’t open Snapchat directly — just search <strong>“Shashir Mouli”</strong> inside the app. 👻
              </p>
            )}
          </>
        )}

        <div style={{ marginTop: '8px' }}>
          <button className="btn btn-clay btn-secondary" onClick={handleSave} disabled={sharing} id="save-screenshot-btn">
            {sharing ? 'Capturing…' : 'Save Screenshot 📸'}
          </button>
        </div>

        <div style={{ marginTop: '8px' }}>
          <button className="btn btn-clay btn-reject" onClick={onRestart} id="start-again-btn">
            Start Again 💕
          </button>
        </div>
      </div>
    </>
  );
}
