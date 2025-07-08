(() => {
  // Save current selection text
  const selectionText = window.getSelection && window.getSelection().toString();
  const activeElement = document.querySelector("textarea:focus, [contenteditable='true']:focus");

  if (!activeElement) {
    alert("Please focus on an editable field to swap columns.");
    return;
  }

  const content =
    activeElement.tagName === "TEXTAREA"
      ? activeElement.value
      : activeElement.innerText;

  const selectedText = selectionText;
  if (!selectedText) {
    alert("Please select the table first.");
    return;
  }

  const swappedTable = selectedText
    .split("\n")
    .map((line, index) => {
      if (index === 0 || index === 1) return line; // header + separator

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
})();
