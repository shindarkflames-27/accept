import React, { useState, useRef, useCallback } from 'react';
import IntroAnimation from './components/IntroAnimation';
import BackgroundEffects from './components/BackgroundEffects';
import FlairCursor from './components/FlairCursor';
import ParticleExplosion from './components/ParticleExplosion';
import IntroPage from './components/IntroPage';
import ProposalPage from './components/ProposalPage';
import LoveQuestionPage from './components/LoveQuestionPage';
import NoPage from './components/NoPage';
import FriendsIntroPage from './components/FriendsIntroPage';
import FriendsTalkPage from './components/FriendsTalkPage';
import FriendsTalkFinalPage from './components/FriendsTalkFinalPage';
import FriendsGoOutPage from './components/FriendsGoOutPage';
import TalkOrGoOutPage from './components/TalkOrGoOutPage';
import TalkPage from './components/TalkPage';
import ActivitySelectionPage from './components/ActivitySelectionPage';
import FinalCelebrationPage from './components/FinalCelebrationPage';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [currentPage, setCurrentPage] = useState('INTRO');
  const [noCount, setNoCount] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('');

  // Horizontal scroll intro animation completed
  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  // Intro -> Page 1
  const handleStartProposal = () => {
    setCurrentPage('PROPOSAL');
  };

  // Page 1 -> Page 2
  const handleAcceptProposal = () => {
    setCurrentPage('LOVE_QUESTION');
    setNoCount(0);
  };

  // Page 2 No button click handler
  const handleNoClick = () => {
    const nextCount = noCount + 1;
    if (nextCount >= 3) {
      setCurrentPage('NO_LETTER');
    } else {
      setNoCount(nextCount);
    }
  };

  // Page 3 -> Return to Page 2
  const handleResetToPage2 = () => {
    setNoCount(0);
    setCurrentPage('LOVE_QUESTION');
  };

  // Page 3 -> Friends pathway
  const handleBeFriends = () => {
    setCurrentPage('FRIENDS_INTRO');
  };

  // Friends Intro -> Talk
  const handleFriendsTalk = () => {
    setCurrentPage('FRIENDS_TALK');
  };

  // Friends Intro -> Go out
  const handleFriendsGoOut = () => {
    setCurrentPage('FRIENDS_GO_OUT');
  };

  // Friends Talk -> Talk Final
  const handleFriendsTalkContinue = () => {
    setCurrentPage('FRIENDS_TALK_FINAL');
  };

  // Friends Go Out -> Candidates Final Celebration
  const handleFriendsConfirmActivity = (plan) => {
    setSelectedPlan(plan);
    setCurrentPage('FRIENDS_CELEBRATION');
  };

  // Page 2 Yes button -> Page 4
  const handleYesLove = () => {
    setCurrentPage('TALK_OR_GO_OUT');
  };

  // Page 4 -> Talk pathway
  const handleSelectTalk = () => {
    setCurrentPage('TALK');
  };

  // Page 4 -> Go out pathway
  const handleSelectGoOut = () => {
    setCurrentPage('ACTIVITIES');
  };

  // Talk Subscreen -> Final Celebration
  const handleContinueTalk = () => {
    setSelectedPlan('💬 Just Talk');
    setCurrentPage('CELEBRATION');
  };

  // Activity Subscreen -> Final Celebration
  const handleConfirmActivity = (plan) => {
    setSelectedPlan(plan);
    setCurrentPage('CELEBRATION');
  };

  // Reset Everything back to Intro
  const handleRestart = () => {
    setCurrentPage('INTRO');
    setNoCount(0);
    setSelectedPlan('');
  };

  // ── Parallax tilt on the active card ──
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = containerRef.current?.querySelector('.clay-card, .glass-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.008)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = containerRef.current?.querySelector('.clay-card, .glass-card');
    if (card) card.style.transform = '';
  }, []);

  // Unique key per page to trigger CSS page-enter animation on each transition
  const pageKey = currentPage + (currentPage === 'LOVE_QUESTION' ? `-${noCount}` : '');

  const renderPage = () => {
    switch (currentPage) {
      case 'INTRO':
        return <IntroPage onStart={handleStartProposal} />;
      case 'PROPOSAL':
        return <ProposalPage onAccept={handleAcceptProposal} />;
      case 'LOVE_QUESTION':
        return (
          <LoveQuestionPage
            noCount={noCount}
            onNoClick={handleNoClick}
            onYesClick={handleYesLove}
          />
        );
      case 'NO_LETTER':
        return (
          <NoPage
            onThinkAgain={handleResetToPage2}
            onBeFriends={handleBeFriends}
          />
        );
      case 'FRIENDS_INTRO':
        return (
          <FriendsIntroPage
            onTalk={handleFriendsTalk}
            onGoOut={handleFriendsGoOut}
          />
        );
      case 'FRIENDS_TALK':
        return <FriendsTalkPage onContinue={handleFriendsTalkContinue} />;
      case 'FRIENDS_TALK_FINAL':
        return <FriendsTalkFinalPage onRestart={handleRestart} />;
      case 'FRIENDS_GO_OUT':
        return (
          <FriendsGoOutPage onConfirmActivity={handleFriendsConfirmActivity} />
        );
      case 'FRIENDS_CELEBRATION':
        return (
          <FinalCelebrationPage
            selectedPlan={selectedPlan}
            onRestart={handleRestart}
            variant="friends"
          />
        );
      case 'TALK_OR_GO_OUT':
        return (
          <TalkOrGoOutPage
            onSelectTalk={handleSelectTalk}
            onSelectGoOut={handleSelectGoOut}
          />
        );
      case 'TALK':
        return <TalkPage onContinue={handleContinueTalk} />;
      case 'ACTIVITIES':
        return <ActivitySelectionPage onConfirmActivity={handleConfirmActivity} />;
      case 'CELEBRATION':
        return (
          <FinalCelebrationPage
            selectedPlan={selectedPlan}
            onRestart={handleRestart}
          />
        );
      default:
        return null;
    }
  };

  // During intro: only render the scroll intro
  if (!introComplete) {
    return (
      <>
        <IntroAnimation onComplete={handleIntroComplete} />
        <FlairCursor />
        <ParticleExplosion />
      </>
    );
  }

  return (
    <div
      ref={containerRef}
      className="app-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <BackgroundEffects />
      <FlairCursor />
      <ParticleExplosion />

      <div className="page-transition-wrapper" key={pageKey}>
        {renderPage()}
      </div>
    </div>
  );
}
