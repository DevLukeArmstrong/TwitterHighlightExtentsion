let regex = /(https|http):\/\/twitter.com*/i;
let defaultColor = "#1DA1F2";

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  if ( regex.test(tabs[0].url) ) {
    document.getElementById("h2Title").innerText = "Twitter Link Colour Picker";
  } else {
    console.log("did not match");
    document.getElementById("h2Title").innerText = "Please navigate to Twitter";
  }
});


// Initialize button with users's prefered color
let changeColor = document.getElementById("pickedColour");
let saveBtn = document.getElementById("save");
let resetBtn = document.getElementById("reset");
let gitBtn = document.getElementById("git");
let coffeeBtn = document.getElementById("coffee");

chrome.storage.sync.get("color", ({ color }) => {
  console.log(color);
  changeColor.setAttribute('value', color);
});


// When the button is clicked, change saved colour
saveBtn.addEventListener("click", () => {
  // Get and set new value
  let color = changeColor.value;
  chrome.storage.sync.set({ color });

});

resetBtn.addEventListener("click", () => {
  // Get and set original color
  chrome.storage.sync.set({ color: defaultColor });
  changeColor.setAttribute('value', defaultColor);
});


gitBtn.addEventListener("click", () => {
  window.open("https://github.com/DevLukeArmstrong",'_blank');
});


coffeeBtn.addEventListener("click", () => {
  window.open("https://www.buymeacoffee.com/MagmusOptimimus",'_blank');
});
