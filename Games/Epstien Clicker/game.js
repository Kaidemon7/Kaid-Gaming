const SAVE_KEY = "staticquasar931_epstein_clicker_save_v5";
const SAVE_VERSION = 5;
const WARNING_KEY = "staticquasar931_epstein_clicker_hide_warning_v1";
const SCORE_STEP = 10n;
const AUTO_TICKS_PER_SEC = 20n;
const BASE_PER_CLICK = 1n;
const BUY_MODES = [1n, 10n, 100n];
const TOTAL_LEVELS = 10000;
const LEVEL_PREVIEW_COUNT = 30;
const MAX_STEPS = 4096;
const AUTOSAVE_INTERVAL_MS = 2500;
const STATIC_CODE = "static";
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA"
];

const LEVEL_NAMES = [
  "Witness List",
  "Midnight Ledger",
  "Velvet Blackmail Ring",
  "Crimson Passport",
  "Ironclad Alibi",
  "Ghost Manifest",
  "Silent Airstrip",
  "Closed Circle",
  "Hidden Client List",
  "Dark Money Vault",
  "Influence Laundering Network",
  "Private Archive",
  "Obsidian Contact Grid",
  "Immunity Broker",
  "Deep State Switchboard",
  "Cipher Estate",
  "Black Budget Engine",
  "Executive Escape Route",
  "Phantom Holdings",
  "Sovereign Coverup",
  "Global Pressure Machine",
  "Velvet Authority",
  "The Inner Circle",
  "No Witness Protocol",
  "Eternal Immunity",
  "Final Cover Story",
  "Apex Control Matrix",
  "World Silence Grid",
  "Untouchable Dynasty",
  "Last Alibi",
  "Absolute Override",
  "Obsidian Network",
  "Phantom Array",
  "Blackmail Engine",
  "Immunity Protocol",
  "Shadow Directive",
  "Sovereign Authority",
  "Cipher Core",
  "Final Alibi",
  "Inner Circle Engine",
  "No Witness Override",
  "Global Silence Force",
  "Absolute Control Grid",
  "Dark Ledger Protocol",
  "Eternal Coverup",
  "Apex Immunity",
  "Costco Business Membership",
  "Standing Baby Oil Card"
];

const SKINS = [
  ["epstein", "Default Epstein", "click.png"],
  ["epstein2", "sad epstein", "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/eps1.png"],
  ["epstein3", "Creepy Epstein", "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/advanced/ep12.png"],
  ["mrbeast", "MrBeast", "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/Special/mb1.png"],
  ["kim", "Kim Jong Un", "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/Special/kju1.png"],
  ["musk", "Elon Musk", "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/Special/mus1.png"],
  ["diddy", "Diddy", "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/advanced/di1.png"],
  ["trump", "Trump", "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/trum1.png"],
  ["hawking", "Stephen Hawking", "https://cdn.jsdelivr.net/gh/StaticQuasar931/Wheres-Epstein@main/Assets/Waldos/steph1.png"],
  ["hitler1", "Adolf Hitler", "Assets/adolf hitler-transparent.png"],
  ["hitler2", "Adolf Hitler 2", "Assets/adolfhitler-transparent.png"],
  ["speed1", "IShowSpeed", "Assets/ishowspeed-transparent.png"],
  ["speed2", "IShowSpeed Bark", "Assets/ishowspeedbark-transparent.png"]
];

