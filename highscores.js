/* jshint esversion: 11 */

const LIST_ID = "highScoreList";
const CLEAR_BTN_ID = "clearScoresBtn";
const KEY = "highScores";

// Ask the user for their name (once per session)
const currentUser = prompt("Enter your name") || "Player";

// Render the high score list
function render() {
  const list = document.getElementById(LIST_ID);
  if (!list) return;

  const scores = JSON.parse(localStorage.getItem(KEY)) || [];

  if (!scores.length) {
    list.innerHTML = `<li class="high-score empty">No scores yet.</li>`;
    return;
  }

  // Sort descending by score
  scores.sort((a, b) => (b?.score || 0) - (a?.score || 0));

  list.innerHTML = scores
    .map(s => {
      // Highlight the current user's score
      const highlight = s.name === currentUser ? "current-user" : "";
      return `<li class="high-score ${highlight}">${s.name} - ${s.score}</li>`;
    })
    .join("");
}

// Clear only the current user's scores
document.getElementById(CLEAR_BTN_ID)?.addEventListener("click", (e) => {
  e.preventDefault();

  const scores = JSON.parse(localStorage.getItem(KEY)) || [];

  // Remove only this user's scores
  const filteredScores = scores.filter(s => s.name !== currentUser);

  localStorage.setItem(KEY, JSON.stringify(filteredScores));
  render();
});

// Initial render
render();