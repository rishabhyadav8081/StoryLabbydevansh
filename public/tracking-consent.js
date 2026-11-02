(function(w,d){
  'use strict';
  var key='storylab-marketing-consent-v1', loaded=false;
  w.dataLayer=w.dataLayer||[];
  w.gtag=w.gtag||function(){w.dataLayer.push(arguments);};
  function state(granted){return {ad_storage:granted?'granted':'denied',analytics_storage:granted?'granted':'denied',ad_user_data:granted?'granted':'denied',ad_personalization:granted?'granted':'denied'};}
  w.gtag('consent','default',state(false));
  function read(){try{var value=JSON.parse(localStorage.getItem(key));return value && Date.now()-value.at<180*86400000?value.choice:null;}catch(e){return null;}}
  var choice=read();
  function load(){
    if(loaded)return;
    loaded=true;
    w.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
    var script=d.createElement('script');script.async=true;
    script.src='https://www.googletagmanager.com/gtm.js?id=GTM-MRNGTPNF';
    d.head.appendChild(script);
  }
  function apply(){
    w.gtag('consent','update',state(choice==='accepted'));
    if(typeof w.fbq==='function')w.fbq('consent',choice==='accepted'?'grant':'revoke');
    if(choice==='accepted')load();
    w.dataLayer.push({event:'consent_updated',marketing_consent:choice==='accepted'?'granted':'denied'});
  }
  w.storylabConsent={get:function(){return choice;},set:function(next){
    if(next!=='accepted'&&next!=='rejected')return;
    choice=next;
    try{localStorage.setItem(key,JSON.stringify({choice:choice,at:Date.now()}));}catch(e){}
    apply();w.dispatchEvent(new Event('storylab-consent-change'));
    // Reload on withdrawal to unload all previously granted third-party code.
    if(choice==='rejected'&&loaded)w.location.reload();
  }};
  if(choice)apply();
})(window,document);
