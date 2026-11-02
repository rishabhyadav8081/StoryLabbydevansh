import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const services=[
 ['AI Ads','Campaign-ready advertisements that turn your product into a story. We develop the concept and script, create art-directed AI visuals, and finish every edit with voice, music and your brand identity.',['Product commercials','Campaign concepts','Social ad variations']],
 ['AI Music','A sound that belongs to your brand. Original AI-assisted tracks, memorable jingles and music-led videos, shaped with creative direction and polished editing for your campaign.',['Brand jingles','Original soundtracks','Music videos']],
 ['AI Films','Cinematic storytelling, from the first idea to the final frame. We bring scripts, characters and imagined worlds to life through AI filmmaking, considered editing and immersive sound.',['Short films','Brand stories','Cinematic production']],
 ['Social Media Management','A consistent presence with a clear creative voice. We plan your content, create reels and posts, organise publishing and review performance to help your brand connect with its audience.',['Content planning','Reels & posts','Publishing & reporting']],
];

// No contact details or project text enter the advertising data layer.
const reported = new Set();
function reportEnquirySuccess(eventId, target = window) {
  if (!eventId || reported.has(eventId)) return false;
  reported.add(eventId);
  // Never queue pre-consent conversions for replay after a later acceptance.
  if (target.storylabConsent?.get() !== 'accepted') return false;
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push({event: 'enquiry_success', event_id: eventId, form_id: 'website_enquiry', marketing_consent: 'granted'});
  return true;
}
async function saveEnquiry(endpoint, data, eventId, request = fetch, target = window) {
  const response = await request(endpoint, {method:'POST', headers:{'Content-Type':'text/plain;charset=utf-8'}, body:JSON.stringify(data)});
  const result = await response.json();
  if (!response.ok || result.success !== true) throw new Error('Save failed');
  // Tracking must never change the outcome of a confirmed save.
  try { reportEnquirySuccess(eventId, target); } catch {}
  return result;
}

export default function EnquiryForm({chosen,setChosen}) {
 const [draft,setDraft]=useState(null);
 const [sending,setSending]=useState(false);
 const [sheetStatus,setSheetStatus]=useState('');
 const submitLock=useRef(false);
 const savedPayload=useRef(null);
 async function submit(e){
  e.preventDefault();
  if(submitLock.current || !e.currentTarget.reportValidity())return;
  const data=Object.fromEntries(new FormData(e.currentTarget));
  data.budget = Number(data.budget.replace(/,/g, ''));
  if(!Number.isFinite(data.budget) || data.budget < 5000){
   const budgetInput=e.currentTarget.elements.budget;
   budgetInput.setCustomValidity('Minimum budget is ₹5,000.');
   budgetInput.reportValidity();
   return;
  }
  const budgetLabel = new Intl.NumberFormat('en-IN', {style:'currency', currency:'INR', maximumFractionDigits:2}).format(data.budget);
  const text=`Hello StoryLab! I'd like to discuss a project.\n\nName: ${data.name}\nEmail: ${data.email}\nMobile: ${data.mobile}\nBrand: ${data.brand}\nInterested in: ${data.service}\nBudget: ${budgetLabel}\n\n${data.message}`;
  setDraft(`https://wa.me/919919372651?text=${encodeURIComponent(text)}`);
  const endpoint=import.meta.env.VITE_GOOGLE_SHEETS_URL;
  if(!endpoint){setSheetStatus('Your enquiry is ready to send on WhatsApp.');return}
  const payload={...data,budget:String(data.budget)};
  const fingerprint=JSON.stringify(payload);
  if(savedPayload.current===fingerprint){setSheetStatus('This enquiry has already been saved. You can continue on WhatsApp.');return;}
  submitLock.current=true;
  const eventId=crypto.randomUUID();
  setSending(true);setSheetStatus('Saving your enquiry…');
  try{
   await saveEnquiry(endpoint,payload,eventId);
   savedPayload.current=fingerprint;
   setSheetStatus('Thank you! Your enquiry has been received. You can also continue on WhatsApp.');
  }catch{setSheetStatus('We could not confirm your enquiry was saved. Please send it on WhatsApp below.');}
  finally{submitLock.current=false;setSending(false)}
 }

 return (<form className="contact-form" onSubmit={submit} onChange={()=>{setDraft(null);setSheetStatus('')}}><div className="form-row"><label>Your name <span>*</span><input name="name" placeholder="Alex Taylor" autoComplete="name" required/></label><label>Email address <span>*</span><input name="email" type="email" placeholder="alex@yourbrand.com" autoComplete="email" required/></label></div><div className="form-row"><label>Mobile number <span>*</span><input name="mobile" type="tel" placeholder="+91 98765 43210" autoComplete="tel" pattern={"[+0-9\\(\\) .\\-]{7,25}"} maxLength="25" required/></label><label>Budget <span>*</span><div className="budget-input"><span className="budget-currency" aria-hidden="true">₹</span><input name="budget" type="text" inputMode="numeric" pattern="[0-9,]*[1-9][0-9,]*" maxLength="15" placeholder="30,000" aria-label="Budget in rupees, minimum 5,000" title="Minimum budget is ₹5,000" onBeforeInput={e=>{if(e.data && /[^0-9,]/.test(e.data))e.preventDefault()}} onChange={e=>{const input=e.currentTarget;const digits=input.value.replace(/[^0-9]/g,'').slice(0,9);input.value=digits?new Intl.NumberFormat('en-IN').format(Number(digits)):'';input.setCustomValidity(digits && Number(digits)<5000?'Minimum budget is ₹5,000.':'')}} required/></div></label></div><label>Brand / company<input name="brand" placeholder="What’s your brand called?" autoComplete="organization"/></label><label>What are we creating?<select name="service" value={chosen} onChange={e=>setChosen(e.target.value)}><option value="">Select a service</option>{services.map(([name])=><option key={name}>{name}</option>)}<option>Something else / Custom project</option></select></label><label>A little about your project <span>*</span><textarea name="message" rows="3" placeholder="The idea, the ambition, the what-if…" required/></label><div className="form-footer"><span>Great stories start with a conversation.</span><button className="button button-dark" type="submit" disabled={sending}>{sending?'Saving…':'Prepare enquiry'} <ArrowUpRight size={18}/></button></div>{draft&&<div className="enquiry-ready" role="status"><p>{sheetStatus}</p><a href={draft} target="_blank" rel="noreferrer">Continue to WhatsApp <ArrowUpRight size={16}/></a></div>}</form>);
}
