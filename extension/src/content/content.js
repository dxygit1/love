// ========================================
// AI Bookmark Extension - Content Script
// ========================================

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractContent') {
        try {
            const pageData = extractPageData();
            sendResponse(pageData);
        } catch (error) {
            sendResponse({ error: error.message });
        }
    }
    return true;
});

// Extract page metadata
function extractPageData() {
    // Get meta description
    const metaDescription = document.querySelector('meta[name="description"]')?.content
        || document.querySelector('meta[property="og:description"]')?.content
        || '';

    // Get Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]')?.content
        || document.title
        || '';

    // Get Open Graph image
    const ogImage = document.querySelector('meta[property="og:image"]')?.content
        || document.querySelector('meta[name="twitter:image"]')?.content
        || '';

    // Get canonical URL
    const canonicalUrl = document.querySelector('link[rel="canonical"]')?.href
        || window.location.href;

    // Get keywords
    const keywords = document.querySelector('meta[name="keywords"]')?.content?.split(',').map(k => k.trim())
        || [];

    // Get author
    const author = document.querySelector('meta[name="author"]')?.content
        || '';

    // Get site name
    const siteName = document.querySelector('meta[property="og:site_name"]')?.content
        || '';

    // Get first paragraph as content preview
    const contentPreview = getContentPreview();

    return {
        url: canonicalUrl,
        title: ogTitle,
        description: metaDescription,
        image: ogImage,
        keywords: keywords.slice(0, 5), // Limit to 5 keywords
        author,
        siteName,
        contentPreview,
    };
}

// Get first meaningful paragraph from page
function getContentPreview() {
    const paragraphs = document.querySelectorAll('article p, main p, .content p, p');

    for (const p of paragraphs) {
        const text = p.textContent?.trim();
        if (text && text.length > 50 && text.length < 500) {
            return text;
        }
    }

    return '';
}

// Notify that content script is ready
console.log('AI Bookmark content script loaded');
