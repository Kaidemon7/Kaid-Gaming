// Kaid Gaming Protection Script
// Prevents detection and banning on school networks
(function() {
  'use strict';
  
  // Obfuscate window title
  const originalTitle = document.title;
  let titleIndex = 0;
  const titles = ['Kaid Gaming', 'Study Hub', 'Math Practice', 'Learning Center', 'Educational Tools', 'Student Portal'];
  
  // Rotate titles periodically
  setInterval(() => {
    titleIndex = (titleIndex + 1) % titles.length;
    document.title = titles[titleIndex];
  }, 30000);
  
  // Mask common game-related keywords in URL
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  function maskURL(url) {
    if (typeof url === 'string') {
      return url.replace(/game|play|fun|arcade/gi, 'study');
    }
    return url;
  }
  
  history.pushState = function() {
    arguments[2] = maskURL(arguments[2]);
    return originalPushState.apply(history, arguments);
  };
  
  history.replaceState = function() {
    arguments[2] = maskURL(arguments[2]);
    return originalReplaceState.apply(history, arguments);
  };
  
  // Prevent right-click context menu on games
  document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IFRAME' || e.target.closest('iframe')) {
      e.preventDefault();
    }
  }, true);
  
  // Hide from DevTools detection
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  
  console.log = function() {
    if (arguments[0] && typeof arguments[0] === 'string' && 
        (arguments[0].includes('game') || arguments[0].includes('play'))) {
      return;
    }
    originalLog.apply(console, arguments);
  };
  
  // Detect if running in iframe (common in school filters)
  if (window.self !== window.top) {
    // Running in iframe - add extra protection
    document.documentElement.style.filter = 'none';
  }
  
  // Prevent keyboard shortcuts that might reveal it's a game site
  document.addEventListener('keydown', function(e) {
    // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
    }
  });
  
  // Obfuscate localStorage keys
  const originalGetItem = localStorage.getItem;
  const originalSetItem = localStorage.setItem;
  
  localStorage.getItem = function(key) {
    const obfuscatedKey = btoa('kg_' + key);
    return originalGetItem.call(localStorage, obfuscatedKey);
  };
  
  localStorage.setItem = function(key, value) {
    const obfuscatedKey = btoa('kg_' + key);
    return originalSetItem.call(localStorage, obfuscatedKey, value);
  };
  
  // Add random class names to confuse filters
  document.body.classList.add('edu-platform-' + Math.random().toString(36).substring(7));
  
  // Prevent drag and drop of iframes
  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IFRAME') {
      e.preventDefault();
    }
  }, true);
  
  console.log('Kaid Gaming Protection Loaded');
})();
