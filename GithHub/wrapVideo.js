(() => {
    const activeElement = document.activeElement;

    if (activeElement && (activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable)) {
        // Extract selected text
        const selectedText = window.getSelection && window.getSelection().toString();

        if (!selectedText) {
            alert("Please select text to wrap into <video>.");
            return;
        }

        // Create the <video> tag without unwanted newlines or spaces
        const wrappedText = `<video src="${selectedText}" />`;

        // Insert the wrapped text at the cursor position
        if (activeElement.tagName === "TEXTAREA") {
            const start = activeElement.selectionStart;
            const end = activeElement.selectionEnd;
            const text = activeElement.value;

            activeElement.value = text.slice(0, start) + wrappedText + text.slice(end);
            activeElement.selectionStart = activeElement.selectionEnd = start + wrappedText.length;
        } else if (activeElement.isContentEditable) {
            document.execCommand("insertText", false, wrappedText);
        }
    } else {
        alert("Please focus on an editable field to wrap text into <video>.");
    }
})();