const UPGRADE_DATA = [
  ["cursor", "Cursor", 1000n, 10n, 125n],
  ["diddy", "Diddy Factory", 8000n, 25n, 130n],
  ["mega", "Mega Factory", 15000n, 50n, 135n],
  ["oil", "Baby Oil Factory", 40000n, 150n, 135n],
  ["degree", "Epstein Degree", 80000n, 400n, 135n],
  ["nyc", "NYC Apartment", 500000n, 2000n, 135n],
  ["mex", "Mexico House", 3000000n, 15000n, 135n],
  ["island", "Epstein Island", 15000000n, 80000n, 135n],
  ["jet", "Gulfstream Jet", 80000000n, 400000n, 135n],
  ["runway", "Private Island Runway", 500000000n, 2500000n, 135n],
  ["shell", "Shell Company Empire", 3000000000n, 15000000n, 135n],
  ["offshore", "Offshore Money Network", 20000000000n, 100000000n, 135n],
  ["media", "Media Control Machine", 150000000000n, 750000000n, 135n],
  ["lobby", "Global Lobbying Force", 1000000000000n, 5000000000n, 135n],
  ["access", "Shadow Access Pass", 8000000000000n, 40000000000n, 135n],
  ["grid", "World Influence Grid", 60000000000000n, 300000000000n, 135n],
  ["protocol", "Reality Protocol", 500000000000000n, 2500000000000n, 135n],
  ["final", "The Untouchable", 4000000000000000n, 20000000000000n, 135n],
  ["cabal", "The Cabal Engine", 20000000000000000n, 100000000000000n, 125n],
  ["sing", "Singularity Core", 100000000000000000n, 500000000000000n, 125n],
  ["vault", "Black Vault Network", 500000000000000000n, 2500000000000000n, 125n],
  ["oracle", "Oracle Array", 2500000000000000000n, 12500000000000000n, 125n],
  ["zeit", "Zeit Control", 12500000000000000000n, 62500000000000000n, 125n],
  ["rift", "Rift Generator", 62500000000000000000n, 312500000000000000n, 125n],
  ["dynasty", "Dynasty Protocol", 312500000000000000000n, 1562500000000000000n, 125n],
  ["omega", "Omega Directive", 1562500000000000000000n, 7812500000000000000n, 125n],
  ["eclipse", "Eclipse Authority", 7812500000000000000000n, 39062500000000000000n, 125n],
  ["godmode", "Godmode Override", 39062500000000000000000n, 195312500000000000000n, 125n],
  ["infinite", "Infinite Stage", 195312500000000000000000n, 976562500000000000000n, 125n],
  ["ledger", "Midnight Ledger", 976562500000000000000000n, 4882812500000000000000n, 125n],
  ["velvet", "Velvet Blackmail Ring", 4882812500000000000000000n, 24414062500000000000000n, 125n],
  ["passport", "Crimson Passport", 24414062500000000000000000n, 122070312500000000000000n, 125n],
  ["alibi", "Ironclad Alibi", 122070312500000000000000000n, 610351562500000000000000n, 125n],
  ["airstrip", "Silent Airstrip", 610351562500000000000000000n, 3051757812500000000000000n, 125n],
  ["circle", "The Inner Circle", 3051757812500000000000000000n, 15258789062500000000000000n, 125n],
  ["witness", "No Witness Override", 15258789062500000000000000000n, 76293945312500000000000000n, 125n],
  ["override", "Absolute Override", 76293945312500000000000000000n, 381469726562500000000000000n, 125n],
  ["costco", "Costco Business Membership", 381469726562500000000000000000n, 1907348632812500000000000000n, 125n],
  ["card", "Standing Baby Oil Card", 1907348632812500000000000000000n, 9536743164062500000000000000n, 125n],
  ["alibi2", "Last Minute Lawyer", 9536743164062500000000000000000n, 47683715820312500000000000000n, 125n]
];

const $ = (id) => document.getElementById(id);
const el = {
  score: $("score"),
  perClick: $("perClick"),
  perSec: $("perSec"),
  upgradeCount: $("upgradeCount"),
  pageTitle: $("pageTitle"),
  safeModeBadge: $("safeModeBadge"),
  subjectHeading: $("subjectHeading"),
  clickBtn: $("clickBtn"),
  skinSelect: $("cloakSelect"),
  safeToggle: $("safeModeToggle"),
  buyAll: $("buyAllBtn"),
  buy1: $("buyMode1Btn"),
  buy10: $("buyMode10Btn"),
  buy100: $("buyMode100Btn"),
  reset: $("resetBtn"),
  summary: $("buyAllSummary"),
  currentLevel: $("currentLevel"),
  currentLevelName: $("currentLevelName"),
  nextLevel: $("nextLevel"),
  levelProgress: $("levelProgress"),
  progressBar: $("progressBar"),
  levelList: $("levelList"),
  rawClicks: $("rawClicks"),
  statPerClick: $("statPerClick"),
  statPerSec: $("statPerSec"),
  clicksPerMin: $("clicksPerMin"),
  hoursPlayed: $("hoursPlayed"),
  sessionTime: $("sessionTime"),
  totalUpgrades: $("totalUpgradesStat"),
  buyModeReadout: $("buyModeReadout"),
  shop: $("shop"),
  floating: $("floatingLayer"),
  tamper: $("tamperOverlay"),
  tamperMsg: $("tamperMessage"),
  tamperOk: $("tamperAcknowledgeBtn"),
  warning: $("contentWarningOverlay"),
  warningToggle: $("dismissWarningToggle"),
  warningBtn: $("contentWarningBtn")
};

let state = freshState();
let autoCarry = 0n;
let clickTimes = [];
let sessionStart = Date.now();
let lastRenderedLevel = -1;
let shopBuilt = false;
let dirty = false;
let lastSavedAt = 0;
let easterProgress = [];
const shopNodes = new Map();
const watermarkStrings = [
  "iteuhw807uhb70sbtiamt3imc8qguga6stalrf9j3g1gj498dh",
  "signal_greenroom_sequence_18",
  "quiet_arcade_anchor_n4",
  "coinshift_memory_lane_223"
].concat(window.EC_ASSET_MANIFEST?.watermarkStrings || []);
let staticModeUnlocked = false;
let typedBuffer = "";
let spaceHeld = false;
const watermarkPulse = watermarkStrings.join("|").length;

