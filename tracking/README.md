# GTM completion checklist — GTM-MRNGTPNF

Website code is configured for this container. Meta Pixel ID is 1680985060372155 (not ad account 2267708726970040).

GTM account access and the user's attached ZIP were unavailable during implementation. These tag files are prepared for review against that ZIP; they have NOT been installed or published in GTM.

1. Inspect existing tags and draft trigger “Enquiry saved successfully”. It must match Custom Event enquiry_success exactly; remove any form-submit, button-click, WhatsApp, page-view, or success-text Lead triggers. Disable overlapping Pixel/Lead tags and Meta automatic event rules that create Leads from clicks.
2. Create Data Layer Variable, version 2, named “DLV - event_id”, key event_id.
3. Create/update a Custom HTML Meta base tag using meta-base.html; trigger All Pages. Require additional consent ad_storage and ad_user_data. Fire once per page. The website only loads GTM after optional tracking consent.
4. Create/update a Custom HTML Lead tag using meta-lead.html. Trigger only the existing enquiry_success custom event trigger. Require additional consent ad_storage and ad_user_data. Sequence the base tag BEFORE the Lead tag, even if it already ran; its initialization guard prevents a second PageView.
5. Ensure all third-party marketing tags use the same consent checks. Website calls Google Consent Mode default denied before any GTM code, then update granted only after acceptance; rejection unloads third-party code by reload. No no-JavaScript tracking iframe is embedded because no consent can be collected without JavaScript.
6. Preview with consent accepted, Meta Test Events and browser network inspection: a genuine Google response success:true must yield one enquiry_success and one Meta Lead for this Pixel. Repeated click/same saved data must not create another. Visit/invalid form/failed response must yield zero Leads. Accepted PageView is expected and is not a Lead.
7. Test reject, fresh undecided visit, withdrawal, reload persistence and expiry: no Meta requests or replay of earlier enquiries. Success without consent intentionally yields zero tracking events.
8. Publish the reviewed GTM workspace with a meaningful version name. Record GTM version and actual Meta Lead request evidence/screenshots. Do not claim end-to-end completion until these steps pass.

The success payload contains only event, random event_id, form_id and marketing_consent. Names, email, mobile, budgets and project details are not pushed. The browser generates a new ID per save attempt. Save confirmation must be strict boolean true. Double clicks are locked while saving; re-submission of the same confirmed payload is suppressed within the page session. This is not server-side idempotency across reloads or devices.
