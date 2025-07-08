function insertActionBarButton() {
  const actionBars = document.querySelectorAll(".ActionBar");
  actionBars.forEach((bar) => {
    // Skip if already injected
    if (bar.querySelector(".gh-insert-table-button")) return;

    // Create wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "ActionBar-item";
    wrapper.setAttribute("data-view-component", "true");
    wrapper.setAttribute("data-offset-width", "32");
    wrapper.style.visibility = "visible";

    // Create button
    const button = document.createElement("button");
    button.type = "button";
    button.className = "Button Button--iconOnly Button--invisible Button--medium gh-insert-table-button";
    button.setAttribute("aria-label", "Insert Before/After Table");
    button.innerHTML = `
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" class="octicon">
        <path d="M1 3.75A.75.75 0 0 1 1.75 3h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 3.75Zm0 4A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75Zm.75 3.25a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5H1.75Z"></path>
      </svg>
    `;

    button.addEventListener("mousedown", () => {
      // Capture selected text BEFORE focus changes
      const selection = window.getSelection().toString();
      const active = document.activeElement;

      // Defer action until after button is clicked
      setTimeout(() => {
        if (
          active &&
          (active.tagName === "TEXTAREA" || active.isContentEditable)
        ) {
          const lines = selection
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);

          if (lines.length < 2) {
            alert("Selected text must include at least two lines: one for 'Before' and one for 'After'.");
            return;
          }

          const beforeContent = lines[0];
          const afterContent = lines[1];
          const table = `\n| Before | After |\n|--------|--------|\n| ${beforeContent} | ${afterContent} |\n`;

          if (active.tagName === "TEXTAREA") {
            const start = active.selectionStart;
            const end = active.selectionEnd;
            const text = active.value;

            active.value = text.slice(0, start) + table + text.slice(end);
            active.selectionStart = active.selectionEnd = start + table.length;
          } else if (active.isContentEditable) {
            document.execCommand("insertText", false, table);
          }
        } else {
          alert("Please focus on a text field before clicking the button.");
        }
      }, 0); // or use requestAnimationFrame(() => { ... })
    });

    wrapper.appendChild(button);

    // --- Swap Columns Button ---
    const swapWrapper = document.createElement("div");
    swapWrapper.className = "ActionBar-item";
    swapWrapper.setAttribute("data-view-component", "true");
    swapWrapper.setAttribute("data-offset-width", "32");
    swapWrapper.style.visibility = "visible";

    const swapButton = document.createElement("button");
    swapButton.type = "button";
    swapButton.className = "Button Button--iconOnly Button--invisible Button--medium gh-swap-columns-button";
    swapButton.setAttribute("aria-label", "Swap Table Columns");
    swapButton.innerHTML = `
      <svg aria-hidden="true" height="16" width="16" viewBox="0 0 16 16" class="octicon">
        <path d="M1.75 8a.75.75 0 0 1 .75-.75h11.69l-2.22-2.22a.75.75 0 1 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06-1.06L14.19 8.75H2.5A.75.75 0 0 1 1.75 8Z"/>
      </svg>
    `;

    swapButton.addEventListener("mousedown", () => {
      const activeElement = document.activeElement;
      const selectedText = window.getSelection().toString();

      setTimeout(() => {
        if (
          !activeElement ||
          (activeElement.tagName !== "TEXTAREA" && !activeElement.isContentEditable)
        ) {
          alert("Please focus on an editable field to swap columns.");
          return;
        }

        if (!selectedText) {
          alert("Please select the table first.");
          return;
        }

        const content =
          activeElement.tagName === "TEXTAREA"
            ? activeElement.value
            : activeElement.innerText;

        const swappedTable = selectedText
          .split("\n")
          .map((line, index) => {
            if (index === 0 || index === 1) return line;

            if (line.includes("|")) {
              const cells = line.split("|").map((cell) => cell.trim());
              if (cells.length >= 3) {
                [cells[1], cells[2]] = [cells[2], cells[1]];
              }
              return cells.join(" | ");
            }

            return line;
          })
          .join("\n");

        if (activeElement.tagName === "TEXTAREA") {
          activeElement.value = content.replace(selectedText, swappedTable);
        } else if (activeElement.isContentEditable) {
          activeElement.innerText = content.replace(selectedText, swappedTable);
        }
      }, 0);
    });
    swapWrapper.appendChild(swapButton);

    // --- Wrap into <video> Button ---
    const videoWrapper = document.createElement("div");
    videoWrapper.className = "ActionBar-item";
    videoWrapper.setAttribute("data-view-component", "true");
    videoWrapper.setAttribute("data-offset-width", "32");
    videoWrapper.style.visibility = "visible";

    const videoButton = document.createElement("button");
    videoButton.type = "button";
    videoButton.className = "Button Button--iconOnly Button--invisible Button--medium gh-wrap-video-button";
    videoButton.setAttribute("aria-label", "Wrap selected text in <video>");

    videoButton.innerHTML = `
      <svg aria-hidden="true" height="16" width="16" viewBox="0 0 16 16" class="octicon">
        <path d="M1.75 3A1.75 1.75 0 0 0 0 4.75v6.5C0 12.216.784 13 1.75 13h12.5A1.75 1.75 0 0 0 16 11.25v-6.5A1.75 1.75 0 0 0 14.25 3H1.75Zm12.5 1.5c.138 0 .25.112.25.25v6.5c0 .138-.112.25-.25.25H1.75a.25.25 0 0 1-.25-.25v-6.5c0-.138.112-.25.25-.25h12.5Z"></path>
      </svg>
    `;

    videoButton.addEventListener("mousedown", () => {
      const activeElement = document.activeElement;
      const selectedText = window.getSelection().toString();

      setTimeout(() => {
        if (
          !activeElement ||
          (activeElement.tagName !== "TEXTAREA" && !activeElement.isContentEditable)
        ) {
          alert("Please focus on an editable field to wrap text into <video>.");
          return;
        }

        if (!selectedText) {
          alert("Please select text to wrap into <video>.");
          return;
        }

        const cleanedSrc = selectedText.replace(/\s+$/, ""); // trim trailing newline/space
        const wrappedText = `<video src="${cleanedSrc}" />`;

        if (activeElement.tagName === "TEXTAREA") {
          const start = activeElement.selectionStart;
          const end = activeElement.selectionEnd;
          const text = activeElement.value;

          activeElement.value =
            text.slice(0, start) + wrappedText + text.slice(end);
          activeElement.selectionStart =
            activeElement.selectionEnd =
            start + wrappedText.length;
        } else if (activeElement.isContentEditable) {
          document.execCommand("insertText", false, wrappedText);
        }
      }, 0);
    });


    videoWrapper.appendChild(videoButton);

    const divider = document.createElement("div");
    divider.className = "ActionBar-separator";
    divider.setAttribute("data-view-component", "true");

    bar.appendChild(divider);
    bar.appendChild(wrapper);
    bar.appendChild(swapWrapper);
    bar.appendChild(videoWrapper);
  });
}

console.log("Script running");
console.log("Active element:", document.activeElement);
console.log("Selected text:", window.getSelection().toString());

// Run once on load
document.addEventListener("DOMContentLoaded", insertActionBarButton);

// Also observe SPA changes
const observer = new MutationObserver(insertActionBarButton);
observer.observe(document.body, { childList: true, subtree: true });
