/* jshint esversion: 11 */
/* exported saveHighScore */

const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScore = JSON.parse(localStorage.getItem("highScore")) || [];

const MAX_HIGH_SCORE = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

const saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();

    const score = {
    score: mostRecentScore,
    name: username.value
    };

    highScore.push(score);
    highScore.sort((a, b) => b.score - a.score);
    highScore.splice(MAX_HIGH_SCORE);

    localStorage.setItem("highScore", JSON.stringify(highScore));

    window.location.assign("index.html");
};
