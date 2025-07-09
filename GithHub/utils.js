const CONSTANTS = {
    BUTTON_CLASSES: {
        BASE: "Button Button--iconOnly Button--invisible Button--medium",
        TABLE: "gh-insert-table-button",
        SWAP: "gh-swap-columns-button",
        VIDEO: "gh-wrap-video-button",
        COOL: "gh-insert-cool-button"
    },
    SELECTORS: {
        ACTION_BAR: ".ActionBar",
        EDITABLE: "textarea:focus, [contenteditable='true']:focus",
        TOP_LAYER: "#top-layer"
    },
    SCRIPTS: {
        generateTable: null,
        swapColumns: null,
        wrapIntoVideo: null
    }
};

function createTooltip(text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'Overlay Overlay--size-auto Overlay--placement-bottom tooltipped-overlay';
    tooltip.style.position = 'absolute';
    tooltip.style.display = 'none';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.innerHTML = `
        <div class="Overlay-body Tooltip" style="background: #24292f; color: #ffffff; border-radius: 6px; padding: 6px 8px; font-size: 12px; line-height: 16px; white-space: nowrap;">
            <div class="Tooltip-body text-center">
                ${text}
            </div>
        </div>
    `;
    return tooltip;
}

function handleEditorAction(activeElement, selectedText, transformFn) {
    if (activeElement.tagName === "TEXTAREA") {
        const start = activeElement.selectionStart;
        const end = activeElement.selectionEnd;
        const text = activeElement.value;
        const result = transformFn(selectedText);
        
        activeElement.value = text.slice(0, start) + result + text.slice(end);
        activeElement.selectionStart = activeElement.selectionEnd = start + result.length;
    } else if (activeElement.isContentEditable) {
        document.execCommand("insertText", false, transformFn(selectedText));
    }
}

function getOrCreateTopLayer() {
    let topLayer = document.querySelector(CONSTANTS.SELECTORS.TOP_LAYER);
    if (!topLayer) {
        topLayer = document.createElement('div');
        topLayer.id = 'top-layer';
        topLayer.style.position = 'fixed';
        topLayer.style.zIndex = '100';
        topLayer.style.pointerEvents = 'none';
        
        // Insert at the beginning of <html>
        const html = document.documentElement;
        html.insertBefore(topLayer, html.firstChild);
    }
    return topLayer;
}

function createActionButton(options) {
    const { className, ariaLabel, svgPath, onClick, tooltip, action } = options;

    const wrapper = document.createElement("div");
    wrapper.className = "ActionBar-item position-relative";
    wrapper.setAttribute("data-view-component", "true");
    wrapper.setAttribute("data-offset-width", "32");
    wrapper.style.visibility = "visible";

    const button = document.createElement("button");
    button.type = "button";
    button.className = `${CONSTANTS.BUTTON_CLASSES.BASE} ${className}`;
    button.setAttribute("aria-label", ariaLabel);
    button.innerHTML = `
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" class="octicon">
            <path d="${svgPath}"/>
        </svg>
    `;

    button.addEventListener('mousedown', (e) => {
        // Prevent the button from taking focus
        e.preventDefault();
    });

    button.addEventListener('click', async (e) => {
        try {
            await onClick();
        } catch (error) {
            if (action && CONSTANTS.SCRIPTS[action]) {
                const script = document.createElement('script');
                script.textContent = CONSTANTS.SCRIPTS[action];
                document.body.appendChild(script);
                script.remove();
            }
        }
    });


    if (tooltip) {
        const tooltipElement = createTooltip(tooltip);
        tooltipElement.style.pointerEvents = 'none';
        
        button.addEventListener("mouseenter", (event) => {
            const rect = button.getBoundingClientRect();
            tooltipElement.style.left = `${rect.left + (rect.width / 2)}px`;
            tooltipElement.style.top = `${rect.bottom + 8}px`;
            tooltipElement.style.transform = 'translateX(-50%)';
            tooltipElement.style.display = 'block';
            getOrCreateTopLayer().appendChild(tooltipElement);
        });

        button.addEventListener("mouseleave", () => {
            tooltipElement.style.display = 'none';
            if (tooltipElement.parentElement) {
                tooltipElement.parentElement.removeChild(tooltipElement);
            }
        });
    }

    wrapper.appendChild(button);
    return wrapper;
}

// Add this utility function to generate a unique selector for an element
function getCssSelector(element) {
    if (!element) return '';

    if (element.id) {
        return `#${element.id}`;
    }

    if (element.className) {
        const classes = Array.from(element.classList).join('.');
        return `.${classes}`;
    }

    let path = [];
    let current = element;
    while (current) {
        let selector = current.tagName.toLowerCase();
        if (current.className) {
            selector += `.${Array.from(current.classList).join('.')}`;
        }
        path.unshift(selector);
        current = current.parentElement;
    }

    return path.join(' ');
}

