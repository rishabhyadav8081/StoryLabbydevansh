import React, {useEffect, useRef} from 'react';
import {ArrowDown} from 'lucide-react';

const reasons = [
 ['Quirky & fresh ideas','Ads that break the monotony and feel truly Gen Z.','A different kind of idea.'],
 ['Attention that sticks','Content that entertains, relates and instantly grabs eyes.','Make them stop. Make it stay.'],
 ['Stronger brand awareness','Turn your product into conversations people actually care about.','Become part of the conversation.'],
 ['Creative storytelling','Puns, pop culture and unexpected ideas that make people watch, share and remember.','Give every frame a story.'],
 ['Full production support','From concept and script to AI production, editing and final delivery.','One creative partner. Every detail.'],
 ['Cost-efficient','High-quality, cinematic ads without traditional production costs.','A bigger vision, thoughtfully made.'],
 ['Fast turnaround','Go from idea to final ad in record time.','Keep your ideas moving.'],
 ['Multi-platform ready','Optimised for Instagram Reels, YouTube, OTT, Meta Ads and more.','Your story, wherever they watch.'],
 ['Gen Z connection','Modern, relatable and culturally relevant content that speaks their language.','Made for the way they see the world.'],
 ['Real business results','More views, more engagement, more brand love and more sales.','Let your story go further.'],
];
const riverPath='M500 0 L500 55 C500 85 420 80 420 110 '+Array.from({length:9},(_,i)=>{const x=i%2?420:580;const prev=i%2?580:420;const y=110+i*220;return `C${prev} ${y+125} ${x} ${y+95} ${x} ${y+220}`}).join(' ')+' C580 2170 500 2170 500 2200';
export default function RiverJourney(){
 const mountain=useRef(null);
 useEffect(()=>{
  const element=mountain.current;
  const observer=new IntersectionObserver(([entry])=>{
   element.classList.toggle('mountain-in-view',entry.isIntersecting);
  },{threshold:.25});
  observer.observe(element);
  return()=>observer.disconnect();
 },[]);
 return <section className="alpine-journey" aria-label="Ten reasons to create with StoryLab"><header className="alpine-intro"><span className="eyebrow">WHY STORYLAB / TEN REASONS</span><h2>Go with the <em>flow.</em></h2><p>A fresh idea around every bend.</p></header>
 <div className="alpine-journey-route"><div className="alpine-lake" ref={mountain} aria-hidden="true"><img src="/media/river-alpine-source.png" alt=""/><span className="mountain-wordmark">STORYLAB</span><img className="mountain-foreground" src="/media/river-alpine-source.png" alt=""/></div>
 <svg className="alpine-channel" viewBox="0 0 1000 2200" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="channel-blue" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#64c9d2"/><stop offset=".48" stopColor="#238eaf"/><stop offset="1" stopColor="#89d6d7"/></linearGradient><linearGradient id="channel-fade" x1="0" y1="0" x2="0" y2="1"><stop stopColor="white" stopOpacity="0"/><stop offset=".05" stopColor="white"/><stop offset="1" stopColor="white"/></linearGradient><mask id="channel-join" maskUnits="userSpaceOnUse" x="-300" y="-100" width="1600" height="2400"><rect x="-300" width="1600" height="2300" fill="url(#channel-fade)"/></mask></defs>
 <g mask="url(#channel-join)"><path className="channel-meadow" d={riverPath}/><path className="channel-grass-edge" d={riverPath}/><path className="channel-earth" d={riverPath}/><path className="channel-sand" d={riverPath}/><path className="channel-water" d={riverPath}/><path className="channel-current" d={riverPath}/><path className="channel-current channel-current-two" d={riverPath}/>
 {Array.from({length:20},(_,i)=><circle key={i} r={i%3?2:3} fill="#edffff" opacity=".7"><animateMotion path={riverPath} dur={`${54+i%4*9}s`} begin={`${-i*2}s`} repeatCount="indefinite"/></circle>)}</g>

 </svg><div className="river-land-details" aria-hidden="true">{Array.from({length:30},(_,i)=><svg key={i} className={i%3?'land-grass':'land-stone'} style={{top:`${4+i*3.15}%`,left:`${i%2?76+(i%4)*4:8+(i%4)*4}%`}} viewBox="0 0 36 30">{i%3?<><path d="M18 29Q17 10 7 6M18 29Q22 10 29 4M18 29Q14 15 2 16M18 29Q25 18 34 18" fill="none" stroke="#60824a" strokeWidth="2" strokeLinecap="round"/><path d="M18 29V11" stroke="#7b9659" strokeWidth="2"/></>:<><path d="M4 22 8 9 22 5 32 15 29 25 12 27Z" fill="#b2a287"/><path d="m8 9 14-4-7 14-11 3Z" fill="#c7baa0"/></>}</svg>)}</div><ol className="alpine-reasons">{reasons.map(([title,description,kicker],i)=><li className={i%2?'alpine-right':'alpine-left'} key={title}><div><svg className="alpine-step-tree" viewBox="0 0 56 72" aria-hidden="true"><ellipse cx="28" cy="67" rx="18" ry="4" fill="#9dad8b" opacity=".25"/><path d="M28 53V68" stroke="#80613e" strokeWidth="3"/><path d="M28 2 18 19H23L12 34H19L6 50H15L2 63H54L41 50H50L37 34H44L33 19H38Z" fill="#357448"/><path d="M28 2V63H54L41 50H50L37 34H44L33 19H38Z" fill="#235b38"/></svg><span className="alpine-number">{String(i+1).padStart(2,'0')}</span><span className="alpine-kicker">{kicker}</span><h3>{title}</h3><p>{description}</p></div><span className="alpine-dot" aria-hidden="true"/></li>)}</ol></div>
 <a className="alpine-outro" href="#work">Now see it in action <ArrowDown size={17}/></a></section>
}
