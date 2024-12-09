(() => {
  const activeElement = document.activeElement;

  if (activeElement && (activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable)) {
    // Extract selected text
    let selectedText;
    if (window.getSelection && window.getSelection().toString()) {
      selectedText = window.getSelection().toString();
    } else {
      alert("Please select text to generate a table.");
      return;
    }

    // Ensure selected text has two lines for "Before" and "After"
    const lines = selectedText.split("\n").map(line => line.trim()).filter(line => line !== "");
    if (lines.length < 2) {
      alert("Selected text must include at least two lines: one for 'Before' and one for 'After'.");
      return;
    }

    // Parse "Before" and "After"
    const beforeContent = lines[0]; // First line
    const afterContent = lines[1];  // Second line

    // Create the Markdown table
    const table = `
| Before       | After        |
|--------------|--------------|
| ${beforeContent} | ${afterContent} |
`;

    // Insert the table at the cursor position
    if (activeElement.tagName === "TEXTAREA") {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      const text = activeElement.value;

      activeElement.value = text.slice(0, start) + table + text.slice(end);
      activeElement.selectionStart = activeElement.selectionEnd = start + table.length;
    } else if (activeElement.isContentEditable) {
      document.execCommand("insertText", false, table);
    }
  } else {
    alert("Please focus on an editable field to insert the table.");
  }
})();
