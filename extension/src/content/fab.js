// Configuration
const API_BASE_URL = 'https://bookmark.teasytools.com';
const LOGIN_URL = 'https://bookmark.teasytools.com/login?source=extension';

// i18n Strings
const i18n = {
    zh: {
        addBookmark: '添加新书签',
        subtitle: '粘贴网址，让 AI 为你自动整理',
        urlPlaceholder: '粘贴网址或搜索书签...',
        aiOptimize: 'AI优化',
        analyzing: '分析中...',
        optimized: '✅ 优化完成',
        failed: '❌ 失败，可重试',
        uncategorized: '未分类',
        editSummary: '点击编辑摘要，或用 AI 自动生成',
        cancel: '取消',
        save: '保存',
        saving: '保存中...',
        saved: '✅ 已保存',
        saveFailed: '❌ 保存失败',
        enterUrl: '❌ 请输入网址',
        loginRequired: '请先登录',
        goToLogin: '前往登录',
        tooltip: '保存书签',
        clear: '清空'
    },
    en: {
        addBookmark: 'Add New Bookmark',
        subtitle: 'Paste URL, let AI organize for you',
        urlPlaceholder: 'Paste URL or search bookmarks...',
        aiOptimize: 'AI Optimize',
        analyzing: 'Analyzing...',
        optimized: '✅ Optimized',
        failed: '❌ Failed, retry',
        uncategorized: 'Uncategorized',
        editSummary: 'Click to edit or let AI generate',
        cancel: 'Cancel',
        save: 'Save',
        saving: 'Saving...',
        saved: '✅ Saved',
        saveFailed: '❌ Save failed',
        enterUrl: '❌ Enter URL',
        loginRequired: 'Login required',
        goToLogin: 'Go to login',
        tooltip: 'Save bookmark',
        clear: 'Clear'
    }
};

// Current locale cached from chrome.storage
let currentLocale = 'en';

// Initialize locale from chrome storage
chrome.storage.sync.get(['locale'], (result) => {
    if (result.locale) {
        currentLocale = result.locale.startsWith('zh') ? 'zh' : 'en';
    }
});

// Listen for locale changes from website
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'SET_LOCALE') {
        currentLocale = request.locale.startsWith('zh') ? 'zh' : 'en';
        chrome.storage.sync.set({ locale: request.locale });
    }
});

function t(key) {
    return i18n[currentLocale][key] || i18n.en[key] || key;
}

// State
let dialogOpen = false;

function createFAB() {
    if (document.getElementById('ai-bookmark-fab-root')) return;
    chrome.storage.sync.get(['fabEnabled'], (result) => {
        if (result.fabEnabled === false) return;
        renderFAB();
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'TOGGLE_FAB') {
        if (request.enabled) {
            renderFAB();
        } else {
            removeFAB();
        }
    }
});

function removeFAB() {
    const container = document.getElementById('ai-bookmark-fab-container');
    if (container) container.remove();
}

