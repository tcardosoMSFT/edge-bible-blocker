// Background service worker for Edge Bible Blocker extension

const DEFAULT_BLOCKED_SITES = [
  'facebook.com',
  'twitter.com',
  'tiktok.com',
  'instagram.com',
  'reddit.com'
];

chrome.runtime.onInstalled.addListener(async () => {
  try {
    const data = await chrome.storage.sync.get('blockedSites');
    if (!data.blockedSites || data.blockedSites.length === 0) {
      await chrome.storage.sync.set({ blockedSites: DEFAULT_BLOCKED_SITES });
    }
    await updateBlockRules();
  } catch (error) {
    console.error('Error during extension initialization:', error);
  }
});

async function updateBlockRules() {
  try {
    const data = await chrome.storage.sync.get('blockedSites');
    const blockedSites = data.blockedSites || [];

    // Remove all existing dynamic rules
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const removeRuleIds = existingRules.map(rule => rule.id);

    // Build new rules from the blocked sites list
    const addRules = blockedSites.map((site, index) => ({
      id: index + 1,
      priority: 1,
      action: {
        type: 'redirect',
        redirect: {
          extensionPath: '/blocked.html?url=' + encodeURIComponent(site)
        }
      },
      condition: {
        urlFilter: '||' + site,
        resourceTypes: ['main_frame']
      }
    }));

    await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds, addRules });
  } catch (error) {
    console.error('Error updating block rules:', error);
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === 'updateRules') {
    updateBlockRules().then(() => sendResponse({ success: true }))
      .catch(error => {
        console.error('Error handling updateRules message:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // keep the message channel open for async sendResponse
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.blockedSites) {
    updateBlockRules();
  }
});
