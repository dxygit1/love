// ========================================
// AI Bookmark Extension - Popup Script
// ========================================

// API Base URL - Change this for production
const API_BASE_URL = 'http://localhost:3000';

// DOM Elements
const loginView = document.getElementById('login-view');
const saveView = document.getElementById('save-view');
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');
const saveBtn = document.getElementById('save-btn');
const logoutBtn = document.getElementById('logout-btn');
const pageTitle = document.getElementById('page-title');
const pageUrl = document.getElementById('page-url');
const pageFavicon = document.getElementById('page-favicon');
const userEmail = document.getElementById('user-email');
const saveStatus = document.getElementById('save-status');

// ========================================
// Initialization
// ========================================

document.addEventListener('DOMContentLoaded', async () => {
    const user = await getStoredUser();
    if (user) {
        showSaveView(user);
        loadCurrentPageInfo();
    } else {
        showLoginView();
    }
});

// ========================================
// View Management
// ========================================

function showLoginView() {
    loginView.style.display = 'block';
    saveView.style.display = 'none';
}

function showSaveView(user) {
    loginView.style.display = 'none';
    saveView.style.display = 'block';
    userEmail.textContent = user.email;
}

// ========================================
// Storage Helpers
// ========================================

async function getStoredUser() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['user', 'accessToken'], (result) => {
            if (result.user && result.accessToken) {
                resolve(result.user);
            } else {
                resolve(null);
            }
        });
    });
}

async function storeUser(user, accessToken) {
    return new Promise((resolve) => {
        chrome.storage.sync.set({ user, accessToken }, resolve);
    });
}

async function clearUser() {
    return new Promise((resolve) => {
        chrome.storage.sync.remove(['user', 'accessToken'], resolve);
    });
}

async function getAccessToken() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['accessToken'], (result) => {
            resolve(result.accessToken || null);
        });
    });
}

// ========================================
// API Helpers
// ========================================

async function apiRequest(endpoint, options = {}) {
    const accessToken = await getAccessToken();

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
            ...options.headers,
        },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || error.error || 'Request failed');
    }

    return response.json();
}

// ========================================
// Login Handler
// ========================================

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Show loading state
    loginBtn.disabled = true;
    loginBtn.querySelector('.btn-text').style.display = 'none';
    loginBtn.querySelector('.btn-loading').style.display = 'inline';
    loginError.style.display = 'none';

    try {
        const result = await apiRequest('/api/auth/extension-login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (result.user && result.accessToken) {
            await storeUser(result.user, result.accessToken);
            showSaveView(result.user);
            loadCurrentPageInfo();
        } else {
            throw new Error('登录失败 / Login failed');
        }
    } catch (error) {
        loginError.textContent = error.message;
        loginError.style.display = 'block';
    } finally {
        loginBtn.disabled = false;
        loginBtn.querySelector('.btn-text').style.display = 'inline';
        loginBtn.querySelector('.btn-loading').style.display = 'none';
    }
});

// ========================================
// Logout Handler
// ========================================

logoutBtn.addEventListener('click', async () => {
    await clearUser();
    showLoginView();
});

// ========================================
// Load Current Page Info
// ========================================

async function loadCurrentPageInfo() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (tab) {
            pageTitle.textContent = tab.title || 'Untitled';
            pageUrl.textContent = tab.url || '';

            // Set favicon
            if (tab.favIconUrl) {
                pageFavicon.src = tab.favIconUrl;
            } else {
                pageFavicon.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2394a3b8"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/></svg>';
            }
        }
    } catch (error) {
        console.error('Failed to load page info:', error);
        pageTitle.textContent = 'Unable to load page info';
    }
}

// ========================================
// Save Bookmark Handler
// ========================================

saveBtn.addEventListener('click', async () => {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab || !tab.url) {
            showStatus('error', '无法获取页面信息');
            return;
        }

        // Show loading state
        saveBtn.disabled = true;
        showStatus('loading', 'AI 正在分析...');

        const user = await getStoredUser();

        // Call classify API
        const classifyResult = await apiRequest('/api/classify', {
            method: 'POST',
            body: JSON.stringify({ url: tab.url }),
        });

        // Save bookmark
        const bookmarkData = {
            url: tab.url,
            title: classifyResult.title || tab.title,
            description: classifyResult.summary || '',
            group: classifyResult.group || 'Uncategorized',
            tags: classifyResult.tags || [],
            favicon: tab.favIconUrl || '',
            userId: user.id,
        };

        await apiRequest('/api/bookmarks', {
            method: 'POST',
            body: JSON.stringify(bookmarkData),
        });

        showStatus('success', '保存成功！');

        // Reset after 2 seconds
        setTimeout(() => {
            saveStatus.style.display = 'none';
            saveBtn.disabled = false;
        }, 2000);

    } catch (error) {
        console.error('Save failed:', error);
        showStatus('error', error.message || '保存失败');
        saveBtn.disabled = false;
    }
});

// ========================================
// Status Display
// ========================================

function showStatus(type, message) {
    saveStatus.className = `save-status ${type}`;
    saveStatus.querySelector('.status-text').textContent = message;
    saveStatus.style.display = 'flex';
}