function renderFAB() {
    if (document.getElementById('ai-bookmark-fab-container')) return;

    const container = document.createElement('div');
    container.id = 'ai-bookmark-fab-container';

    const button = document.createElement('div');
    button.id = 'ai-bookmark-fab';
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
        </svg>
        <div class="fab-tooltip">${t('tooltip')}</div>
    `;

    container.appendChild(button);
    document.body.appendChild(container);

    // Drag functionality
    let isDragging = false;
    let hasDragged = false;
    let startX, startY, startRight, startTop;

    button.addEventListener('mousedown', (e) => {
        isDragging = true;
        hasDragged = false;
        startX = e.clientX;
        startY = e.clientY;
        const rect = container.getBoundingClientRect();
        startRight = window.innerWidth - rect.right;
        startTop = rect.top;
        container.style.transition = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            hasDragged = true;
        }
        let newRight = startRight - deltaX;
        let newTop = startTop + deltaY;
        newRight = Math.max(0, Math.min(window.innerWidth - 50, newRight));
        newTop = Math.max(10, Math.min(window.innerHeight - 50, newTop));
        container.style.right = newRight + 'px';
        container.style.top = newTop + 'px';
        container.style.transform = 'none';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            container.style.transition = 'all 0.3s ease';
            chrome.storage.sync.set({
                fabPosition: { right: container.style.right, top: container.style.top }
            });
        }
    });

    button.addEventListener('click', () => {
        if (dialogOpen || hasDragged) return;
        showPreviewDialog();
    });

    chrome.storage.sync.get(['fabPosition'], (result) => {
        if (result.fabPosition) {
            container.style.right = result.fabPosition.right;
            container.style.top = result.fabPosition.top;
            container.style.transform = 'none';
        }
    });
}

// ========================================
// Preview Dialog
// ========================================

async function showPreviewDialog() {
    dialogOpen = true;

    const pageData = {
        url: window.location.href,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || '',
        favicon: getFavicon()
    };

    // Truncate title for display
    const displayTitle = truncateText(pageData.title, 50);

    const overlay = document.createElement('div');
    overlay.id = 'ai-bookmark-dialog-overlay';
    overlay.addEventListener('click', closeDialog);

    // Show card immediately with basic info (no AI needed)
    const dialog = document.createElement('div');
    dialog.id = 'ai-bookmark-dialog';
    dialog.innerHTML = `
        <div class="dialog-header-simple">
            <h3>${t('addBookmark')}</h3>
            <p class="dialog-subtitle">${t('subtitle')}</p>
            <button class="dialog-close-btn" id="close-btn">×</button>
        </div>
        <div class="dialog-body">
            <div class="url-input-row">
                <div class="url-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                </div>
                <input type="text" id="bookmark-url" value="${escapeHtml(pageData.url)}" class="url-input" placeholder="${t('urlPlaceholder')}" />
                <button class="clear-url-btn" id="clear-url-btn" title="${t('clear')}">×</button>
                <button class="analyze-btn-outline" id="ai-analyze-btn">
                    ${t('aiOptimize')}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/>
                    </svg>
                </button>
            </div>
            <!-- Card shows immediately with basic info -->
            <div class="result-preview" id="result-area">
                <div class="bookmark-card">
                    <div class="card-header">
                        <img src="${escapeHtml(pageData.favicon)}" class="card-favicon" onerror="this.style.display='none'" />
                        <div class="card-title-section">
                            <div class="card-title" contenteditable="true" id="edit-title">${escapeHtml(displayTitle)}</div>
                            <a href="${escapeHtml(pageData.url)}" target="_blank" class="card-url">
                                ${truncateText(pageData.url, 45)} ↗
                            </a>
                        </div>
                        <div class="card-category" contenteditable="true" id="edit-category">${t('uncategorized')}</div>
                    </div>
                    <div class="card-summary">
                        <span class="summary-dot">●</span>
                        <span class="summary-text" contenteditable="true" id="edit-summary">${escapeHtml(pageData.description) || t('editSummary')}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="dialog-footer">
            <button class="dialog-btn dialog-btn-cancel">${t('cancel')}</button>
            <button class="dialog-btn dialog-btn-save" id="save-btn">${t('save')}</button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(dialog);

    const authData = await getAuthFromStorage();
    if (!authData || !authData.token) {
        showLoginRequired(dialog);
        return;
    }

    dialog.querySelector('#close-btn').addEventListener('click', closeDialog);
    dialog.querySelector('.dialog-btn-cancel').addEventListener('click', closeDialog);

    // Clear button - clears URL and focuses for search
    dialog.querySelector('#clear-url-btn').addEventListener('click', () => {
        const urlInput = dialog.querySelector('#bookmark-url');
        urlInput.value = '';
        urlInput.focus();
        hideSearchResults(dialog);
    });

    // Search bookmarks as user types in URL field
    const urlInput = dialog.querySelector('#bookmark-url');
    let searchTimeout;

    urlInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        clearTimeout(searchTimeout);

        console.log('[FAB Search] Input event fired! Query:', query);

        // Skip if looks like a URL (contains :// or .)
        if (query.includes('://') || (query.includes('.') && query.length > 5)) {
            console.log('[FAB Search] Looks like URL, skipping search');
            hideSearchResults(dialog);
            return;
        }

        if (query.length < 2) {
            hideSearchResults(dialog);
            return;
        }

        // Debounce search
        searchTimeout = setTimeout(() => {
            console.log('[FAB Search] Sending search request for:', query);
            chrome.runtime.sendMessage({
                action: 'searchBookmarks',
                query: query
            }, (response) => {
                console.log('[FAB Search] Response:', response);
                if (response && response.bookmarks && response.bookmarks.length > 0) {
                    console.log('[FAB Search] Showing', response.bookmarks.length, 'results');
                    showSearchResults(dialog, response.bookmarks, query);
                } else {
                    console.log('[FAB Search] No results or error:', response?.error);
                    hideSearchResults(dialog);
                }
            });
        }, 300);
    });

    // Hide search results when clicking outside
    urlInput.addEventListener('blur', () => {
        setTimeout(() => hideSearchResults(dialog), 200);
    });

    // AI Analyze button - routes through background script to avoid CORS
    dialog.querySelector('#ai-analyze-btn').addEventListener('click', async () => {
        const aiBtn = dialog.querySelector('#ai-analyze-btn');
        const urlInput = dialog.querySelector('#bookmark-url');
        const inputUrl = urlInput.value.trim();

        if (!inputUrl) {
            aiBtn.innerHTML = t('enterUrl');
            return;
        }

        aiBtn.disabled = true;
        aiBtn.innerHTML = t('analyzing');

        // Send message to background script (avoids CORS)
        chrome.runtime.sendMessage({
            action: 'CLASSIFY_PAGE',
            data: {
                url: inputUrl,
                title: dialog.querySelector('#edit-title')?.textContent || '',
                description: '',
                locale: currentLocale
            }
        }, (response) => {
            if (response && response.success && response.data) {
                const data = response.data;

                // Update the existing card fields with AI data
                const titleEl = dialog.querySelector('#edit-title');
                const summaryEl = dialog.querySelector('#edit-summary');
                const categoryEl = dialog.querySelector('#edit-category');

                if (data.site_info) titleEl.textContent = data.site_info;
                if (data.summary) summaryEl.textContent = data.summary;
                if (data.category) categoryEl.textContent = data.category;

                aiBtn.innerHTML = t('optimized');
            } else {
                console.error('[FAB] AI analyze failed:', response?.error);
                aiBtn.innerHTML = t('failed');
                aiBtn.disabled = false;
            }
        });
    });

    // Save button - routes through background script
    dialog.querySelector('#save-btn').addEventListener('click', async () => {
        const saveBtn = dialog.querySelector('#save-btn');
        const urlInput = dialog.querySelector('#bookmark-url');
        const inputUrl = urlInput.value.trim();

        if (!inputUrl) {
            saveBtn.textContent = t('enterUrl');
            return;
        }

        saveBtn.disabled = true;
        saveBtn.textContent = t('saving');

        const bookmarkData = {
            url: inputUrl,
            title: dialog.querySelector('#edit-title')?.textContent || inputUrl,
            description: dialog.querySelector('#edit-summary')?.textContent || '',
            category: dialog.querySelector('#edit-category')?.textContent !== t('uncategorized')
                ? dialog.querySelector('#edit-category')?.textContent : ''
        };

        // Send message to background script (avoids CORS)
        chrome.runtime.sendMessage({
            action: 'SAVE_CURRENT_PAGE',
            data: bookmarkData
        }, (response) => {
            if (response && response.success) {
                saveBtn.innerHTML = t('saved');
                saveBtn.style.background = 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)';
                setTimeout(closeDialog, 1000);
            } else {
                saveBtn.textContent = t('saveFailed');
                saveBtn.disabled = false;
            }
        });
    });
}

