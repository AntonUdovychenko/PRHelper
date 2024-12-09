(() => {
  const activeElement = document.activeElement;

  if (activeElement && (activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable)) {
    // Extract content from the active element
    const content = activeElement.tagName === "TEXTAREA" 
      ? activeElement.value 
      : activeElement.innerText;

    // Extract selected text
    const selectedText = window.getSelection && window.getSelection().toString();

    if (!selectedText) {
      alert("Please select the table first.");
      return;
    }

    // Process the selected table
    const swappedTable = selectedText
      .split("\n")
      .map((line, index) => {
        if (index === 0 || index === 1) {
          // Skip headers and separator line
          return line;
        }

        if (line.includes("|")) {
          const cells = line.split("|").map((cell) => cell.trim());
          if (cells.length >= 3) {
            // Swap the "Before" and "After" columns
            [cells[1], cells[2]] = [cells[2], cells[1]];
          }
          return cells.join(" | ");
        }

        return line;
      })
      .join("\n");

    // Replace the original table with the swapped version
    if (activeElement.tagName === "TEXTAREA") {
      activeElement.value = content.replace(selectedText, swappedTable);
    } else if (activeElement.isContentEditable) {
      activeElement.innerText = content.replace(selectedText, swappedTable);
    }
  } else {
    alert("Please focus on an editable field to swap columns.");
  }
})();
