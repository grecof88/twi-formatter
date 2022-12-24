/* initialise variables */
let twi_url = "https://wanderinginn.com";

let fSizeSlider = document.querySelector('#fontScaling');
let fColorPicker = document.querySelector('#fontColor');
let pSizeSlider = document.querySelector('#widthScaling');
let pColorPicker = document.querySelector('#bgColor');


let reset = document.querySelector('#reset-style button');
let cookieVal = {   
    fontScaling : '',
    fontColor : '',
    bgColor : '',
    widthScaling : ''
};

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
  //return browser.tabs.getCurrent();
}

function setCookie(cookie, url) {
    browser.cookies.set({
        url: url,
        name: "formatpicker",
        expirationDate: Math.floor(Date.now()/1000) + (5*365*24*60*60), //5 years from creation
        value: JSON.stringify(cookie)
      })
}

/* apply backgrounds to buttons */
/* add listener so that when clicked, button applies background to page HTML */
fSizeSlider.addEventListener('change', (event) => {
    getActiveTab().then((tabs) => {
        cookieVal.fontScaling = event.target.value
        console.log('font size: '+event.target.value);
        browser.tabs.sendMessage(tabs[0].id, {fontScaling: event.target.value});
        setCookie(cookieVal, twi_url);
    });
  });
fColorPicker.addEventListener('change', (event) => {
    getActiveTab().then((tabs) => {
        cookieVal.fontColor = event.target.value
        console.log('font color: '+event.target.value);
        browser.tabs.sendMessage(tabs[0].id, {fontColor: event.target.value});
        setCookie(cookieVal, twi_url);
    });
  });
pSizeSlider.addEventListener('change', (event) => {
    getActiveTab().then((tabs) => {
        cookieVal.widthScaling = event.target.value
        console.log('page size: '+event.target.value);
        browser.tabs.sendMessage(tabs[0].id, {widthScaling: event.target.value});
        setCookie(cookieVal, twi_url);
    });
  });
pColorPicker.addEventListener('change', (event) => {
    getActiveTab().then((tabs) => {
        cookieVal.bgColor = event.target.value
        console.log('page color: '+event.target.value);
        browser.tabs.sendMessage(tabs[0].id, {bgColor: event.target.value});
        setCookie(cookieVal, twi_url);
    });
  });

/* reset */

reset.onclick = function() {
  getActiveTab().then((tabs) => {
    fSizeSlider.value = 100;
    pSizeSlider.value = 50;
    browser.tabs.sendMessage(tabs[0].id, {reset: true});

    cookieVal = {
        fontScaling : '',
        fontColor : '',
        bgColor : '',
        widthScaling : ''
    };
    browser.cookies.remove({
      url: twi_url,
      name: "formatpicker" 
    })
  });
}


/* Report cookie changes to the console */
/*
browser.cookies.onChanged.addListener((changeInfo) => {
  console.log(`Cookie changed:\n
              * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
              * Cause: ${changeInfo.cause}\n
              * Removed: ${changeInfo.removed}`);
});
*/