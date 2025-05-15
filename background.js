chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("prehraj.to")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractVideoLinkAndSend
    });
  } else {
    console.log("This extension only works on prehraj.to!");
  }
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'open_video_link' && message.link) {
    chrome.tabs.create({ url: message.link });
  }
});

// This function will run inside the page
function extractVideoLinkAndSend() {
  const video = document.querySelector('video.vjs-tech#content_video_html5_api');
  if (video && video.src) {
    chrome.runtime.sendMessage({ type: 'open_video_link', link: video.src });
  } else {
    alert("Video not found on this page.");
    console.log("Video not found.");
  }
}
