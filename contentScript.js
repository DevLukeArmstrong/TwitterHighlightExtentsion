
let black = "rgb(15, 20, 25)";
let white = "rgb(255, 255, 255)";

// Declare hover buttons, to check if they change
let highlightedElements;


function changeBackground(elements, color){
  if( elements !== null){
    elements = Array.from(elements);
    elements.forEach((element) => {
      element.style.backgroundColor = color;
    });
  }
}

function changeColor(elements, color){
  if( elements !== null){
    elements = Array.from(elements);
    elements.forEach((element) => {
      // Get a tags child if its datetime don't change
      if(!element.firstChild){
        element.style.color = color;
      } else if (element.firstChild.tagName !== 'TIME'){
        element.style.color = color;
      }
    });
  }
}

function setIconColor(parent, color){
    // From the icon parent, go down and get the g tag to set colour
    let icon = parent.firstChild.firstChild.firstChild.firstChild;
    icon.style.color = color;
}

function changeTabsColor(tabs, color) {
  if (tabs !== null){
    tabs = Array.from(tabs);
    tabs.forEach((tab) => {
      if(tab.classList.contains('r-18p3no4')){
        // Tab is active
        tab.firstChild.firstChild.style.color = color;
        tab.style.borderBottomColor = color;
      } else if (tab.classList.contains('r-zv2cs0')) {
        // Tab is hovered
        tab.firstChild.firstChild.style.color = color;
      } else {
        // tab is inactive and not hovered on
        tab.firstChild.firstChild.style.color = black;
        tab.style.borderBottomColor = 'transparent';
      }
    })
  }
}

setInterval(() => {
  chrome.storage.sync.get("color", ({ color }) => {
    // Set link tags
    let links = document.getElementsByTagName("a");
    changeColor(links, color);

    // Get all a tags that are tabs
    let tabs = document.querySelectorAll('[role="tab"]');
    changeTabsColor(tabs, color);

    // Set tweet button icon back to white
    let tIcon = document.querySelector('[aria-label="Tweet"]');
    if(tIcon.classList.contains('r-1v6e3re')){
      changeColor(tIcon.firstChild.firstChild.firstChild, white);
    }

    // Set all icons to colour
    let icons = document.getElementsByTagName('g');
    changeColor(icons, color);

    // Set the navbar icons back to black
    let navIcons = document.querySelectorAll('[data-testid="AppTabBar_Home_Link"], [data-testid="AppTabBar_Explore_Link"], [data-testid="AppTabBar_Notifications_Link"], [data-testid="AppTabBar_DirectMessage_Link"], [data-testid="AppTabBar_More_Menu"], [aria-label="Profile"], [aria-label="Bookmarks"], [aria-label="Lists"]');
    navIcons.forEach((parent) => {
      setIconColor(parent, black);

      // Change text colors
      if(parent.firstChild.children[1]){
        // Expanded view
        let text = parent.firstChild.children[1].firstChild;
        if(parent.firstChild.classList.contains('r-zv2cs0')){
          text.style.color = color;
        } else {
          text.style.color = black;
        }
      } else {
        // Small window view
        
      }
    });

    // Set navbar tweet button text white
    let navBtn = document.querySelector('[data-testid="SideNav_NewTweet_Button"]');
    setIconColor(navBtn, white);

    // Get all button elements we want to change
    // .r-urgr8i is classed on feed buttons
    let buttons = document.querySelectorAll('[data-testid="SideNav_NewTweet_Button"],[data-testid="tweetButtonInline"], .r-urgr8i');
    changeBackground(buttons, color);

  });
}, 200);

// Highlight colour class?
// .r-13gxpu9