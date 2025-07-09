// background.js
const scriptFileMap = {
  generateTable: "table.js",
  swapColumns: "swap.js",
  wrapIntoVideo: "wrapVideo.js",
};

chrome.runtime.onInstalled.addListener(() => {
  const items = [
    { id: "generateTable", title: "Generate Before/After Table" },
    { id: "swapColumns", title: "Swap Columns" },
    { id: "wrapIntoVideo", title: "Wrap into <video>" },
  ];

  items.forEach(item => {
    chrome.contextMenus.create({
      id: item.id,
      title: item.title,
      contexts: ["editable"],
    });
  });
});

function executeScript(tabId, file) {
  return chrome.scripting.executeScript({
    target: { tabId },
    files: [file]
  });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const scriptFile = scriptFileMap[info.menuItemId];
  if (scriptFile) {
    executeScript(tab.id, scriptFile);
  }
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (!sender.tab) return;

  const scriptFile = scriptFileMap[message.action];
  if (scriptFile) {
    executeScript(sender.tab.id, scriptFile);
  }
});