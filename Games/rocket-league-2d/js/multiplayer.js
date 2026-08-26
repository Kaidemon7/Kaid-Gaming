/* Rocket League 2D - Online 1v1 multiplayer via Firebase RTDB.
   HOST = orange car (WASD, left). Host simulates ball, scores and timer.
   GUEST = blue car (arrows, right). Guest sends its car; host is authoritative.
   Works when the game is opened directly or inside the Kaid Gaming portal. */

var RL_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAjjoLkq9VTI3FA6TzzjvT44sNdl-xRc14",
  authDomain: "kaid-gaming-v3.firebaseapp.com",
  databaseURL: "https://kaid-gaming-v3-default-rtdb.firebaseio.com",
  projectId: "kaid-gaming-v3"
};

(function () {
  "use strict";

  var ROLE = null;          // "host" | "guest"
  var code = null;
  var db = null;
  var hostStarted = false;
  var guestStarted = false;
  var guestJoined = false;
  var guestOverShown = false;
  var hostSyncTimer = null;
  var guestCarTimer = null;
  var busy = false;

  /* ---------- styles ---------- */
  $("<style>").text(
    ".online-btn{position:fixed;top:14px;right:14px;background:#ff6a00;color:#fff;" +
    "padding:10px 18px;border-radius:8px;font-weight:700;cursor:pointer;z-index:50;" +
    "box-shadow:0 4px 14px rgba(0,0,0,.4)}" +
    ".online-btn:hover{background:#ff8c2e}" +
    ".online-menu{position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:200;" +
    "display:flex;align-items:center;justify-content:center}" +
    ".om-card{background:#1a1a2e;border:1px solid #333;border-radius:14px;padding:26px;" +
    "width:340px;color:#eee;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.6)}" +
    ".om-card h2{color:#ff6a00;margin-bottom:8px}" +
    ".om-info{font-size:13px;color:#aaa;margin-bottom:16px}" +
    ".om-row{display:flex;gap:8px;margin-bottom:12px}" +
    ".om-row input{flex:1;padding:10px;border-radius:8px;border:1px solid #444;" +
    "background:#111;color:#fff;font-size:15px;text-transform:uppercase;text-align:center;outline:none}" +
    ".om-btn{width:100%;padding:10px;border:none;border-radius:8px;background:#ff6a00;" +
    "color:#fff;font-weight:700;cursor:pointer;margin-bottom:8px;font-size:14px}" +
    ".om-btn.big{padding:13px}" +
    ".om-btn.ghost{background:transparent;border:1px solid #444;color:#bbb}" +
    ".om-btn:hover{background:#ff8c2e}" +
    ".om-btn.ghost:hover{color:#fff}" +
    ".om-status{font-size:13px;color:#ffd166;min-height:18px;margin-top:6px}"
  ).appendTo("head");

  /* ---------- UI ---------- */
  var menu = $(
    '<div class="online-menu hidden">' +
      '<div class="om-card">' +
        '<h2>Online 1v1</h2>' +
        '<p class="om-info">Play rocket soccer against a friend. ' +
        'The host makes a room and shares the code. Blue car player joins with the code.</p>' +
        '<div class="om-row">' +
          '<input id="om-code" placeholder="Room code" maxlength="6" autocomplete="off">' +
          '<button id="om-join" class="om-btn">Join</button>' +
        '</div>' +
        '<button id="om-create" class="om-btn big">Create a Room</button>' +
        '<div class="om-status"></div>' +
        '<button id="om-back" class="om-btn ghost">Back</button>' +
      '</div>' +
    '</div>'
  );
  $("body").append(menu);

  var statusEl = menu.find(".om-status");
  function status(msg) { statusEl.text(msg || ""); }

  $('<div class="online-btn">Online 1v1</div>').insertBefore(".start-button")
    .on("click", function () { menu.removeClass("hidden"); status(""); });

  $("#om-back").on("click", function () { menu.addClass("hidden"); });

  $("#om-create").on("click", function () {
    if (busy) return;
    if (typeof firebase === "undefined") { status("Firebase failed to load. Check your internet."); return; }
    busy = true;
    status("Creating room...");
    setupDb().then(function () {
      code = randomCode();
      return set(ref(db, "rlRooms/" + code), { host: true, started: false, ts: Date.now() });
    }).then(function () {
      ROLE = "host";
      onDisconnect(ref(db, "rlRooms/" + code)).remove();
      status("Waiting for opponent...");
      $(".om-row").hide();
      $("#om-create").hide();
      $(".om-info").text("Share this code with a friend: " + code);
      $(".om-info").css("font-weight", "bold");
      listenGuest();
      hostSyncTimer = setInterval(hostPublish, 50);
    }).catch(function (e) { status("Error: " + e.message); busy = false; });
  });

  $("#om-join").on("click", joinRoom);

  $("#om-code").on("keydown", function (e) {
    if (e.key === "Enter") joinRoom();
  });

  function joinRoom() {
    if (busy) return;
    var c = String($("#om-code").val() || "").trim().toUpperCase();
    if (!c) { status("Enter a room code."); return; }
    if (typeof firebase === "undefined") { status("Firebase failed to load. Check your internet."); return; }
    busy = true;
    status("Joining " + c + "...");
    setupDb().then(function () {
      code = c;
      return get(ref(db, "rlRooms/" + c));
    }).then(function (snap) {
      var room = snap.val();
      if (!room || !room.host) { throw new Error("Room not found"); }
      ROLE = "guest";
      guestJoined = true;
      set(ref(db, "rlRooms/" + c + "/guestJoined"), true);
      onDisconnect(ref(db, "rlRooms/" + c + "/guestJoined")).remove();
      onDisconnect(ref(db, "rlRooms/" + c + "/guestState")).remove();
      status("Connected! Waiting for host to start...");
      $(".om-row").hide();
      $("#om-create").hide();
      $(".om-info").text("Joined room " + c + ". You are the BLUE car (arrows).");
      window.setTimer = function () { }; // guest: host controls the clock
      guestCarTimer = setInterval(guestPublishCar, 50);
      listenState();
    }).catch(function (e) { status("Error: " + e.message); busy = false; });
  }

  /* ---------- Firebase ---------- */
  function setupDb() {
    if (db) return Promise.resolve();
    try {
      firebase.initializeApp(RL_FIREBASE_CONFIG);
      db = firebase.database();
    } catch (e) { return Promise.reject(e); }
    return firebase.auth().signInAnonymously()
      .catch(function (e) {
        db = null;
        throw new Error("Couldn't sign in to Firebase (" + e.code + "). Check your internet.");
      });
  }

  /* ---------- HOST: publish authoritative state, use guest car ---------- */
  function hostPublish() {
    if (!players || players.length < 2 || !db || !code) return;
    var over = timerCount <= -1;
    set(ref(db, "rlRooms/" + code + "/state"), {
      c0: { x: round1(players[0].xMid), y: round1(players[0].yMid), r: round1(players[0].rot), v: round1(players[0].vel) },
      c1: { x: round1(players[1].xMid), y: round1(players[1].yMid), r: round1(players[1].rot), v: round1(players[1].vel) },
      b:  { x: round1(ball.x), y: round1(ball.y), vx: round1(ball.velX), vy: round1(ball.velY) },
      so: scoreOrange, sb: scoreBlue, t: timerCount, gameOver: over, started: true
    });
  }

  function listenGuest() {
    onValue(ref(db, "rlRooms/" + code + "/guestJoined"), function (snap) {
      if (snap.val() && !hostStarted) {
        hostStarted = true;
        startGame();
        $(".instructions").toggleClass("hidden");
      }
    });
    onValue(ref(db, "rlRooms/" + code + "/guestState"), function (snap) {
      var s = snap.val();
      if (!s) return;
      if (players && players.length >= 2) {
        players[1].xMid = s.x;
        players[1].yMid = s.y;
        players[1].rot = s.r;
        players[1].vel = s.v;
      }
    });
  }

  /* ---------- GUEST: send own car, render host state ---------- */
  function guestPublishCar() {
    if (!players || players.length < 2 || !db || !code) return;
    set(ref(db, "rlRooms/" + code + "/guestState"), {
      x: round1(players[1].xMid),
      y: round1(players[1].yMid),
      r: round1(players[1].rot),
      v: round1(players[1].vel)
    });
  }

  function listenState() {
    onValue(ref(db, "rlRooms/" + code + "/state"), function (snap) {
      var s = snap.val();
      if (!s || !db) return;

      if (s.started && !guestStarted) {
        guestStarted = true;
        startGame();
        $(".instructions").toggleClass("hidden");
      }
      if (!players || players.length < 2) return;

      players[0].xMid = s.c0.x;
      players[0].yMid = s.c0.y;
      players[0].rot = s.c0.r;
      players[0].vel = s.c0.v;

      ball.x = s.b.x;
      ball.y = s.b.y;
      ball.velX = s.b.vx;
      ball.velY = s.b.vy;

      scoreOrange = s.so;
      scoreBlue = s.sb;
      $(".orange").text(s.so);
      $(".blue").text(s.sb);

      var t = s.t > 0 ? s.t : 0;
      var m = Math.floor(t / 60);
      var sec = t - m * 60;
      sec = (sec % 60 > 9) ? sec % 60 : "0" + sec % 60;
      $(".count-down").text(m + ":" + sec);

      if (s.gameOver && !guestOverShown) {
        guestOverShown = true;
        $(".game-over").removeClass("hidden");
        var w = $(".winner-announce");
        if (s.sb > s.so) { w.text("WINNER! BLUE"); w.css("color", "blue"); }
        else if (s.so > s.sb) { w.text("WINNER! ORANGE"); w.css("color", "orange"); }
        else { w.text("TIE GAME!"); w.css("color", "white"); }
      } else if (!s.gameOver && guestOverShown) {
        guestOverShown = false;
        $(".game-over").addClass("hidden");
        playAgain();
      }
    });
  }

  /* ---------- helpers ---------- */
  function round1(n) { return Math.round(n * 10) / 10; }

  function randomCode() {
    var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    var out = "";
    for (var i = 0; i < 4; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
    return out;
  }

  var ref = function (dbref, path) { return dbref.ref(path); };
  var set = function (r, v) { return r.set(v); };
  var onValue = function (r, cb) { return r.on("value", cb); };
  var get = function (r) { return r.once("value"); };
  var onDisconnect = function (r) { return r.onDisconnect(); };

  window.addEventListener("beforeunload", function () {
    if (db && code) {
      if (ROLE === "host") db.ref("rlRooms/" + code).remove();
      else { db.ref("rlRooms/" + code + "/guestState").remove(); db.ref("rlRooms/" + code + "/guestJoined").remove(); }
    }
  });
})();
