function insertActionBarButton() {
  const actionBars = document.querySelectorAll(CONSTANTS.SELECTORS.ACTION_BAR);
  actionBars.forEach((bar) => {
    if (bar.querySelector(`.${CONSTANTS.BUTTON_CLASSES.TABLE}`)) return;

    const itemContainer = bar.querySelector('[data-target="action-bar.itemContainer"]');
    if (!itemContainer) return;

    const buttons = [
      {
        className: CONSTANTS.BUTTON_CLASSES.TABLE,
        ariaLabel: "Insert Before/After Table",
        tooltip: "Create a before/after table",
        action: "generateTable",
        svgPath: "M3 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H3zm0 1.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5zm8 0h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5zm-8 6h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5zm8 0h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5z",
        onClick: () => chrome.runtime.sendMessage({ action: "generateTable" })
      },
      {
        className: CONSTANTS.BUTTON_CLASSES.SWAP,
        ariaLabel: "Swap Table Columns",
        tooltip: "Swap columns",
        action: "swapColumns",
        svgPath: "M5 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H5zm4.293 4.293a1 1 0 0 1 1.414 0L12 7.586l1.293-1.293a1 1 0 1 1 1.414 1.414L13.414 9l1.293 1.293a1 1 0 0 1-1.414 1.414L12 10.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L10.586 9 9.293 7.707a1 1 0 0 1 0-1.414zM11 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-2z",
        onClick: () => chrome.runtime.sendMessage({ action: "swapColumns" })
      },
      {
        className: CONSTANTS.BUTTON_CLASSES.VIDEO,
        ariaLabel: "Wrap selected text in <video>",
        tooltip: "Wrap selected text in &lt;video&gt",
        action: "wrapIntoVideo",
        svgPath: "M0 4.75A1.75 1.75 0 0 1 1.75 3h12.5A1.75 1.75 0 0 1 16 4.75v6.5A1.75 1.75 0 0 1 14.25 13H1.75A1.75 1.75 0 0 1 0 11.25v-6.5zM6 7.5L10 10V5L6 7.5z",
        onClick: () => chrome.runtime.sendMessage({ action: "wrapIntoVideo" })
      },
      {
        className: CONSTANTS.BUTTON_CLASSES.COOL,
        ariaLabel: "Insert :cool:",
        tooltip: "Insert :cool: emoji",
        action: "insertCool",
        svgPath: "M8 1.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5S1.5 11.59 1.5 8 4.41 1.5 8 1.5zM4.5 7.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S6 9.83 6 9s-.67-1.5-1.5-1.5zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S13 9.83 13 9s-.67-1.5-1.5-1.5zm-7.5 4h7c.28 0 .5-.22.5-.5s-.22-.5-.5-.5", // Simple smiley face icon
        onClick: () => chrome.runtime.sendMessage({ action: "insertCool" })
      }
    ];

    const divider = document.createElement("hr");
    divider.setAttribute("role", "presentation");
    divider.setAttribute("aria-hidden", "true");
    divider.setAttribute("data-targets", "action-bar.items");
    divider.setAttribute("data-view-component", "true");
    divider.className = "ActionBar-item ActionBar-divider";
    divider.style.visibility = "visible";

    itemContainer.appendChild(divider);

    buttons.forEach(buttonConfig => {
      itemContainer.appendChild(createActionButton(buttonConfig));
    });
  });
}

// Run once on load
document.addEventListener("DOMContentLoaded", insertActionBarButton);

// Also observe SPA changes
const observer = new MutationObserver(insertActionBarButton);
observer.observe(document.body, { childList: true, subtree: true });