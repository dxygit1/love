// ========================================
// AI Bookmark Extension - Background Service Worker
// ========================================

const API_BASE_URL = 'https://bookmark.teasytools.com'; // Production URL

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
        // 1. Try storage first
        chrome.storage.sync.get(['authToken'], (result) => {
            if (result.authToken) {
                resolve(result.authToken);
            } else {
                // 2. Fallback: Try to read cookie directly from background
                chrome.cookies.get({
                    url: API_BASE_URL,
                    name: 'ai-bookmark-auth'
                }, (cookie) => {
                    if (cookie && cookie.value) {
                        try {
                            const decoded = decodeURIComponent(cookie.value);
                            const session = JSON.parse(decoded);
                            const token = session.access_token || session.token;

                            if (token) {
                                // Sync back to storage for future use
                                chrome.storage.sync.set({
                                    authToken: token,
                                    user: session.user
                                });
                                resolve(token);
                                return;
                            }
                        } catch (e) {
                            console.error('[Background] Failed to parse auth cookie:', e);
                        }
                    }
                    resolve(null);
                });
            }
        });
    });
}

// Classify page via AI API
async function classifyPage(pageData) {
    try {
        const token = await getAccessToken();
        if (!token) {
            return { success: false, error: 'Not authenticated' };
        }

        // Get user ID from storage for quota tracking
        const userId = await new Promise(resolve => {
            chrome.storage.sync.get(['user'], (result) => {
                resolve(result.user?.id || null);
            });
        });

        const response = await fetch(`${API_BASE_URL}/api/classify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                url: pageData.url,
                title: pageData.title,
                description: pageData.description,
                locale: pageData.locale || 'en',
                userId: userId // Pass userId for quota tracking!
            })
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        } else {
            const err = await response.text();
            return { success: false, error: err || 'Classification failed' };
        }
    } catch (error) {
        console.error('[Background] Classify error:', error);
        return { success: false, error: error.message };
    }
}

// Save bookmark to API
async function saveBookmark(data) {
    try {
        let token = await getAccessToken();

        if (!token) {
            return { success: false, code: 401, message: 'Not authenticated' };
        }

        const saveRequest = async (authToken) => {
            return fetch(`${API_BASE_URL}/api/bookmarks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    url: data.url,
                    title: data.title,
                    description: data.description || '',
                    tags: data.category ? [data.category] : []
                })
            });
        };

        let response = await saveRequest(token);

        // Auto-retry on 401 (Session expired)
        if (response.status === 401) {
            console.log('[Background] Token expired, attempting refresh from cookie...');
            // Clear storage to force cookie read
            await new Promise(resolve => chrome.storage.sync.remove(['authToken', 'user'], resolve));

            // Get fresh token (will read from cookie now)
            token = await getAccessToken();

            if (token) {
                console.log('[Background] Got fresh token, retrying save...');
                response = await saveRequest(token);
            } else {
                return { success: false, code: 401, message: 'Session expired, login required' };
            }
        }

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return { success: false, message: err.message || 'Save failed' };
        }

        return { success: true };

    } catch (error) {
        console.error('[Background] Save bookmark error:', error);
        return { success: false, message: error.message };
    }
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
    if (request.action === 'SYNC_AUTH') {
        const { token, user } = request.payload;
        if (token) {
            chrome.storage.sync.set({
                authToken: token,
                user: user,
                lastSync: Date.now()
            }, () => {
                console.log('[Background] Auth synced:', user?.email);
                sendResponse({ success: true });
            });
        }
        return true; // Keep channel open
    }

    if (request.action === 'SAVE_CURRENT_PAGE') {
        saveBookmark(request.data).then(result => {
            sendResponse(result);
        });
        return true; // Keep channel open
    }

    if (request.action === 'CHECK_AUTH_STATUS') {
        chrome.storage.sync.get(['authToken'], (result) => {
            sendResponse({ isAuthenticated: !!result.authToken });
        });
        return true;
    }

    if (request.action === 'CLASSIFY_PAGE') {
        classifyPage(request.data).then(result => {
            sendResponse(result);
        });
        return true; // Keep channel open for async response
    }

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
