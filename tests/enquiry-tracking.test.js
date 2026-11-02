import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {saveEnquiry,reportEnquirySuccess} from '../src/enquiryTracking.js';
const target=(accepted=true)=>({storylabConsent:{get:()=>accepted?'accepted':'rejected'},dataLayer:[]});
const response=(success,ok=true)=>async()=>({ok,json:async()=>({success})});
test('confirmed save emits one non-PII success, duplicate ID emits none',async()=>{
 const w=target();await saveEnquiry('/save',{email:'private@example.com'},'success-1',response(true),w);
 reportEnquirySuccess('success-1',w);assert.equal(w.dataLayer.length,1);
 assert.deepEqual(Object.keys(w.dataLayer[0]).sort(),['event','event_id','form_id','marketing_consent']);
});
test('HTTP failure, rejected save, truthy nonboolean, bad JSON and network errors emit zero',async()=>{
 for(const request of [response(false),response(true,false),response('true'),async()=>({ok:true,json:async()=>{throw Error('bad JSON');}}),async()=>{throw Error('offline');}]){
  const w=target();await assert.rejects(saveEnquiry('/save',{},crypto.randomUUID(),request,w));assert.equal(w.dataLayer.length,0);
 }
});
test('success without consent is never replayed after consent',async()=>{
 const w=target(false);await saveEnquiry('/save',{},'no-consent',response(true),w);
 w.storylabConsent.get=()=> 'accepted';reportEnquirySuccess('no-consent',w);assert.equal(w.dataLayer.length,0);
});
test('normal visit emits no enquiry event; GTM stays blocked until consent and loads once',()=>{
 const scripts=[],saved=new Map();const w={dispatchEvent(){},location:{reload(){}}};
 const context={window:w,document:{createElement:()=>({}),head:{appendChild:s=>scripts.push(s)}},localStorage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)},Event:class{},Date};
 vm.runInNewContext(fs.readFileSync('public/tracking-consent.js','utf8'),context);
 assert.equal(scripts.length,0);w.storylabConsent.set('rejected');assert.equal(scripts.length,0);
 w.storylabConsent.set('accepted');w.storylabConsent.set('accepted');assert.equal(scripts.length,1);
 assert.match(scripts[0].src,/GTM-MRNGTPNF/);assert.equal(w.dataLayer.filter(x=>x.event==='enquiry_success').length,0);
});
test('prepared GTM tags map duplicate successes to exactly one Meta Lead; denied emits zero',()=>{
 const calls=[];const w={storylabConsent:{get:()=> 'accepted'},fbq:(...args)=>calls.push(args)};
 const ctx={window:w,document:{}};
 const strip=s=>s.replace(/<\/?script>/g,'');
 vm.runInNewContext(strip(fs.readFileSync('tracking/meta-base.html','utf8')),ctx);
 const lead=strip(fs.readFileSync('tracking/meta-lead.html','utf8')).replace('{{DLV - event_id}}',JSON.stringify('lead-1'));
 vm.runInNewContext(lead,ctx);vm.runInNewContext(lead,ctx);
 assert.equal(calls.filter(x=>x[2]==='Lead').length,1);
 assert.equal(calls.find(x=>x[2]==='Lead')[1],'1680985060372155');
 w.storylabConsent.get=()=> 'rejected';vm.runInNewContext(lead.replace('lead-1','lead-2'),ctx);assert.equal(calls.filter(x=>x[2]==='Lead').length,1);
});
