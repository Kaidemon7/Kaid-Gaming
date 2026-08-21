"use strict";

/* =========================
   GLOBAL CRASH SHIELD
========================= */
window.onerror = function (msg, src, line, col, err) {
  console.error("GLOBAL ERROR:", msg, err);
  return true;
};

const safe = (fn, name) => (...args) => {
  try {
    return fn(...args);
  } catch (e) {
    console.error(`ERROR in ${name}:`, e);
  }
};

/* =========================
   GAMES (FROM games.js)
========================= */
function loadGames() {
  try {
    const list = window.GAMES || [];
    const grid = document.getElementById("grid");
    if (!grid) return;

    grid.innerHTML = "";

    list.forEach(g => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        ${g.n}
        <small>${g.f}</small>
      `;

      card.onclick = () => openGame(g.f);

      grid.appendChild(card);
    });

  } catch (e) {
    console.error("loadGames failed:", e);
  }
}

function openGame(file) {
  try {
    const player = document.getElementById("player");
    const frame = document.getElementById("frame");
    if (!player || !frame) return;

    player.style.display = "block";
    frame.src = file;
  } catch (e) {
    console.error("openGame failed:", e);
  }
}

function closeGame() {
  try {
    document.getElementById("player").style.display = "none";
    document.getElementById("frame").src = "";
  } catch (e) {
    console.error(e);
  }
}

/* =========================
   MUSIC (LOCAL FILES)
========================= */
// change these to your real /sounds or /music folder paths
const tracks = [
  { name: "Track 1", src: "main file/Music/track1.mp3" },
  { name: "Track 2", src: "main file/Music/track2.mp3" },
  { name: "Track 3", src: "main file/Music/track3.mp3" }
];

let currentAudio = null;

function loadTracks() {
  try {
    const box = document.getElementById("trackList");
    if (!box) return;

    box.innerHTML = "";

    tracks.forEach((t, i) => {
      const div = document.createElement("div");
      div.className = "track";

      div.innerHTML = `
        <span>▶ ${i + 1}. ${t.name}</span>
        <span>PLAY</span>
      `;

      div.onclick = () => playTrack(t.src);

      box.appendChild(div);
    });

  } catch (e) {
    console.error("loadTracks failed:", e);
  }
}

function playTrack(src) {
  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }

    if (!src) return;

    currentAudio = new Audio(src);

    // ✅ YOUR REQUEST: 0.5 SPEED MUSIC
    currentAudio.playbackRate = 0.5;

    currentAudio.play().catch(err => {
      console.error("Audio play blocked:", err);
    });

  } catch (e) {
    console.error("playTrack failed:", e);
  }
}

/* =========================
   UI SAFE SWITCH
========================= */
function show(id) {
  try {
    document.querySelectorAll(".section")
      .forEach(s => s.classList.remove("active"));

    document.getElementById(id)?.classList.add("active");
  } catch (e) {
    console.error(e);
  }
}

/* =========================
   INIT
========================= */
window.addEventListener("load", () => {
  safe(loadGames, "loadGames")();
  safe(loadTracks, "loadTracks")();
});