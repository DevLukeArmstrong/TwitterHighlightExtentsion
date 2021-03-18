// Initialize button with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  // changeColor.style.backgroundColor = color;
});


// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setLinkColors,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    // document.body.style.backgroundColor = color;
  });
}

function setLinkColors() {
  chrome.storage.sync.get("color", ({ color }) => {
    let links = document.getElementsByTagName("a");
    links = Array.from(links);
    links.forEach((link) => {
      // Get a tags child if its datetime don't change
      if (link.firstChild.tagName !== 'TIME'){
        link.style.color = color;
      }
    });
  });
}