function freshState() {
  return {
    score10: 0n,
    perClick: BASE_PER_CLICK,
    upgradesOwned: 0n,
    lifetimeIncome10: 0n,
    totalSpent10: 0n,
    selectedSkin: "epstein",
    safeMode: false,
    buyMode: 1n,
    rawClicks: 0,
    totalPlayMs: 0,
    lastBulkSummary: "BUY ALL READY.",
    easterUnlocked: false,
    upgrades: UPGRADE_DATA.map((upgrade) => ({
      id: upgrade[0],
      name: upgrade[1],
      initialCost: upgrade[2],
      cost: upgrade[2],
      add: upgrade[3],
      scaleNum: upgrade[4],
      scaleDen: 100n,
      owned: 0n
    }))
  };
}

function markDirty() {
  dirty = true;
}

function commas(value) {
  const isNegative = value < 0n;
  const abs = isNegative ? -value : value;
  return `${isNegative ? "-" : ""}${abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function named(value) {
  const names = [
    [10n ** 30n, "nonillion"],
    [10n ** 27n, "octillion"],
    [10n ** 24n, "septillion"],
    [10n ** 21n, "sextillion"],
    [10n ** 18n, "quintillion"],
    [10n ** 15n, "quadrillion"],
    [10n ** 12n, "trillion"],
    [10n ** 9n, "billion"],
    [10n ** 6n, "million"],
    [10n ** 3n, "thousand"]
  ];
  for (const [amount, label] of names) {
    if (value >= amount) {
      const whole = value / amount;
      const decimal = whole < 100n ? Number(((value % amount) * 10n) / amount) : 0;
      return decimal ? `${whole}.${decimal} ${label}` : `${whole} ${label}`;
    }
  }
  return commas(value);
}

function safeText(value) {
  if (!state.safeMode) {
    return value;
  }
  return value
    .replace(/Ironclad Alibi/gi, "Ironclad Giveaway")
    .replace(/Last Minute Lawyer/gi, "Last Minute Helper")
    .replace(/Diddy Factory/gi, "MrBeast Factory")
    .replace(/Epstein/gi, "MrBeast")
    .replace(/Untouchable/gi, "Friendly")
    .replace(/Baby Oil/gi, "Feastable")
    .replace(/Island/gi, "Studio")
    .replace(/Degree/gi, "Collab")
    .replace(/Witness/gi, "Viewer")
    .replace(/Blackmail/gi, "Challenge")
    .replace(/Coverup/gi, "Giveaway");
}

function formatScore10(value) {
  const labels = [
    [1000000000000n, "trillion"],
    [1000000000n, "billion"],
    [1000000n, "million"],
    [1000n, "thousand"]
  ];
  for (const [amount, label] of labels) {
    const scaledThreshold = amount * SCORE_STEP;
    if (value >= scaledThreshold) {
      const scaled10 = value / amount;
      const whole = scaled10 / SCORE_STEP;
      const tenth = scaled10 % SCORE_STEP;
      return tenth ? `${whole}.${tenth} ${label}` : `${whole} ${label}`;
    }
  }
  const whole = value / SCORE_STEP;
  const tenth = value % SCORE_STEP;
  return `${commas(whole)}.${tenth}`;
}

function formatTime(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function checksum(text) {
  let hash = 2166136261n;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= BigInt(text.charCodeAt(index));
    hash = (hash * 16777619n) & 0xffffffffn;
  }
  return hash.toString(16).padStart(8, "0");
}

function nextCost(cost, upgrade) {
  const scaled = (cost * upgrade.scaleNum) / upgrade.scaleDen;
  return scaled > cost ? scaled : cost + 1n;
}

function costForOwned(upgrade, owned) {
  let cost = upgrade.initialCost;
  for (let count = 0n; count < owned; count += 1n) {
    cost = nextCost(cost, upgrade);
  }
  return cost;
}

function deriveTotals(upgrades) {
  let perClick = BASE_PER_CLICK;
  let upgradesOwned = 0n;
  for (const upgrade of upgrades) {
    perClick += upgrade.add * upgrade.owned;
    upgradesOwned += upgrade.owned;
  }
  return { perClick, upgradesOwned };
}

function savePayload() {
  return {
    score10: state.score10.toString(),
    perClick: state.perClick.toString(),
    upgradesOwned: state.upgradesOwned.toString(),
    lifetimeIncome10: state.lifetimeIncome10.toString(),
    totalSpent10: state.totalSpent10.toString(),
    selectedSkin: state.selectedSkin,
    safeMode: state.safeMode,
    buyMode: state.buyMode.toString(),
    rawClicks: state.rawClicks,
    totalPlayMs: state.totalPlayMs + (Date.now() - sessionStart),
    easterUnlocked: state.easterUnlocked,
    upgrades: state.upgrades.map((upgrade) => ({
      id: upgrade.id,
      owned: upgrade.owned.toString(),
      cost: upgrade.cost.toString()
    }))
  };
}

function save(force = false) {
  if (!force && !dirty) {
    return;
  }
  try {
    const payload = savePayload();
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({
        v: SAVE_VERSION,
        payload,
        seal: checksum(JSON.stringify(payload))
      })
    );
    dirty = false;
    lastSavedAt = Date.now();
  } catch {
    dirty = true;
  }
}

function parseBig(value) {
  try {
    return typeof value === "string" && /^-?\d+$/.test(value) ? BigInt(value) : null;
  } catch {
    return null;
  }
}

function restore(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.v !== SAVE_VERSION || parsed.seal !== checksum(JSON.stringify(parsed.payload))) {
      return false;
    }
    const payload = parsed.payload;
    const score10 = parseBig(payload.score10);
    const perClick = parseBig(payload.perClick);
    const upgradesOwned = parseBig(payload.upgradesOwned);
    const lifetimeIncome10 = parseBig(payload.lifetimeIncome10 ?? payload.score10);
    const totalSpent10 = parseBig(payload.totalSpent10 ?? "0");
    const buyMode = parseBig(payload.buyMode);
    if (
      score10 === null ||
      perClick === null ||
      upgradesOwned === null ||
      lifetimeIncome10 === null ||
      totalSpent10 === null ||
      buyMode === null ||
      !BUY_MODES.includes(buyMode)
    ) {
      return false;
    }

    const upgrades = freshState().upgrades;
    const upgradeMap = new Map(upgrades.map((upgrade) => [upgrade.id, upgrade]));
    for (const savedUpgrade of payload.upgrades || []) {
      const upgrade = upgradeMap.get(savedUpgrade.id);
      const owned = parseBig(savedUpgrade.owned);
      const cost = parseBig(savedUpgrade.cost);
      if (!upgrade || owned === null || cost === null || costForOwned(upgrade, owned) !== cost) {
        return false;
      }
      upgrade.owned = owned;
      upgrade.cost = cost;
    }

    const totals = deriveTotals(upgrades);
    if (totals.perClick !== perClick || totals.upgradesOwned !== upgradesOwned || score10 < 0n) {
      return false;
    }

    state = {
      score10,
      perClick,
      upgradesOwned,
      lifetimeIncome10: lifetimeIncome10 >= score10 ? lifetimeIncome10 : score10,
      totalSpent10,
      selectedSkin: SKINS.some((skin) => skin[0] === payload.selectedSkin) ? payload.selectedSkin : "epstein",
      safeMode: !!payload.safeMode,
      buyMode,
      rawClicks: Number(payload.rawClicks || 0),
      totalPlayMs: Number(payload.totalPlayMs || 0),
      lastBulkSummary: "SAVE LOADED.",
      easterUnlocked: !!payload.easterUnlocked,
      upgrades
    };
    sessionStart = Date.now();
    dirty = false;
    return true;
  } catch {
    return false;
  }
}

function triggerTamperReset(reason) {
  state = freshState();
  autoCarry = 0n;
  clickTimes = [];
  sessionStart = Date.now();
  lastRenderedLevel = -1;
  localStorage.removeItem(SAVE_KEY);
  dirty = false;
  if (el.tamperMsg) {
    el.tamperMsg.textContent = `${reason} The save was reset to keep the game stable.`;
  }
  if (el.tamper) {
    el.tamper.hidden = false;
  }
  renderAll();
}

function auditState() {
  const totals = deriveTotals(state.upgrades);
  if (totals.perClick !== state.perClick || totals.upgradesOwned !== state.upgradesOwned || state.score10 < 0n) {
    triggerTamperReset("Runtime drift detected.");
    return false;
  }
  if (state.lifetimeIncome10 < state.score10) {
    triggerTamperReset("Lifetime income drift detected.");
    return false;
  }
  if (state.totalSpent10 < 0n) {
    triggerTamperReset("Spent total drift detected.");
    return false;
  }
  return true;
}

function mountEnhancements() {
  const clicksRow = el.clicksPerMin?.closest(".miniStat");
  if (clicksRow && !$("lifetimeIncomeStat")) {
    clicksRow.insertAdjacentHTML("afterend", '<div class="miniStat miniStatAccent">LIFETIME: <span id="lifetimeIncomeStat">0.0</span></div>');
  }

  const totalOwnedRow = el.totalUpgrades?.closest(".miniStat");
  if (totalOwnedRow && !$("totalSpentStat")) {
    totalOwnedRow.insertAdjacentHTML(
      "afterend",
      '<div class="miniStat">SPENT: <span id="totalSpentStat">0.0</span></div><div class="miniStat miniStatWide">TOP: <span id="topUpgradeStat">NONE</span></div>'
    );
  }

  const skinWrap = el.skinSelect?.closest(".selectWrap");
  if (skinWrap && !$("safeModeTag")) {
    skinWrap.insertAdjacentHTML("afterend", '<div id="safeModeTag" class="statusTag" hidden>SAFE MODE ACTIVE</div>');
  }

  if (el.summary && !$("lastSavedLabel")) {
    el.summary.insertAdjacentHTML("afterend", '<p class="footer" id="lastSavedLabel">LAST SAVED: PENDING</p>');
  }

  el.lifetimeIncome = $("lifetimeIncomeStat");
  el.totalSpent = $("totalSpentStat");
  el.topUpgradeStat = $("topUpgradeStat");
  el.safeModeTag = $("safeModeTag");
  el.lastSavedLabel = $("lastSavedLabel");
}

function levelRequirement(level) {
  if (level <= 1) {
    return 0n;
  }
  const value = BigInt(level - 1);
  if (level <= 200) {
    return 125n * value * value * value + 1800n * value * value + 12000n * value;
  }
  const early = levelRequirement(200);
  const extra = value - 199n;
  return early + 250000000n * extra * extra + 50000000n * extra * extra * extra;
}

function levelName(level) {
  return LEVEL_NAMES[(level - 1) % LEVEL_NAMES.length];
}

function currentLevel() {
  const score = state.lifetimeIncome10 / SCORE_STEP;
  let low = 1;
  let high = TOTAL_LEVELS;
  while (low < high) {
    const middle = Math.floor((low + high + 1) / 2);
    if (score >= levelRequirement(middle)) {
      low = middle;
    } else {
      high = middle - 1;
    }
  }
  return low;
}

function levelProgress(level) {
  if (level >= TOTAL_LEVELS) {
    return 100;
  }
  const score = state.lifetimeIncome10 / SCORE_STEP;
  const currentReq = levelRequirement(level);
  const nextReq = levelRequirement(level + 1);
  return Math.max(0, Math.min(100, Number(((score - currentReq) * 1000n) / (nextReq - currentReq)) / 10));
}

function effectiveSkinId() {
  if (!state.safeMode) {
    return state.selectedSkin;
  }
  return "mrbeast";
}

function renderSkin() {
  const active = SKINS.find((skin) => skin[0] === effectiveSkinId()) || SKINS[0];
  const gameTitle = state.safeMode ? "MrBeast Clicker - Play" : "Epstein Clicker - Play";
  const tickerBrand = state.safeMode ? (window.EC_ASSET_MANIFEST?.siteUrl || "https://sites.google.com/view/staticquasar931/gm3z") : "epsteinclicker.com";
  document.title = gameTitle;
  if (el.pageTitle) {
    el.pageTitle.textContent = gameTitle;
  }
  if (el.safeModeBadge) {
    el.safeModeBadge.textContent = `SAFE MODE: ${state.safeMode ? "ON" : "OFF"}`;
  }
  if (el.subjectHeading) {
    const titleBase = state.safeMode ? "MRBEAST CLICKER" : "EPSTEIN CLICKER";
    el.subjectHeading.textContent = state.easterUnlocked ? `${titleBase} [GOLD RUSH]` : titleBase;
  }
  if (el.clickBtn) {
    el.clickBtn.src = active[2];
    el.clickBtn.alt = `${safeText(active[1])} portrait`;
  }
  if (el.skinSelect) {
    el.skinSelect.value = state.selectedSkin;
    Array.from(el.skinSelect.options).forEach((option) => {
      const match = SKINS.find((skin) => skin[0] === option.value);
      if (match) {
        option.textContent = safeText(match[1]);
      }
    });
  }
  if (el.safeToggle) {
    el.safeToggle.checked = state.safeMode;
  }
  if (el.safeModeTag) {
    el.safeModeTag.hidden = !state.safeMode;
  }
  document.querySelectorAll(".tickerBrand").forEach((node) => {
    node.textContent = tickerBrand;
  });
}

function renderBuyMode() {
  const buttons = [
    [el.buy1, 1n],
    [el.buy10, 10n],
    [el.buy100, 100n]
  ];
  for (const [button, mode] of buttons) {
    if (button) {
      button.classList.toggle("is-active", state.buyMode === mode);
    }
  }
  if (el.buyModeReadout) {
    el.buyModeReadout.textContent = `${state.buyMode}X`;
  }
}

function renderStats() {
  const sessionMs = Date.now() - sessionStart;
  const totalMs = state.totalPlayMs + sessionMs;
  if (el.score) {
    el.score.textContent = formatScore10(state.score10);
  }
  if (el.perClick) {
    el.perClick.textContent = named(state.perClick);
  }
  if (el.perSec) {
    el.perSec.textContent = formatScore10(state.perClick);
  }
  if (el.upgradeCount) {
    el.upgradeCount.textContent = commas(state.upgradesOwned);
  }
  if (el.rawClicks) {
    el.rawClicks.textContent = String(state.rawClicks);
  }
  if (el.statPerClick) {
    el.statPerClick.textContent = named(state.perClick);
  }
  if (el.statPerSec) {
    el.statPerSec.textContent = formatScore10(state.perClick);
  }
  if (el.totalUpgrades) {
    el.totalUpgrades.textContent = commas(state.upgradesOwned);
  }
  if (el.hoursPlayed) {
    el.hoursPlayed.textContent = (totalMs / 3600000).toFixed(2);
  }
  if (el.sessionTime) {
    el.sessionTime.textContent = formatTime(sessionMs);
  }
  if (el.clicksPerMin) {
    el.clicksPerMin.textContent = sessionMs > 0 ? (state.rawClicks / (sessionMs / 60000)).toFixed(1) : "0.0";
  }
  if (el.lifetimeIncome) {
    el.lifetimeIncome.textContent = formatScore10(state.lifetimeIncome10);
  }
  if (el.totalSpent) {
    el.totalSpent.textContent = formatScore10(state.totalSpent10);
  }
  if (el.topUpgradeStat) {
    const topUpgrade = [...state.upgrades].reverse().find((upgrade) => upgrade.owned > 0n);
    el.topUpgradeStat.textContent = topUpgrade ? `${safeText(topUpgrade.name)} #${commas(topUpgrade.owned)}` : "NONE";
  }
  if (el.lastSavedLabel) {
    if (dirty) {
      el.lastSavedLabel.textContent = "LAST SAVED: SAVING...";
    } else if (!lastSavedAt) {
      el.lastSavedLabel.textContent = "LAST SAVED: PENDING";
    } else {
      const secondsAgo = Math.max(0, Math.floor((Date.now() - lastSavedAt) / 1000));
      el.lastSavedLabel.textContent = secondsAgo < 2 ? "LAST SAVED: JUST NOW" : `LAST SAVED: ${secondsAgo}S AGO`;
    }
  }
}

