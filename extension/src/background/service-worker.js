// ========================================
// AI Bookmark Extension - Background Service Worker
// ========================================

const API_BASE_URL = 'http://localhost:3000'; // Development URL

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('AI Bookmark extension installed');
    // Set default suggestion
    chrome.omnibox.setDefaultSuggestion({
        description: 'Search bookmarks for <match>%s</match>'
    });

    // Create Context Menu
    chrome.contextMenus.create({
        id: "save-to-ai-bookmark",
        title: "Save to AI Bookmark",
        contexts: ["page", "link"]
    });
});

// ----------------------------------------
// Context Menu Handler
// ----------------------------------------

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "save-to-ai-bookmark") {
        // Determine URL and Title
        const url = info.linkUrl || info.pageUrl;
        const title = tab.title || "Saved Link";

        // Show loading badge
        chrome.action.setBadgeText({ text: "..." });
        chrome.action.setBadgeBackgroundColor({ color: "#3b82f6" });

        try {
            const token = await getAccessToken();
            if (!token) {
                chrome.action.setBadgeText({ text: "LOGIN" });
                chrome.action.setBadgeBackgroundColor({ color: "#ef4444" });
                // Open popup to prompt login
                chrome.action.openPopup();
                return;
            }

            // Call API to save
            const response = await fetch(`${API_BASE_URL}/api/bookmarks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    url: url,
                    title: title,
                    // We can't easily get full page content from background for summary without extra messaging
                    // So we skip description for context menu quick-save, let AI classify by URL later
                })
            });

            if (!response.ok) throw new Error('Save failed');

            // Success feedback
            chrome.action.setBadgeText({ text: "OK" });
            chrome.action.setBadgeBackgroundColor({ color: "#22c55e" });

            // Clear badge after 3 seconds
            setTimeout(() => {
                chrome.action.setBadgeText({ text: "" });
            }, 3000);

        } catch (error) {
            console.error('Context menu save error:', error);
            chrome.action.setBadgeText({ text: "ERR" });
            chrome.action.setBadgeBackgroundColor({ color: "#ef4444" });
        }
    }
});

// Helper to get access token
async function getAccessToken() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['accessToken'], (result) => {
            resolve(result.accessToken || null);
        });
    });
}

// ----------------------------------------
// Omnibox Search Handler
// ----------------------------------------

// Debounce timer
let debounceTimer;

chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
    if (!text) return;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
        try {
            const token = await getAccessToken();
            if (!token) {
                suggest([
                    { content: API_BASE_URL, description: 'Please login to search bookmarks' }
                ]);
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/bookmarks?q=${encodeURIComponent(text)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Search failed');

            const bookmarks = await response.json();

            const suggestions = bookmarks.map(b => ({
                content: b.url,
                description: escapeXml(b.title) + ` <dim> - ${escapeXml(b.url)}</dim>`
            }));

            suggest(suggestions);

        } catch (error) {
            console.error('Omnibox search error:', error);
        }
    }, 300); // 300ms debounce
});

chrome.omnibox.onInputEntered.addListener((text, disposition) => {
    let url = text;
    // Basic URL validation/fix
    if (!text.startsWith('http://') && !text.startsWith('https://')) {
        url = 'https://' + text;
    }

    // Open the selected URL
    if (disposition === 'currentTab') {
        chrome.tabs.update({ url });
    } else {
        chrome.tabs.create({ url });
    }
});

// Helper to escape XML characters for Omnibox description
function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}


// ----------------------------------------
// Original Message Handlers
// ----------------------------------------

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

    if (request.action === 'searchBookmarks') {
        getAccessToken().then(token => {
            if (!token) {
                sendResponse({ error: 'Auth required' });
                return;
            }
            fetch(`${API_BASE_URL}/api/bookmarks?q=${encodeURIComponent(request.query)}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => sendResponse({ bookmarks: data }))
                .catch(err => sendResponse({ error: err.message }));
        });
        return true; // Async response
    }
});

// Handle keyboard shortcut (optional - can be configured in manifest)
chrome.commands?.onCommand?.addListener((command) => {
    if (command === 'save-bookmark') {
        // Open popup programmatically
        chrome.action.openPopup();
    }
});
