// auth-sync.js
// Runs on the main website (bookmark.teasytools.com) to sync auth state to the extension

function syncAuth() {
    try {
        console.log('[AI Bookmark] Checking for auth session...');

        // Read the explicit extension-auth key set by the website's providers.tsx
        const extensionAuthData = localStorage.getItem('extension-auth');

        if (extensionAuthData) {
            const extensionAuth = JSON.parse(extensionAuthData);

            if (extensionAuth && extensionAuth.token) {
                console.log('[AI Bookmark] Found extension-auth, syncing to extension...');

                // Send to background script
                chrome.runtime.sendMessage({
                    action: 'SYNC_AUTH',
                    payload: {
                        token: extensionAuth.token,
                        user: extensionAuth.user,
                        provider: 'website'
                    }
                }, (response) => {
                    if (chrome.runtime.lastError) {
                        // Extension might not be active
                        console.log('[AI Bookmark] Extension not responding:', chrome.runtime.lastError.message);
                    } else {
                        console.log('[AI Bookmark] Auth synced successfully!');
                    }
                });
                return; // Success
            }
        }

        // Fallback: Try finding Supabase token directly (legacy)
        let session = null;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
                const item = localStorage.getItem(key);
                if (item) {
                    session = JSON.parse(item);
                    break;
                }
            }
        }

        const userInfo = localStorage.getItem('user');
        const user = userInfo ? JSON.parse(userInfo) : null;

        if (session && session.access_token) {
            console.log('[AI Bookmark] Found Supabase session (fallback), syncing to extension...');

            chrome.runtime.sendMessage({
                action: 'SYNC_AUTH',
                payload: {
                    token: session.access_token,
                    user: user || session.user,
                    provider: 'website'
                }
            }, (response) => {
                if (chrome.runtime.lastError) {
                    console.log('[AI Bookmark] Extension not responding:', chrome.runtime.lastError.message);
                } else {
                    console.log('[AI Bookmark] Auth synced successfully (fallback)!');
                }
            });
        } else {
            console.log('[AI Bookmark] No auth session found.');
        }
    } catch (e) {
        console.error('[AI Bookmark] Auth sync failed:', e);
    }
}

// Sync locale to extension storage
function syncLocale() {
    try {
        const locale = localStorage.getItem('locale') || 'en';
        console.log('[AI Bookmark] Syncing locale:', locale);
        chrome.storage.sync.set({ locale: locale });
    } catch (e) {
        console.error('[AI Bookmark] Locale sync failed:', e);
    }
}

// Run immediately
syncAuth();
syncLocale();

// Run on storage changes (e.g. login/logout in another tab)
window.addEventListener('storage', (e) => {
    if (e.key === 'extension-auth' || e.key === 'user' || (e.key && e.key.startsWith('sb-'))) {
        console.log('[AI Bookmark] Storage change detected, re-syncing...');
        syncAuth();
    }
    if (e.key === 'locale') {
        console.log('[AI Bookmark] Locale change detected, re-syncing...');
        syncLocale();
    }
});

// Listen for direct updates from the website's React code
window.addEventListener('extension-auth-update', () => {
    console.log('[AI Bookmark] Auth update event received, re-syncing...');
    syncAuth();
});

// Listen for locale updates from website
window.addEventListener('extension-locale-update', () => {
    console.log('[AI Bookmark] Locale update event received, re-syncing...');
    syncLocale();
});