function renderLevels() {
  const level = currentLevel();
  const progress = levelProgress(level);
  if (el.currentLevel) {
    el.currentLevel.textContent = String(level);
  }
  if (el.currentLevelName) {
    el.currentLevelName.textContent = levelName(level);
  }
  if (el.nextLevel) {
    el.nextLevel.textContent = level >= TOTAL_LEVELS ? "MAX" : named(levelRequirement(level + 1));
  }
  if (el.levelProgress) {
    el.levelProgress.textContent = `${progress.toFixed(1)}%`;
  }
  if (el.progressBar) {
    el.progressBar.style.width = `${progress}%`;
  }

  if (lastRenderedLevel === level || !el.levelList) {
    return;
  }
  lastRenderedLevel = level;
  el.levelList.innerHTML = "";
  const end = Math.min(TOTAL_LEVELS, level + LEVEL_PREVIEW_COUNT - 1);
  for (let index = level; index <= end; index += 1) {
    const item = document.createElement("div");
    item.className = `level-item${index === level ? " active" : ""}`;
    item.innerHTML = `<span>${index}. ${levelName(index)}</span><strong>${index >= TOTAL_LEVELS ? "MAX" : named(levelRequirement(index + 1))}</strong>`;
    el.levelList.appendChild(item);
  }
}

