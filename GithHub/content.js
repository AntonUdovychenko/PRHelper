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