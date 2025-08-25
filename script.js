/* jshint esversion: 11 */

const body = document.documentElement;
const themeBtn = document.getElementById("toggleTheme");

if(localStorage.getItem("theme") === "light"){
  body.classList.add("light");
  themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  themeBtn.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});