function setSummary(text) {
  state.lastBulkSummary = safeText(text);
  if (el.summary) {
    el.summary.textContent = state.lastBulkSummary;
  }
}

function awardIncome(amount10) {
  state.score10 += amount10;
  state.lifetimeIncome10 += amount10;
  markDirty();
}

function purchasePlan(upgrade, balance10, wanted) {
  let spent10 = 0n;
  let bought = 0n;
  let cost = upgrade.cost;
  let steps = 0;
  while (bought < wanted && steps < MAX_STEPS) {
    const cost10 = cost * SCORE_STEP;
    if (spent10 + cost10 > balance10) {
      break;
    }
    spent10 += cost10;
    cost = nextCost(cost, upgrade);
    bought += 1n;
    steps += 1;
  }
  return { count: bought, spent10, nextCost: cost };
}

function maxPlan(upgrade, balance10) {
  let spent10 = 0n;
  let bought = 0n;
  let cost = upgrade.cost;
  let steps = 0;
  while (steps < MAX_STEPS) {
    const cost10 = cost * SCORE_STEP;
    if (spent10 + cost10 > balance10) {
      break;
    }
    spent10 += cost10;
    cost = nextCost(cost, upgrade);
    bought += 1n;
    steps += 1;
  }
  return { count: bought, spent10, nextCost: cost };
}

