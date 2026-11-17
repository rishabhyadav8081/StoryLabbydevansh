import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Instagram, Pause, Play } from 'lucide-react';
import { services } from './services.js';
import './StudioSections.css';

const universes = [
  {
    name: 'StoryLab',
    category: 'Live Action',
    description: 'Real crews, cameras and sets. From the first shot to the final edit.',
    profile: 'storylabbyddevansh',
    reel: 'DeuLFAhyVZd',
  },
  {
    name: 'StoryLab.AI',
    category: 'Agile AI Advertising',
    description: 'AI ads, reels and films built for the feed.',
    profile: 'storylabbydevansh.ai',
    reel: 'DdePECaoYOP',
  },
  {
    name: 'StoryLab Black',
    category: 'Premium AI Advertising',
    description: 'Art-directed cinematic campaigns for brands where every detail matters.',
    profile: 'storylabbydevansh.black',
    reel: 'DdRbtkKyaBJ',
  },
];

export function MonthlyViews() {
  return (
    <section className="studio-views" aria-labelledby="studio-views-title">
      <div className="studio-views-inner">
        <div className="studio-views-stat">
          <p className="eyebrow">The internet’s watching.</p>
          <h2 id="studio-views-title"><strong>15M+</strong> Monthly views</h2>
        </div>
        <div className="studio-views-copy">
          <p className="serif">“Apparently, the internet likes our kind of chaos.”</p>
          <small>Self-reported monthly views across StoryLab social content. Figures are unaudited and campaign results may vary.</small>
        </div>
      </div>
    </section>
  );
}

function UniverseCard({ universe }) {
  const media = useRef(null);
  const playPreference = useRef(null);
  const [playing, setPlaying] = useState(false);
  const { name, category, description, profile, reel } = universe;

  useEffect(() => {
    const video = media.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const updatePlayback = () => {
      if (visible && (playPreference.current ?? !motion.matches)) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= 0.6;
      updatePlayback();
    }, { threshold: 0.6 });
    observer.observe(video);
    motion.addEventListener('change', updatePlayback);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', updatePlayback);
    };
  }, []);

  function togglePlayback() {
    const video = media.current;
    playPreference.current = video.paused;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  return (
    <article className="studio-universe">
      <div className="studio-universe-media">
        <video
          ref={media}
          src={`/media/reels/${reel}.mp4`}
          poster={`/media/reels/${reel}.jpg`}
          muted loop playsInline preload="none" aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>
      <div className="studio-universe-copy">
        <span className="eyebrow">{category}</span>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="studio-universe-actions">
          <a className="studio-universe-link" href={`https://www.instagram.com/${profile}/`} target="_blank" rel="noreferrer" aria-label={`${name} on Instagram (opens in a new tab)`}>
            <Instagram size={17} aria-hidden="true"/> Visit Instagram <ArrowUpRight size={15} aria-hidden="true"/>
          </a>
          <button type="button" className="studio-universe-play" onClick={togglePlayback} aria-label={`${playing ? 'Pause' : 'Play'} ${name} preview`}>
            {playing ? <Pause size={16} aria-hidden="true"/> : <Play size={16} aria-hidden="true"/>}
          </button>
        </div>
      </div>
    </article>
  );
}

export function StoryLabUniverses() {
  return (
    <section className="studio-universes section-pad" aria-labelledby="studio-universes-title">
      <h2 id="studio-universes-title">Pick your <em className="serif">universe.</em></h2>
      <p className="studio-universes-intro">One studio. Three ways to tell your story.</p>
      <div className="studio-universe-grid">
        {universes.map(universe => <UniverseCard key={universe.profile} universe={universe}/>)}
      </div>
    </section>
  );
}

export function StudioServices({ onEnquire }) {
  return (
    <section className="studio-services section-pad" id="services" aria-labelledby="services-title">
      <h2 id="services-title">Yeah, we do <em className="serif">that too.</em></h2>
      <ul className="studio-service-list">
        {services.map(([name, description, title = name]) => (
          <li key={name}>
            <div><h3>{title}</h3><p>{description}</p></div>
            <a className="text-link" href="#contact" onClick={() => onEnquire(name)} aria-label={`Enquire about ${title}`}>
              Enquire <ArrowUpRight size={16} aria-hidden="true"/>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
