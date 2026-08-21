/**
 * kg-multiplayer-helper.js
 * Drop this in the <head> of any game you control to enable full KG multiplayer.
 *
 * Usage inside your game:
 *
 *   // 1. Know your role and session when the game starts:
 *   window.addEventListener('kgmpinit', e => {
 *     const { role, sessionId, peerName, username } = e.detail;
 *     // role is "host" or "guest"
 *     // Set up your game state here
 *   });
 *
 *   // 2. When the local player does something (moves, clicks, etc):
 *   kgMpSend({ type: 'move', x: 10, y: 20 });
 *
 *   // 3. When the peer sends something, apply it to your game:
 *   window.addEventListener('kgmppeer', e => {
 *     const payload = e.detail;
 *     // e.g. if (payload.type === 'move') applyMove(payload);
 *   });
 */
(function () {
  if (window.__kgMpHelperLoaded) return;
  window.__kgMpHelperLoaded = true;

  // Listen for messages from the KG parent frame
  window.addEventListener('message', function (ev) {
    var d = ev.data;
    if (!d || typeof d !== 'object') return;

    if (d.type === 'KG_MP_INIT') {
      window.dispatchEvent(new CustomEvent('kgmpinit', { detail: d }));
    }
    if (d.type === 'KG_MP_PEER') {
      window.dispatchEvent(new CustomEvent('kgmppeer', { detail: d.payload }));
    }
  });

  /**
   * Send a payload to your peer via KG's Firebase relay.
   * Call this whenever the local player does something game-relevant.
   * @param {object} payload - Anything JSON-serialisable.
   */
  window.kgMpSend = function (payload) {
    try {
      parent.postMessage({ type: 'KG_MP_SEND', payload: payload }, '*');
    } catch (e) {}
  };

  // Notify KG that the helper is loaded (so it won't try to re-inject the bridge)
  try {
    parent.postMessage({ type: 'KG_MP_HELPER_READY' }, '*');
  } catch (e) {}
})();