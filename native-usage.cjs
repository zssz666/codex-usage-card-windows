'use strict';

function hideNativeUsage(doc = document) {
  const style = doc.getElementById('codex-usage-badge-style');
  if (!style) throw new Error('Usage badge style must be installed first');
  const rule = 'nav[data-app-navigation-rail] button[aria-description]:is([aria-label="用量"], [aria-label="Usage"]) { display: none !important; }';
  if (!style.textContent.includes(rule)) style.appendChild(doc.createTextNode(rule));
}

module.exports = { hideNativeUsage };
