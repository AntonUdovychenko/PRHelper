(() => {
    const activeElement = document.activeElement;

    if (!activeElement || (activeElement.tagName !== "TEXTAREA" && !activeElement.isContentEditable)) {
        console.log('Focus check failed:', {
            activeElement: activeElement,
            tagName: activeElement?.tagName,
            isContentEditable: activeElement?.isContentEditable,
            classList: activeElement?.classList?.value,
            id: activeElement?.id,
            parentElement: {
                tagName: activeElement?.parentElement?.tagName,
                classList: activeElement?.parentElement?.classList?.value
            }
        });
        alert(`Focus check failed:
- Active element: ${activeElement ? 'exists' : 'null'}
- Tag name: ${activeElement?.tagName || 'N/A'}
- Content editable: ${activeElement?.isContentEditable || false}
Please focus on a text field before clicking the button.`);
        return;
    }

    const selectedText = window.getSelection()?.toString();

    if (!selectedText) {
        alert("Please select the table first.");
        return;
    }

    function swapTableColumns(text) {
        return text.split("\n")
            .map((line, index) => {
                if (index === 0 || index === 1) return line;
                if (line.includes("|")) {
                    const cells = line.split("|").map(cell => cell.trim());
                    if (cells.length >= 3) {
                        [cells[1], cells[2]] = [cells[2], cells[1]];
                    }
                    return cells.join(" | ");
                }
                return line;
            })
            .join("\n");
    }

    handleEditorAction(activeElement, selectedText, swapTableColumns);
})();