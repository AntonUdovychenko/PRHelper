(function() {
    // Find the element that shows the ticket key text
    // Adjust selectors if your Jira has different markup
    const ticketElement = document.querySelector(
        '#key-val, [data-test-id="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"]'
    );

    if (!ticketElement) {
        console.warn('JIRA Copy Ticket Extension: Ticket element not found.');
        return;
    }

    const ticketKey = ticketElement.textContent.trim();

    // Copy ticket
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.style.marginLeft = '8px';
    button.style.padding = '4px 8px';
    button.style.fontSize = '12px';
    button.style.backgroundColor = '#0052CC';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '3px';
    button.style.cursor = 'pointer';

    // Click handler
    button.addEventListener('click', () => {
        navigator.clipboard.writeText(ticketKey).then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy ticket key:', err);
        });
    });

    // Insert the button right after the ticket text
    ticketElement.parentNode.insertBefore(button, ticketElement.nextSibling);


    // Copy branch
    const gitbranch = document.createElement('button');
    gitbranch.textContent = 'Git';
    gitbranch.style.marginLeft = '8px';
    gitbranch.style.padding = '4px 8px';
    gitbranch.style.fontSize = '12px';
    gitbranch.style.backgroundColor = '#0052CC';
    gitbranch.style.color = 'white';
    gitbranch.style.border = 'none';
    gitbranch.style.borderRadius = '3px';
    gitbranch.style.cursor = 'pointer';

     // Click handler
    gitbranch.addEventListener('click', () => {
        const gitText = `au/${ticketKey}`;
        navigator.clipboard.writeText(gitText).then(() => {
            gitbranch.textContent = 'Copied!';
            setTimeout(() => {
                gitbranch.textContent = 'Git';
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy ticket key:', err);
        });
    });

    // Insert the button right after the ticket text
    ticketElement.parentNode.insertBefore(gitbranch, button.nextSibling);
})();
