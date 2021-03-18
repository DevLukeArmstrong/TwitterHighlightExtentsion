
setInterval(() => {
  chrome.storage.sync.get("color", ({ color }) => {
    let links = document.getElementsByTagName("a");
    if( links !== null){
      links = Array.from(links);
      links.forEach((link) => {
        // Get a tags child if its datetime don't change
        if (link.firstChild.tagName !== 'TIME'){
          link.style.color = color;
        }
      });
    }
  });
}, 500);
