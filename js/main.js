// Stub: /js/main.js (3kh0 compatibility)
// Games that call main() define their own override in subsequent scripts
if (typeof window.main === "undefined") {
  window.main = function() { console.log("main stub called"); };
}