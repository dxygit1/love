// ========================================
// AI Bookmark Extension - Background Service Worker
// ========================================

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('AI Bookmark extension installed');
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getPageInfo') {
        // Get info from active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                sendResponse({
                    url: tabs[0].url,
                    title: tabs[0].title,
                    favicon: tabs[0].favIconUrl
                });
            } else {
                sendResponse({ error: 'No active tab' });
            }
        });
        return true; // Will respond asynchronously
    }

    if (request.action === 'extractPageContent') {
        // Send message to content script to extract more details
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'extractContent' }, (response) => {
                    sendResponse(response);
                });
            }
        });
        return true;
    }
});

// Handle keyboard shortcut (optional - can be configured in manifest)
chrome.commands?.onCommand?.addListener((command) => {
    if (command === 'save-bookmark') {
        // Open popup programmatically
        chrome.action.openPopup();
    }
});
