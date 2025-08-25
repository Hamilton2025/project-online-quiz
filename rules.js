/* jshint esversion: 11 */

const rulesBtn = document.getElementById("rules-btn");
const rulesPopup = document.getElementById("rules-popup");
const closeRules = document.getElementById("close-rules");

if (rulesBtn && rulesPopup && closeRules) {
  rulesBtn.addEventListener("click", () => {
    rulesPopup.style.display = "flex";
  });

  closeRules.addEventListener("click", () => {
    rulesPopup.style.display = "none";
  });

  // Close when clicking outside the popup content
  rulesPopup.addEventListener("click", (e) => {
    if (e.target === rulesPopup) {
      rulesPopup.style.display = "none";
    }
  });
}
