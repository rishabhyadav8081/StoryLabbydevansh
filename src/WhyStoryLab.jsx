import React, {useEffect, useRef, useState} from 'react';
import './IdeaKitchen.css';
import {ArrowUpRight,ArrowLeft,ArrowRight,Play,Pause,Sparkles,Zap} from 'lucide-react';
const ingredients=[
 {tag:'THE ORIGINALITY INGREDIENT',title:['Fresh ideas.','Zero déjà vu.'],copy:'Unexpected concepts, sharp hooks and a creative point of view that feels entirely yours.',short:'Fresh ideas',stamp:'FRESHLY IMAGINED'},
 {tag:'THE ATTENTION INGREDIENT',title:['Made to stop','the scroll.'],copy:'Stories with a hook, a little personality and a reason to keep watching.',short:'Attention',stamp:'CAN’T SCROLL PAST'},
 {tag:'THE IDENTITY INGREDIENT',title:['Your brand.','Main character.'],copy:'A recognisable visual world that turns your product into a story people care about.',short:'Brand identity',stamp:'BIG BRAND ENERGY'},
 {tag:'THE CINEMA INGREDIENT',title:['Small screen.','Cinema energy.'],copy:'Art-directed visuals, thoughtful sound and polished edits that make every frame feel premium.',short:'Cinematic craft',stamp:'FRAME-WORTHY'},
 {tag:'THE COLLABORATION INGREDIENT',title:['One studio.','The whole story.'],copy:'Concepts, scripts, visuals, music and final delivery. We bring the moving parts together.',short:'Full support',stamp:'WE’VE GOT THIS'},
 {tag:'THE VALUE INGREDIENT',title:['Big imagination.','Smarter budgets.'],copy:'AI-powered production makes ambitious creative work possible without traditional production costs.',short:'Smart budgets',stamp:'MORE POSSIBILITY'},
 {tag:'THE EVERYWHERE INGREDIENT',title:['One good idea.','Every feed.'],copy:'Reels, YouTube, campaign ads and beyond. Your story, shaped for the places it needs to go.',short:'Every platform',stamp:'READY FOR YOUR FEED'},
 {tag:'THE MOMENTUM INGREDIENT',title:['Good ideas','move fast.'],copy:'A clear process and quick execution keep your project moving from first spark to final cut.',short:'Quick turnaround',stamp:'LET’S GET COOKING'},
 {tag:'THE STRATEGY INGREDIENT',title:['A little instinct.','A lot of intent.'],copy:'Creative thinking meets audience insight, so the work has a purpose behind the personality.',short:'Strategy',stamp:'THINKING INCLUDED'},
 {tag:'THE IMPACT INGREDIENT',title:['Make a little','brand noise.'],copy:'Content built to spark conversations, grow recognition and turn attention into meaningful action.',short:'Real impact',stamp:'LET THEM TALK'},
];
export default function WhyStoryLab(){
 const [step,setStep]=useState(0),[playing,setPlaying]=useState(()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches),[visible,setVisible]=useState(false);
 const host=useRef(null);
 useEffect(()=>{const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.2});observer.observe(host.current);return()=>observer.disconnect()},[]);
 useEffect(()=>{if(!playing||!visible)return;const timer=setInterval(()=>setStep(i=>(i+1)%ingredients.length),5500);return()=>clearInterval(timer)},[playing,visible,step]);
 const current=ingredients[step];const change=direction=>setStep(i=>(i+direction+ingredients.length)%ingredients.length);
 return <section className={`idea-kitchen ${playing&&visible?'kitchen-running':'kitchen-paused'}`} id="why-storylab" ref={host}>
 <div className="kitchen-heading"><div><span className="kitchen-eyebrow"><span/> WHY STORYLAB? GLAD YOU ASKED.</span><h2>Good ads?<br/><span>We cook those.</span><svg className="kitchen-title-doodle" viewBox="0 0 100 100" aria-hidden="true"><path d="M48 5 55 35 86 17 66 45 98 53 65 61 85 88 56 72 47 99 39 70 9 86 28 59 0 49 31 42 14 13 41 32Z" fill="currentColor"/></svg></h2></div><p>A little mad science.<br/>A lot of creative instinct.<br/><strong>Ten ingredients. One StoryLab.</strong></p></div>
 <div className="kitchen-stage">
 <div className="kitchen-collage" style={{position:'relative',overflow:'hidden',aspectRatio:'4 / 5',maxHeight:490}} aria-hidden="true"><span className="kitchen-orbit orbit-a"/><span className="kitchen-orbit orbit-b"/><span className="kitchen-sticker sticker-top">IDEAS<br/><b>ON TAP.</b></span><span className="kitchen-spark">✳</span>
 <img className="kitchen-scientist" src="/media/lab-pouring-character.png" alt="" width="400" height="500" loading="lazy" style={{position:'absolute',width:'100%',maxWidth:'100%',height:'100%',objectFit:'contain'}}/>
 <svg className="kitchen-pour" viewBox="0 0 400 500" preserveAspectRatio="none"><defs><linearGradient id="kitchen-gold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffe8a0"/><stop offset=".5" stopColor="#f5b72c"/><stop offset="1" stopColor="#cf7f19"/></linearGradient><clipPath id="kitchen-flask"><path d="M274 311V348C221 366 209 438 277 454C347 468 371 385 306 348V311Z"/></clipPath></defs><path className="kitchen-liquid-stream" d="M320 232C350 266 284 277 290 324" fill="none" stroke="url(#kitchen-gold)" strokeWidth="7"/><path className="kitchen-liquid-highlight" d="M320 232C350 266 284 277 290 324" fill="none" stroke="#fff3c7" strokeWidth="2" strokeDasharray="5 10"/>
 <path d="M263 310H317M274 311V348C221 366 209 438 277 454C347 468 371 385 306 348V311" fill="#fff9df22" stroke="#27251c" strokeWidth="3" strokeLinecap="round"/>
 <g clipPath="url(#kitchen-flask)"><path className="kitchen-liquid-surface" d="M210 395Q240 382 275 395T375 394V475H210Z" fill="url(#kitchen-gold)"/>{[0,1,2,3].map(i=><circle key={i} className="kitchen-bubble" cx={262+i*13} cy={427+i%2*6} r={3+i%2} fill="#fff0b6" style={{animationDelay:`${i*.45}s`}}/>)}</g><path d="M251 375Q230 397 245 421" fill="none" stroke="#fff9df" strokeWidth="3" strokeLinecap="round"/><text x="289" y="430" textAnchor="middle" fill="#302713" fontSize="11" fontFamily="sans-serif" fontWeight="700" letterSpacing="1.2">STORYLAB</text></svg>
 <span className="kitchen-sticker sticker-bottom" key={current.stamp}>{current.stamp} <Sparkles size={14}/></span><span className="kitchen-handnote">the secret sauce ↗</span></div>
 <div className="kitchen-copy"><div className="kitchen-copy-top"><span>THE CREATIVE RECIPE</span><span className="kitchen-counter">{String(step+1).padStart(2,'0')} <i>/ 10</i></span></div>
 <div className="kitchen-current" key={step}><span className="kitchen-ingredient"><Zap size={12}/> {current.tag}</span><h3>{current.title[0]}<br/><span>{current.title[1]}</span></h3><p>{current.copy}</p></div>
 <div className="kitchen-actions"><a href="#contact">Cook up my next ad <ArrowUpRight size={18}/></a><div><button onClick={()=>change(-1)} aria-label="Previous ingredient"><ArrowLeft size={17}/></button><button onClick={()=>setPlaying(!playing)} aria-label={playing?'Pause creative recipe':'Play creative recipe'}>{playing?<Pause size={15}/>:<Play size={15}/>}</button><button onClick={()=>change(1)} aria-label="Next ingredient"><ArrowRight size={17}/></button></div></div>
 <div className="kitchen-progress" aria-hidden="true"><span key={`${step}-${playing}-${visible}`}/></div></div></div>
 <div className="kitchen-bottom"><span>PICK YOUR INGREDIENT ↓</span><div className="kitchen-tabs" role="group" aria-label="Ten reasons to create with StoryLab">{ingredients.map((item,i)=><button key={item.short} onClick={()=>setStep(i)} aria-pressed={step===i}><span>{String(i+1).padStart(2,'0')}</span>{item.short}</button>)}</div></div>
 </section>
}
