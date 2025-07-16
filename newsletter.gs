// Google Apps Script code to handle newsletter form submissions
function doPost(e) {
  // Get the spreadsheet and sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Newsletter Subscribers') || ss.insertSheet('Newsletter Subscribers');
  
  // Parse the incoming data
  const data = JSON.parse(e.postData.contents);
  const email = data.email;
  const timestamp = new Date();
  
  // If this is the first entry, create headers
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Email']);
  }
  
  // Add the new subscriber
  sheet.appendRow([timestamp, email]);
  
  // Return success response
  return ContentService.createTextOutput(JSON.stringify({
    'status': 'success',
    'message': 'Subscription successful'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Add CORS headers
function doOptions(e) {
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
  
  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
} 