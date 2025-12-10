// ========================================
// AI Bookmark Extension - Popup Script (Cookie-Based Auth)
// ========================================

const API_BASE_URL = 'http://localhost:3000';
const LOGIN_PAGE_URL = 'http://localhost:3000/login?source=extension';
const COOKIE_DOMAIN = 'localhost';
const AUTH_COOKIE_NAME = 'ai-bookmark-auth'; // Dedicated key

// DOM Elements
const loginView = document.getElementById('login-view');
const saveView = document.getElementById('save-view');
const openWebBtn = document.getElementById('open-web-btn');
const saveBtn = document.getElementById('save-btn');
const resyncBtn = document.getElementById('resync-btn');
const pageTitle = document.getElementById('page-title');
const pageUrl = document.getElementById('page-url');
const pageFavicon = document.getElementById('page-favicon');
const userEmail = document.getElementById('user-email');
const saveStatus = document.getElementById('save-status');
const fabToggle = document.getElementById('fab-toggle');
const tagInput = document.getElementById('tag-input');
const selectedTagsContainer = document.getElementById('selected-tags');
const tagSuggestions = document.getElementById('tag-suggestions');

// State
let currentTags = [];
let availableTags = [];
let currentAuthToken = null;
let currentUser = null;

// ========================================
// Initialization
// ========================================

document.addEventListener('DOMContentLoaded', async () => {
    console.log('[Popup] Initializing...');

    // Try to get auth from cookie
    const authData = await getAuthFromCookie();

    if (authData && authData.token) {
        console.log('[Popup] Found auth token in cookie!');
        currentAuthToken = authData.token;
        currentUser = authData.user;

        // Also store in chrome.storage for other extension parts to use
        await chrome.storage.sync.set({
            authToken: authData.token,
            user: authData.user
        });

        showSaveView(authData.user);
        loadCurrentPageInfo();
        loadSettings();
        fetchTags();
    } else {
        console.log('[Popup] No auth token found');
        showLoginView();
    }
});

// ========================================
// Cookie-Based Auth
// ========================================

async function getAuthFromCookie() {
    return new Promise((resolve) => {
        // Read auth cookie from localhost - this is the ONLY source of truth
        chrome.cookies.get({
            url: API_BASE_URL,
            name: AUTH_COOKIE_NAME
        }, (cookie) => {
            console.log('[Popup] Cookie result:', cookie);

            if (cookie && cookie.value) {
                try {
                    const decoded = decodeURIComponent(cookie.value);
                    const session = JSON.parse(decoded);
                    console.log('[Popup] Parsed session:', session);

                    const token = session.access_token || session.token;

                    if (token) {
                        console.log('[Popup] Found valid token');
                        // Also update chrome.storage for background script use
                        chrome.storage.sync.set({
                            authToken: token,
                            user: session.user
                        });
                        resolve({
                            token: token,
                            user: session.user || { email: 'User' }
                        });
                        return;
                    }
                } catch (e) {
                    console.error('[Popup] Failed to parse cookie:', e);
                }
            }

            // No valid cookie = not logged in
            // Clear any stale data from chrome.storage
            console.log('[Popup] No cookie found, clearing storage');
            chrome.storage.sync.remove(['authToken', 'user']);
            resolve(null);
        });
    });
}

// ========================================
// View Logic
// ========================================

function showLoginView() {
    loginView.style.display = 'block';
    saveView.style.display = 'none';
}

function showSaveView(user) {
    loginView.style.display = 'none';
    saveView.style.display = 'block';
    userEmail.textContent = user?.email || user?.name || 'Logged In';
}

// Redirect to Web Login
openWebBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: LOGIN_PAGE_URL });
});

// Resync (Re-check cookie)
resyncBtn.addEventListener('click', async () => {
    console.log('[Popup] Resync requested...');
    const authData = await getAuthFromCookie();
    if (authData && authData.token) {
        currentAuthToken = authData.token;
        currentUser = authData.user;
        await chrome.storage.sync.set({ authToken: authData.token, user: authData.user });
        showSaveView(authData.user);
        loadCurrentPageInfo();
        showStatus('success', 'Synced!');
        setTimeout(() => saveStatus.style.display = 'none', 1500);
    } else {
        showStatus('error', 'No session found');
        setTimeout(() => chrome.tabs.create({ url: LOGIN_PAGE_URL }), 1000);
    }
});

