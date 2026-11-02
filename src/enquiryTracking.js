// No contact details or project text enter the advertising data layer.
const reported = new Set();
export function reportEnquirySuccess(eventId, target = window) {
  if (!eventId || reported.has(eventId)) return false;
  reported.add(eventId);
  // Never queue pre-consent conversions for replay after a later acceptance.
  if (target.storylabConsent?.get() !== 'accepted') return false;
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push({event: 'enquiry_success', event_id: eventId, form_id: 'website_enquiry', marketing_consent: 'granted'});
  return true;
}
export async function saveEnquiry(endpoint, data, eventId, request = fetch, target = window) {
  const response = await request(endpoint, {method:'POST', headers:{'Content-Type':'text/plain;charset=utf-8'}, body:JSON.stringify(data)});
  const result = await response.json();
  if (!response.ok || result.success !== true) throw new Error('Save failed');
  // Tracking must never change the outcome of a confirmed save.
  try { reportEnquirySuccess(eventId, target); } catch {}
  return result;
}