function applyPlan(upgrade, plan) {
  if (plan.count <= 0n) {
    return false;
  }
  state.score10 -= plan.spent10;
  state.totalSpent10 += plan.spent10;
  upgrade.owned += plan.count;
  upgrade.cost = plan.nextCost;
  state.perClick += upgrade.add * plan.count;
  state.upgradesOwned += plan.count;
  markDirty();
  return true;
}

function buildShop() {
  if (!el.shop) {
    return;
  }
  el.shop.innerHTML = "";
  shopNodes.clear();
  for (const upgrade of state.upgrades) {
    const row = document.createElement("article");
    row.className = "shop-row";
    row.innerHTML =
      `<div class="shop-copy"><h3>${upgrade.name}</h3><p></p></div>` +
      `<div class="shop-actions"><button type="button"></button><button type="button"></button></div>`;
    const text = row.querySelector("p");
    const buttons = row.querySelectorAll("button");
    buttons[0].addEventListener("click", () => buyUpgrade(upgrade.id, state.buyMode));
    buttons[1].addEventListener("click", () => buyUpgradeMax(upgrade.id));
    el.shop.appendChild(row);
    shopNodes.set(upgrade.id, { text, buy: buttons[0], max: buttons[1] });
  }
  shopBuilt = true;
  refreshShop();
}