function showCardPreview(container, data) {
    container.innerHTML = `
        <div class="bookmark-card">
            <div class="card-header">
                <img src="${escapeHtml(data.favicon)}" class="card-favicon" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22 fill=%22%23e2e8f0%22/></svg>'" />
                <div class="card-title-section">
                    <div class="card-title" contenteditable="true">${escapeHtml(data.title)}</div>
                    <a href="${escapeHtml(data.url)}" target="_blank" class="card-url">
                        ${truncateText(data.url, 40)} ↗
                    </a>
                </div>
                <div class="card-category" contenteditable="true">${escapeHtml(data.category) || '未分类'}</div>
            </div>
            <div class="card-summary">
                <span class="summary-dot">●</span>
                <span class="summary-text" contenteditable="true">${escapeHtml(data.summary) || '暂无摘要'}</span>
            </div>
            <div class="card-tags">
                <span class="card-tag">#${escapeHtml(data.category) || '书签'}</span>
            </div>
        </div>
    `;

    // Make editable fields update the data
    container.querySelector('.card-title').addEventListener('blur', (e) => {
        data.title = e.target.textContent;
    });
    container.querySelector('.card-category').addEventListener('blur', (e) => {
        data.category = e.target.textContent;
    });
    container.querySelector('.summary-text').addEventListener('blur', (e) => {
        data.summary = e.target.textContent;
    });
}

