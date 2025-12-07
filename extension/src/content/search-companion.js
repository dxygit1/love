// ========================================
// AI Bookmark - Search Companion Script
// ========================================

const QUERY_PARAM = 'q';

function getSearchQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(QUERY_PARAM);
}

function createSidebar(bookmarks) {
    if (!bookmarks || bookmarks.length === 0) return;

    // Remove existing sidebar if any
    const existing = document.getElementById('ai-bookmark-sidebar');
    if (existing) existing.remove();

    // Create container
    const sidebar = document.createElement('div');
    sidebar.id = 'ai-bookmark-sidebar';
    sidebar.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        width: 300px;
        background: white;
        border: 1px solid #dfe1e5;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        overflow: hidden;
        animation: slideIn 0.3s ease-out;
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        .ab-header {
            padding: 12px 16px;
            background: #f8f9fa;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .ab-title {
            font-size: 14px;
            font-weight: 600;
            color: #202124;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .ab-logo {
            width: 16px;
            height: 16px;
        }
        .ab-content {
            max-height: 400px;
            overflow-y: auto;
            padding: 8px 0;
        }
        .ab-item {
            display: block;
            padding: 8px 16px;
            text-decoration: none;
            color: #1a0dab;
            transition: background 0.1s;
        }
        .ab-item:hover {
            background: #f1f3f4;
        }
        .ab-item-title {
            font-size: 14px;
            margin-bottom: 2px;
            line-height: 1.4;
        }
        .ab-item-url {
            font-size: 12px;
            color: #006621;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .ab-close {
            cursor: pointer;
            color: #70757a;
            border: none;
            background: none;
            font-size: 18px;
            padding: 0;
        }
    `;
    document.head.appendChild(style);

    // Header
    sidebar.innerHTML = `
        <div class="ab-header">
            <span class="ab-title">
                <span>📑</span> AI Bookmarks
            </span>
            <button class="ab-close">&times;</button>
        </div>
        <div class="ab-content">
            ${bookmarks.map(b => `
                <a href="${b.url}" class="ab-item" target="_blank">
                    <div class="ab-item-title">${b.title || b.url}</div>
                    <div class="ab-item-url">${b.url}</div>
                </a>
            `).join('')}
        </div>
    `;

    // Close logic
    sidebar.querySelector('.ab-close').onclick = () => sidebar.remove();

    document.body.appendChild(sidebar);
}

// Main logic
async function init() {
    const query = getSearchQuery();
    if (!query) return;

    // Send message to background
    chrome.runtime.sendMessage({ action: 'searchBookmarks', query }, (response) => {
        if (response && response.bookmarks && response.bookmarks.length > 0) {
            createSidebar(response.bookmarks);
        }
    });
}

// Run
init();
