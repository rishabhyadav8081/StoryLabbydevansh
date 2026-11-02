import React, {useState} from 'react';
export default function ConsentControls(){
 const [open,setOpen]=useState(()=>!window.storylabConsent?.get());
 function choose(choice){window.storylabConsent?.set(choice);setOpen(false);}
 return <><button className="privacy-settings" onClick={()=>setOpen(true)}>Cookie settings</button>{open&&<section className="consent-panel" role="region" aria-label="Cookie preferences"><strong>Your privacy choices</strong><p>With your permission, we use Google Tag Manager and Meta Pixel to measure visits and saved enquiries for advertising. You can enquire without accepting. No form contact details are sent in our enquiry tracking event. Change your choice anytime in Cookie settings.</p><div><button onClick={()=>choose('rejected')}>Reject optional</button><button onClick={()=>choose('accepted')}>Accept optional</button></div></section>}</>;
}