function closeDialog() {
    dialogOpen = false;
    const overlay = document.getElementById('ai-bookmark-dialog-overlay');
    const dialog = document.getElementById('ai-bookmark-dialog');
    if (overlay) overlay.remove();
    if (dialog) dialog.remove();
}

function showLoginRequired(dialog) {
    const dialogBody = dialog.querySelector('.dialog-body');
    dialogBody.innerHTML = `
        <div style="text-align: center; padding: 30px; color: #64748b;">
            <p style="margin-bottom: 15px;">${t('loginRequired')}</p>
            <a href="${LOGIN_URL}" target="_blank" style="color: #3b82f6; text-decoration: underline;">${t('goToLogin')}</a>
        </div>
    `;
}

function getAuthFromStorage() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['authToken', 'user'], (result) => {
            if (result.authToken) {
                resolve({ token: result.authToken, user: result.user });
            } else {
                resolve(null);
            }
        });
    });
}

function getFavicon() {
    const icons = document.querySelectorAll('link[rel*="icon"]');
    for (const icon of icons) {
        if (icon.href) return icon.href;
    }
    return `${window.location.origin}/favicon.ico`;
}

function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

function showSearchResults(dialog, bookmarks, query) {
    hideSearchResults(dialog);

    const urlRow = dialog.querySelector('.url-input-row');
    const dropdown = document.createElement('div');
    dropdown.className = 'search-results-dropdown';
    dropdown.innerHTML = bookmarks.slice(0, 5).map(b => `
        <div class="search-result-item" data-url="${escapeHtml(b.url)}">
            <img src="${escapeHtml(b.favicon_url || b.favicon || '')}" class="result-favicon" onerror="this.style.display='none'" />
            <div class="result-info">
                <div class="result-title">${escapeHtml(b.title || b.url)}</div>
                <div class="result-url">${escapeHtml(truncateText(b.url, 50))}</div>
            </div>
        </div>
    `).join('');

    urlRow.appendChild(dropdown);

    // Click on result to fill URL
    dropdown.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const url = item.dataset.url;
            dialog.querySelector('#bookmark-url').value = url;
            hideSearchResults(dialog);
        });
    });
}

function hideSearchResults(dialog) {
    const existing = dialog.querySelector('.search-results-dropdown');
    if (existing) existing.remove();
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize
createFAB();
