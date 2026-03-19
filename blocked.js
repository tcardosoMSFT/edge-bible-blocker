document.addEventListener('DOMContentLoaded', () => {
  const verseText = document.getElementById('verse-text');
  const verseRef = document.getElementById('verse-reference');
  const verseCard = document.getElementById('verse-card');
  const blockedUrl = document.getElementById('blocked-url');
  const goBackBtn = document.getElementById('go-back-btn');
  const newVerseBtn = document.getElementById('new-verse-btn');

  // Display the blocked URL hostname
  const params = new URLSearchParams(window.location.search);
  const rawUrl = params.get('url');
  if (rawUrl) {
    try {
      const hostname = new URL(rawUrl).hostname;
      blockedUrl.textContent = hostname;
    } catch {
      blockedUrl.textContent = rawUrl;
    }
  }

  function displayVerse(verse) {
    verseText.textContent = verse.text;
    verseRef.textContent = '— ' + verse.reference;
  }

  // Show initial verse
  displayVerse(getRandomVerse());

  // Go Back button
  goBackBtn.addEventListener('click', () => {
    history.back();
  });

  // New Verse button with fade animation
  newVerseBtn.addEventListener('click', () => {
    verseCard.classList.add('fade-out');
    setTimeout(() => {
      displayVerse(getRandomVerse());
      verseCard.classList.remove('fade-out');
    }, 400);
  });
});
