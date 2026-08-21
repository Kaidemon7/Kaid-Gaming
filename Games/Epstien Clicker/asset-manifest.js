(function() {
  const SITE_URL = "https://sites.google.com/view/staticquasar931/gm3z";
  const TICKER_COUNT = 6;
  const WATERMARK_STRINGS = [
    "iteuhw807uhb70sbtiamt3imc8qguga6stalrf9j3g1gj498dh",
    "staticquasar931_arcade_cache_signal_241",
    "retro_green_lane_marker_77b",
    "fullscroll_anchor_pattern_delta9"
  ];

  const IMAGES = [
    "click.png",
    "Assets/adolf hitler-transparent.png",
    "Assets/adolfhitler-transparent.png",
    "Assets/ishowspeed-transparent.png",
    "Assets/ishowspeedbark-transparent.png",
    "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/eps1.png",
    "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/advanced/ep12.png",
    "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/Special/mb1.png",
    "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/Special/kju1.png",
    "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/Special/mus1.png",
    "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/advanced/di1.png",
    "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/trum1.png",
    "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/steph1.png"
  ];

  function buildTicker() {
    const ticker = document.getElementById("ticker");
    if (!ticker) {
      return;
    }
    ticker.innerHTML = "";
    for (let index = 0; index < TICKER_COUNT; index += 1) {
      const item = document.createElement("a");
      item.className = "tickerItem tickerLink";
      item.href = SITE_URL;
      item.target = "_blank";
      item.rel = "noopener noreferrer";
      item.innerHTML = '&nbsp;|&nbsp;<span class="tickerBrand">epsteinclicker.com</span>&nbsp;|&nbsp;Your&nbsp;Score&nbsp;:&nbsp;<span class="tickerScore">0.0</span>&nbsp;|&nbsp;';
      ticker.appendChild(item);
    }
  }

  function preloadSequentially(list) {
    const loaded = [];
    return list.reduce((promise, src) => {
      return promise.then(() => {
        return new Promise((resolve) => {
          const image = new Image();
          image.decoding = "async";
          image.loading = "eager";
          image.onload = () => {
            loaded.push(image);
            resolve();
          };
          image.onerror = () => resolve();
          image.src = src;
        });
      });
    }, Promise.resolve()).then(() => loaded);
  }

  buildTicker();

  window.EC_ASSET_MANIFEST = {
    siteUrl: SITE_URL,
    images: IMAGES.slice(),
    watermarkStrings: WATERMARK_STRINGS.slice(),
    ready: preloadSequentially(IMAGES)
  };
})();
