/* Retrieve any previously set cookie and send to content script */

let twi_url = "https://wanderinginn.com";
function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
}
  
function cookieUpdate() {
    getActiveTab().then((tabs) => {
      // get any previously set cookie for the current tab 
      let gettingCookies = browser.cookies.get({
        url: twi_url,
        name: "formatpicker"
      });
      gettingCookies.then((cookie) => {
        if (cookie) {
          let cookieVal = JSON.parse(cookie.value);
          browser.tabs.sendMessage(tabs[0].id, {fontScaling: cookieVal.fontScaling});
          browser.tabs.sendMessage(tabs[0].id, {fontColor: cookieVal.fontColor});
          browser.tabs.sendMessage(tabs[0].id, {bgColor: cookieVal.bgColor});
          browser.tabs.sendMessage(tabs[0].id, {widthScaling: cookieVal.width});
        }
      });
    }); 
  }
  
  // update when the tab is updated
  browser.tabs.onUpdated.addListener(cookieUpdate);
  // update when the tab is activated
  browser.tabs.onActivated.addListener(cookieUpdate);
  