browser.runtime.onMessage.addListener(updateFormat);

function updateFormat(request, sender, sendResponse) {
    let page = document.querySelector('article .entry-content');
    if (request.fontScaling) {
        page.style.fontSize  = request.fontScaling+"%";
    } else if (request.fontColor) {
        page.style.color  = request.fontColor;
    } else if (request.bgColor) {
        page.style.background  = request.bgColor;
    } else if (request.widthScaling) {
        page.style.width  = request.widthScaling+"%";
    } else if (request.reset) {
        page.style.fontSize  = "";
        page.style.color  = "";
        page.style.background  = "";
        page.style.width  = "";
    }
}
