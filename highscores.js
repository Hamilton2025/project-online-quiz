const highScoreList = document.getElementById("highScoreList");
const highScores = JSON.parse(localStorage.getItem("highScore")) || []; 

highScoreList.innerHTML = highScores
.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
})
.join("");    

const clearScoresBtn = document.getElementById("clearScoresBtn");

clearScoresBtn.addEventListener("click", () => {
    localStorage.removeItem("highScore");
    alert("High scores cleared!");
    location.reload();
});
