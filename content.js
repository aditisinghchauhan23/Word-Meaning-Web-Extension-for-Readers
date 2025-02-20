let tooltip = null;

document.addEventListener('mouseup', async function(event) {
    const selectedText = window.getSelection().toString().trim();
    
    // Remove existing tooltip
    if (tooltip) {
        document.body.removeChild(tooltip);
        tooltip = null;
    }
    
    if (selectedText.length > 0) {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`);
            const data = await response.json();
            
            if (data && data[0]) {
                const definition = data[0].meanings[0].definitions[0].definition;
                
                // Create tooltip
                tooltip = document.createElement('div');
                tooltip.className = 'dictionary-tooltip';
                tooltip.textContent = definition;
                
                // Position tooltip near the selected text
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                
                tooltip.style.left = `${rect.left + window.scrollX}px`;
                tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
                
                document.body.appendChild(tooltip);
            }
        } catch (error) {
            console.error('Error fetching definition:', error);
        }
    }
});

// Close tooltip when clicking outside
document.addEventListener('mousedown', function(event) {
    if (tooltip && !tooltip.contains(event.target)) {
        document.body.removeChild(tooltip);
        tooltip = null;
    }
});