// ========================================
// Settings (FAB Toggle)
// ========================================

async function loadSettings() {
    chrome.storage.sync.get(['fabEnabled'], (result) => {
        if (fabToggle) fabToggle.checked = result.fabEnabled !== false;
    });
}

if (fabToggle) {
    fabToggle.addEventListener('change', (e) => {
        const enabled = e.target.checked;
        chrome.storage.sync.set({ fabEnabled: enabled });
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, { action: 'TOGGLE_FAB', enabled }).catch(() => { });
            });
        });
    });
}

// ========================================
// Tag Logic
// ========================================

async function fetchTags() {
    try {
        const result = await apiRequest('/api/tags');
        if (result && Array.isArray(result)) {
            availableTags = result;
            renderTagSuggestions();
        }
    } catch (e) {
        console.warn('Failed to fetch tags:', e);
    }
}

function renderTagSuggestions() {
    if (!tagSuggestions) return;
    tagSuggestions.innerHTML = '';
    availableTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag.name;
        tagSuggestions.appendChild(option);
    });
}

if (tagInput) {
    tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = tagInput.value.trim();
            if (val && !currentTags.includes(val)) {
                addTag(val);
                tagInput.value = '';
            }
        }
    });
}

function addTag(tag) {
    currentTags.push(tag);
    renderSelectedTags();
}

function removeTag(tag) {
    currentTags = currentTags.filter(t => t !== tag);
    renderSelectedTags();
}

function renderSelectedTags() {
    if (!selectedTagsContainer) return;
    selectedTagsContainer.innerHTML = '';
    currentTags.forEach(tag => {
        const chip = document.createElement('div');
        chip.className = 'tag-chip';
        chip.innerHTML = `<span>${tag}</span><span class="tag-remove">&times;</span>`;
        chip.querySelector('.tag-remove').onclick = () => removeTag(tag);
        selectedTagsContainer.appendChild(chip);
    });
}

// ========================================
// Save Logic
// ========================================

if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tab || !tab.url) return;

            saveBtn.disabled = true;
            showStatus('loading', 'AI 分析中...');

            const bookmarkData = {
                url: tab.url,
                title: pageTitle.textContent || tab.title,
                tags: currentTags,
                userId: currentUser?.id
            };

            await apiRequest('/api/bookmarks', {
                method: 'POST',
                body: JSON.stringify(bookmarkData),
            });

            showStatus('success', '保存成功！');
            setTimeout(() => window.close(), 1500);

        } catch (error) {
            console.error('Save failed:', error);
            showStatus('error', error.message || '保存失败');
            saveBtn.disabled = false;
        }
    });
}

// ========================================
// Helpers
// ========================================

async function apiRequest(endpoint, options = {}) {
    if (!currentAuthToken) {
        const authData = await getAuthFromCookie();
        if (authData) currentAuthToken = authData.token;
    }

    if (!currentAuthToken) {
        throw new Error('Not authenticated');
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentAuthToken}`,
            ...options.headers
        }
    });

    if (!res.ok) {
        if (res.status === 401) {
            chrome.storage.sync.remove(['authToken', 'user']);
            currentAuthToken = null;
            showLoginView();
            throw new Error('Session expired');
        }
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Request failed');
    }

    return res.json();
}

function showStatus(type, msg) {
    if (!saveStatus) return;
    saveStatus.style.display = 'flex';
    saveStatus.className = `save-status ${type}`;
    const textEl = saveStatus.querySelector('.status-text');
    if (textEl) textEl.textContent = msg;
}

async function loadCurrentPageInfo() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
        if (pageTitle) pageTitle.textContent = tab.title || 'Untitled';
        if (pageUrl) pageUrl.textContent = tab.url || '';
        if (pageFavicon) pageFavicon.src = tab.favIconUrl || 'favicon.ico';
    }
}
