// table.js
(() => {
    const activeElement = document.activeElement;
    const selectedText = window.getSelection()?.toString();

    if (!activeElement || (activeElement.tagName !== "TEXTAREA" && !activeElement.isContentEditable)) {
        alert("Please focus on a text field before clicking the button.");
        return;
    }

    const lines = selectedText?.split("\n")
        .map(line => line.trim())
        .filter(Boolean);

    if (!lines || lines.length < 2) {
        alert("Selected text must include at least two lines: one for 'Before' and one for 'After'.");
        return;
    }

    const table = `\n| Before | After |\n|--------|--------|\n| ${lines[0]} | ${lines[1]} |\n`;
    handleEditorAction(activeElement, selectedText, () => table);
})();