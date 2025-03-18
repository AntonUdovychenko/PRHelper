chrome.runtime.onInstalled.addListener(() => {
  // Create "Generate Table" context menu
  chrome.contextMenus.create({
    id: "generateTable",
    title: "Generate Table",
    contexts: ["editable"],
  });

  // Create "Swap Columns" context menu
  chrome.contextMenus.create({
    id: "swapColumns",
    title: "Swap Columns",
    contexts: ["editable"],
  });

  // Create "Wrap into <video>" context menu
  chrome.contextMenus.create({
    id: "wrapIntoVideo",
    title: "Wrap into <video>",
    contexts: ["editable"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "generateTable") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
  } else if (info.menuItemId === "swapColumns") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["swap.js"],
    });
  } else if (info.menuItemId === "wrapIntoVideo") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["wrapVideo.js"],
    });
  }
});