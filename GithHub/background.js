chrome.runtime.onInstalled.addListener(() => {
  const items = [
    { id: "generateTable", title: "Generate Before/After Table" },
    { id: "swapColumns", title: "Swap Columns" },
    { id: "wrapIntoVideo", title: "Wrap into <video>" },
  ];

  for (const item of items) {
    chrome.contextMenus.create({
      id: item.id,
      title: item.title,
      contexts: ["editable"],
    });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const scriptFileMap = {
    generateTable: "content.js",
    swapColumns: "swap.js",
    wrapIntoVideo: "wrapVideo.js",
  };

  const scriptFile = scriptFileMap[info.menuItemId];
  if (scriptFile) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: [scriptFile],
    });
  }
});

// ✅ Add this to respond to messages from page-injected buttons
chrome.runtime.onMessage.addListener((message, sender) => {
  if (!sender.tab) return; // Skip if no tab (e.g. from popup)

  if (message.action === "swapColumns") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["swap.js"],
    });
  } else if (message.action === "generateTable") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["content.js"],
    });
  } else if (message.action === "wrapIntoVideo") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["wrapVideo.js"],
    });
  }
});
