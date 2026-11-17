import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Volume2, VolumeX } from 'lucide-react';

export default function HeroShowreel() {
  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    let active = true;
    video.play().catch(() => {
      if (!active) return;
      video.muted = true;
      video.play().catch(() => {});
    });
    return () => { active = false; };
  }, []);

  async function toggleSound() {
    const video = videoRef.current;
    setPlaybackError(false);
    if (soundOn) {
      video.muted = true;
      return;
    }
    video.muted = false;
    try {
      await video.play();
    } catch {
      video.muted = true;
      setPlaybackError(true);
    }
  }

  return (
    <section className="hero reference-hero" id="home">
      <video className="hero-video" ref={videoRef} src="/media/storylab-hero.mp4" poster="/media/storylab-hero-poster.jpg" loop playsInline preload="metadata"
        aria-label="StoryLab creative advertising showreel"
        onPlaying={event => setSoundOn(!event.currentTarget.muted)}
        onVolumeChange={event => setSoundOn(!event.currentTarget.muted)}/>
      <div className="hero-shade"/>
      <div className="reference-title"><h1>Story<span>lab</span><small>by Devansh</small></h1></div>
      <div className="reference-services">
        {['AI Ads', 'AI Music', 'AI Films', 'Social Media Management'].map(name => <a href="#services" key={name}>{name}</a>)}
      </div>
      <div className="reference-controls">
        <a href="#work">Explore our work <ArrowDown size={17} aria-hidden="true"/></a>
        <button type="button" className="hero-sound" onClick={toggleSound}>
          {soundOn ? <Volume2 size={17} aria-hidden="true"/> : <VolumeX size={17} aria-hidden="true"/>}
          {soundOn ? 'Mute sound' : 'Play sound'}
        </button>
        {playbackError && <span className="hero-sound-status" role="status">Sound couldn’t start. Tap Play sound to try again.</span>}
      </div>
    </section>
  );
}
