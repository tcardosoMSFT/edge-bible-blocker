document.addEventListener('DOMContentLoaded', () => {
  const siteInput = document.getElementById('site-input');
  const blockBtn = document.getElementById('block-btn');
  const blockedList = document.getElementById('blocked-list');
  const emptyState = document.getElementById('empty-state');
  const errorMsg = document.getElementById('error-msg');
  const verseText = document.getElementById('verse-text');
  const verseRef = document.getElementById('verse-ref');

  loadBlockedSites();
  displayRandomVerse();

  blockBtn.addEventListener('click', addSite);
  siteInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addSite();
  });
  siteInput.addEventListener('input', () => showError(''));

  function normalizeDomain(input) {
    let cleaned = input.trim().toLowerCase();
    // Strip protocol
    cleaned = cleaned.replace(/^https?:\/\//, '');
    // Strip www.
    cleaned = cleaned.replace(/^www\./, '');
    // Strip paths, query strings, fragments, trailing slashes
    cleaned = cleaned.split(/[/?#]/)[0];
    // Remove trailing dots
    cleaned = cleaned.replace(/\.+$/, '');
    return cleaned;
  }

  function isValidDomain(domain) {
    if (!domain) return false;
    // Basic domain validation: at least one dot, valid characters
    const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/;
    return domainRegex.test(domain);
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.hidden = !msg;
  }

  function addSite() {
    const domain = normalizeDomain(siteInput.value);

    if (!domain) {
      showError('Please enter a website address.');
      return;
    }
    if (!isValidDomain(domain)) {
      showError('Please enter a valid domain (e.g. example.com).');
      return;
    }

    chrome.storage.sync.get({ blockedSites: [] }, (data) => {
      const sites = data.blockedSites;

      if (sites.includes(domain)) {
        showError('This site is already blocked.');
        return;
      }

      sites.push(domain);
      chrome.storage.sync.set({ blockedSites: sites }, () => {
        siteInput.value = '';
        showError('');
        renderList(sites);
        chrome.runtime.sendMessage({ action: 'updateRules' });
      });
    });
  }

  function removeSite(domain) {
    chrome.storage.sync.get({ blockedSites: [] }, (data) => {
      const sites = data.blockedSites.filter((s) => s !== domain);
      chrome.storage.sync.set({ blockedSites: sites }, () => {
        renderList(sites);
        chrome.runtime.sendMessage({ action: 'updateRules' });
      });
    });
  }

  function loadBlockedSites() {
    chrome.storage.sync.get({ blockedSites: [] }, (data) => {
      renderList(data.blockedSites);
    });
  }

  function renderList(sites) {
    blockedList.innerHTML = '';

    if (sites.length === 0) {
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;

    sites.forEach((site) => {
      const li = document.createElement('li');

      const nameSpan = document.createElement('span');
      nameSpan.className = 'site-name';
      nameSpan.textContent = site;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.title = 'Remove from blocked list';
      deleteBtn.textContent = '×';
      deleteBtn.addEventListener('click', () => removeSite(site));

      li.appendChild(nameSpan);
      li.appendChild(deleteBtn);
      blockedList.appendChild(li);
    });
  }

  function displayRandomVerse() {
    const verse = getRandomVerse();
    verseText.textContent = `"${verse.text}"`;
    verseRef.textContent = `— ${verse.reference}`;
  }
});
