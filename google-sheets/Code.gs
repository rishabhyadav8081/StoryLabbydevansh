// Paste into Extensions > Apps Script in your destination Google Sheet.
// Run setup once, then deploy as a Web app: Execute as Me; access Anyone.
function setup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Open this script from your Google Sheet.');
  PropertiesService.getScriptProperties().setProperty('SHEET_ID', spreadsheet.getId());
  getEnquirySheet_(spreadsheet);
}
function getEnquirySheet_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName('Enquiries') || spreadsheet.insertSheet('Enquiries');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Received at', 'Name', 'Email', 'Mobile', 'Brand / Company', 'Service', 'Budget range', 'Project details']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const data = JSON.parse(e.postData.contents);
    const limits = {name:200,email:320,mobile:25,brand:300,service:200,budget:100,message:10000};
    Object.keys(limits).forEach(function(key) {
      if (typeof data[key] !== 'string' || data[key].length > limits[key]) throw new Error('Invalid field: ' + key);
    });
    if (!data.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || !/^[+0-9() .-]{7,25}$/.test(data.mobile) || !data.budget || !data.message.trim()) throw new Error('Please complete the required fields.');
    lock.waitLock(10000);
    const id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
    if (!id) throw new Error('Run setup first.');
    const sheet = getEnquirySheet_(SpreadsheetApp.openById(id));
    // Keep untrusted input as text, including values that resemble formulas.
    const safe = function(value) { return /^[\s]*[=+\-@]/.test(value) ? "'" + value : value; };
    sheet.appendRow([new Date()].concat(['name','email','mobile','brand','service','budget','message'].map(function(key) { return safe(data[key]); })));
    return json_({success:true});
  } catch (error) {
    return json_({success:false,error:'Unable to save enquiry. Check required fields and deployment setup.'});
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