function refreshShop() {
  for (const upgrade of state.upgrades) {
    const node = shopNodes.get(upgrade.id);
    if (!node) {
      continue;
    }
    const buyPlan = purchasePlan(upgrade, state.score10, state.buyMode);
    const bulkPlan = maxPlan(upgrade, state.score10);
    const shownName = safeText(upgrade.name);
    node.text.previousElementSibling.textContent = shownName;
    node.text.innerHTML = `Owned: x${commas(upgrade.owned)}<br>+${named(upgrade.add)} per click<br>Cost: ${named(upgrade.cost)}`;
    node.buy.textContent = `BUY ${state.buyMode}X`;
    node.max.textContent = bulkPlan.count > 0n ? `MAX (${commas(bulkPlan.count)})` : "MAX";
    node.buy.disabled = buyPlan.count === 0n;
    node.max.disabled = bulkPlan.count === 0n;
  }
}

function buyUpgrade(id, count) {
  const upgrade = state.upgrades.find((item) => item.id === id);
  if (!upgrade) {
    return;
  }
  const plan = purchasePlan(upgrade, state.score10, count);
  if (!applyPlan(upgrade, plan)) {
    return;
  }
  setSummary(`BOUGHT ${plan.count} ${safeText(upgrade.name).toUpperCase()}.`);
  renderAll();
}

function buyUpgradeMax(id) {
  const upgrade = state.upgrades.find((item) => item.id === id);
  if (!upgrade) {
    return;
  }
  const plan = maxPlan(upgrade, state.score10);
  if (!applyPlan(upgrade, plan)) {
    return;
  }
  setSummary(`MAX BOUGHT ${plan.count} ${safeText(upgrade.name).toUpperCase()}.`);
  renderAll();
}

function buyAll() {
  let total = 0n;
  const ordered = [...state.upgrades].sort((a, b) => {
    if (a.cost === b.cost) {
      return 0;
    }
    return a.cost > b.cost ? -1 : 1;
  });
  for (const upgrade of ordered) {
    const plan = purchasePlan(upgrade, state.score10, state.buyMode);
    if (applyPlan(upgrade, plan)) {
      total += plan.count;
    }
  }
  if (total === 0n) {
    setSummary("NOTHING AFFORDABLE.");
    refreshShop();
    return;
  }
  setSummary(`BUY ALL BOUGHT ${total} UPGRADES.`);
  renderAll();
}

function floatText(text, x, y) {
  if (!el.floating) {
    return;
  }
  const node = document.createElement("div");
  node.className = "float-text";
  node.textContent = text;
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;
  el.floating.appendChild(node);
  setTimeout(() => node.remove(), 740);
}

function noteClick(now) {
  clickTimes.push(now);
  clickTimes = clickTimes.filter((time) => time >= now - 4000);
  return true;
}

function clickCenter() {
  const rect = el.clickBtn.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

function pulsePortrait() {
  if (!el.clickBtn) {
    return;
  }
  el.clickBtn.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(0.93)" },
      { transform: "scale(1.04)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 120,
      easing: "ease-out"
    }
  );
}

function doClick(point) {
  if (!auditState() || !noteClick(performance.now())) {
    return;
  }
  awardIncome(state.perClick * SCORE_STEP);
  state.rawClicks += 1;
  pulsePortrait();
  floatText(`+${named(state.perClick)}`, point.x, point.y);
  renderStats();
  renderLevels();
  refreshShop();
  if (watermarkPulse < 0) {
    setSummary("ARC");
  }
}

function handleEasterEgg(code) {
  easterProgress.push(code);
  if (easterProgress.length > KONAMI.length) {
    easterProgress = easterProgress.slice(-KONAMI.length);
  }
  if (KONAMI.every((value, index) => easterProgress[index] === value)) {
    state.easterUnlocked = true;
    document.body.classList.add("easter-on");
    setSummary("GOLD RUSH UNLOCKED.");
    for (let index = 0; index < 16; index += 1) {
      floatText(
        index % 2 === 0 ? "GOLD RUSH" : "SECRET",
        80 + Math.random() * (window.innerWidth - 160),
        120 + Math.random() * (window.innerHeight - 220)
      );
    }
    markDirty();
    renderSkin();
    easterProgress = [];
  }
}

function handleStaticCode(key) {
  if (key.length !== 1) {
    return;
  }
  typedBuffer = `${typedBuffer}${key.toLowerCase()}`.slice(-STATIC_CODE.length);
  if (typedBuffer === STATIC_CODE && !staticModeUnlocked) {
    staticModeUnlocked = true;
    setSummary("STATIC MODE UNLOCKED.");
    for (let index = 0; index < 8; index += 1) {
      floatText(
        index % 2 === 0 ? "STATIC" : "MODE",
        90 + Math.random() * (window.innerWidth - 180),
        100 + Math.random() * (window.innerHeight - 220)
      );
    }
  }
}

