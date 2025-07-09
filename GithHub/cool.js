(() => {
    const activeElement = document.activeElement;

    if (activeElement && (activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable)) {
        const text = activeElement.value || activeElement.textContent;
        const emoji = "🆒";
        
        if (activeElement.tagName === "TEXTAREA") {
            const start = activeElement.selectionStart;
            const end = activeElement.selectionEnd;
            
            activeElement.value = text.slice(0, start) + emoji + text.slice(end);
            activeElement.selectionStart = activeElement.selectionEnd = start + emoji.length;
        } else if (activeElement.isContentEditable) {
            document.execCommand("insertText", false, emoji);
        }
    } else {
        alert("Please focus on an editable field.");
    }
})();