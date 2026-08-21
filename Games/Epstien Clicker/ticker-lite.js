(function() {
  var lastValue = "";

  function tick() {
    var score = document.getElementById("score");
    if (!score) {
      requestAnimationFrame(tick);
      return;
    }
    var value = score.textContent || "0.0";
    if (value === lastValue) {
      requestAnimationFrame(tick);
      return;
    }
    lastValue = value;
    var nodes = document.querySelectorAll(".tickerScore");
    nodes.forEach(function(node) {
      node.textContent = value;
    });
    requestAnimationFrame(tick);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", tick);
  } else {
    tick();
  }
})();
