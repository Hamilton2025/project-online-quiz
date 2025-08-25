/* jshint esversion: 11 */

const LIST_ID = "highScoreList";
const CLEAR_BTN_ID = "clearScoresBtn";
const KEY = "highScores";     
const LEGACY_KEY = "highScore"; 

try {
  const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY));
  if (Array.isArray(legacy) && legacy.length) {
    const current = JSON.parse(localStorage.getItem(KEY)) || [];
    localStorage.setItem(KEY, JSON.stringify([...current, ...legacy]));
    localStorage.removeItem(LEGACY_KEY);
  }
} catch { /* ignore */ }

// Render list
function render() {
  const list = document.getElementById(LIST_ID);
  if (!list) return;

  let scores = [];
  try {
    scores = JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    scores = [];
  }

  if (!scores.length) {
    list.innerHTML = `<li class="high-score empty">No scores yet.</li>`;
    return;
  }

  list.innerHTML = scores
    .sort((a, b) => (b?.score || 0) - (a?.score || 0))
    .map(s => `<li class="high-score">${(s?.name ?? "Player")} - ${s?.score ?? 0}</li>`)
    .join("");
}

// Clear button
document.getElementById(CLEAR_BTN_ID)?.addEventListener("click", (e) => {
  e.preventDefault?.();
  localStorage.removeItem(KEY);
  render();
});

// Initial render
render();