function renderAll() {
  renderSkin();
  renderBuyMode();
  renderStats();
  renderLevels();
  if (!shopBuilt) {
    buildShop();
  } else {
    refreshShop();
  }
  if (state.easterUnlocked) {
    document.body.classList.add("easter-on");
  } else {
    document.body.classList.remove("easter-on");
  }
  if (el.summary) {
    el.summary.textContent = state.lastBulkSummary;
  }
}

function setupSkinSelect() {
  if (!el.skinSelect) {
    return;
  }
  el.skinSelect.innerHTML = "";
  for (const skin of SKINS) {
    const image = new Image();
    image.src = skin[2];
    const option = document.createElement("option");
    option.value = skin[0];
    option.textContent = skin[1];
    el.skinSelect.appendChild(option);
  }
}

function startIntervals() {
  if (window.EC_ASSET_MANIFEST?.ready) {
    window.EC_ASSET_MANIFEST.ready.catch(() => {});
  }
  setInterval(() => {
    if (!auditState()) {
      return;
    }
    autoCarry += state.perClick;
    const addNow = autoCarry / AUTO_TICKS_PER_SEC;
    autoCarry %= AUTO_TICKS_PER_SEC;
    if (addNow > 0n) {
      awardIncome(addNow);
      renderStats();
      renderLevels();
      refreshShop();
    }
  }, 50);

  setInterval(() => {
    renderStats();
    if (dirty && Date.now() - lastSavedAt >= AUTOSAVE_INTERVAL_MS) {
      save(true);
    }
  }, 500);

  setInterval(() => {
    auditState();
  }, 2500);

  setInterval(() => {
    if (staticModeUnlocked && spaceHeld) {
      doClick(clickCenter());
    }
  }, 45);
}

function attachEvents() {
  el.clickBtn.addEventListener("click", (event) => {
    if (!event.isTrusted) {
      triggerTamperReset("Synthetic click blocked.");
      return;
    }
    doClick({ x: event.clientX, y: event.clientY });
  });

  document.addEventListener("keydown", (event) => {
    if (!event.isTrusted) {
      return;
    }
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      (target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable)
    ) {
      return;
    }

    handleEasterEgg(event.code);
    handleStaticCode(event.key);

    if (event.code === "Space") {
      event.preventDefault();
      spaceHeld = true;
      doClick(clickCenter());
    } else if (event.code === "KeyB") {
      event.preventDefault();
      buyAll();
    } else if (event.code === "KeyS") {
      event.preventDefault();
      state.safeMode = !state.safeMode;
      markDirty();
      renderSkin();
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      spaceHeld = false;
    }
  });

  el.skinSelect.addEventListener("change", () => {
    state.selectedSkin = el.skinSelect.value;
    markDirty();
    renderSkin();
  });

  el.safeToggle.addEventListener("change", () => {
    state.safeMode = el.safeToggle.checked;
    markDirty();
    renderSkin();
  });

  el.buy1.addEventListener("click", () => {
    state.buyMode = 1n;
    renderBuyMode();
    refreshShop();
    markDirty();
  });

  el.buy10.addEventListener("click", () => {
    state.buyMode = 10n;
    renderBuyMode();
    refreshShop();
    markDirty();
  });

  el.buy100.addEventListener("click", () => {
    state.buyMode = 100n;
    renderBuyMode();
    refreshShop();
    markDirty();
  });

  el.buyAll.addEventListener("click", buyAll);

  el.reset.addEventListener("click", () => {
    if (!window.confirm("RESET EVERYTHING? ARE YOU ABSOLUTELY, COMPLETELY SURE?")) {
      return;
    }
    if (!window.confirm("FINAL CHECK: DELETE THIS SAVE AND START OVER?")) {
      return;
    }
    state = freshState();
    autoCarry = 0n;
    clickTimes = [];
    sessionStart = Date.now();
    lastRenderedLevel = -1;
    localStorage.removeItem(SAVE_KEY);
    dirty = false;
    renderAll();
  });

  el.tamperOk.addEventListener("click", () => {
    el.tamper.hidden = true;
  });

  el.warningBtn.addEventListener("click", () => {
    if (el.warningToggle.checked) {
      localStorage.setItem(WARNING_KEY, "1");
    }
    el.warning.hidden = true;
  });

  window.addEventListener("beforeunload", () => save(true));
}

function bootGame() {
  mountEnhancements();
  setupSkinSelect();
  const saved = localStorage.getItem(SAVE_KEY);
  if (saved && !restore(saved)) {
    triggerTamperReset("Save integrity check failed.");
  }
  if (localStorage.getItem(WARNING_KEY) === "1" && el.warning) {
    el.warning.hidden = true;
  } else if (el.warning) {
    el.warning.hidden = false;
  }
  renderAll();
  attachEvents();
  startIntervals();
}

if (window.EC_ASSET_MANIFEST?.ready) {
  window.EC_ASSET_MANIFEST.ready.finally(bootGame);
} else {
  bootGame();
}
