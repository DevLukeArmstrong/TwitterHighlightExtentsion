let regex = /(https|http):\/\/twitter.com*/i;

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
let gitBtn = document.getElementById("git");
let coffeeBtn = document.getElementById("coffee");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.setAttribute('value', color);
  console.log(changeColor.style.value);
});


// When the button is clicked, change saved colour
saveBtn.addEventListener("click", async () => {
  // Get and set new value
  let color = changeColor.value;
  chrome.storage.sync.set({ color });

});

gitBtn.addEventListener("click", () => {
  window.open("https://github.com/DevLukeArmstrong",'_blank');
});


coffeeBtn.addEventListener("click", () => {
  window.open("https://www.buymeacoffee.com/MagmusOptimimus",'_blank');
});
