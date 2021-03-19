let color = '#1DA1F2';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background colour set to %cgreen', `color: ${color}`);
});
