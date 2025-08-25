/* jshint esversion: 11 */

const questionEl = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarfull");
const loader = document.getElementById("loader");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

window.addEventListener("load", () => {
  // Hide loader overlay after a brief moment
  setTimeout(() => {
    if (loader) loader.style.display = "none";
  }, 500);
});

const questions = [
  // Movies & TV
  {
    question: "A boy wizard attends a school for magic.",
    choice1: "The Lord of the Rings",
    choice2: "Harry Potter",
    choice3: "Percy Jackson",
    choice4: "The Chronicles of Narnia",
    answer: 2,
  },
  {
    question: "In Friends, what is the name of Ross’s second wife?",
    choice1: "Emily",
    choice2: "Rachel",
    choice3: "Susan",
    choice4: "Janice",
    answer: 1,
  },
  {
    question: "Which movie features the quote, 'I'll be back'?",
    choice1: "Predator",
    choice2: "Terminator",
    choice3: "RoboCop",
    choice4: "Die Hard",
    answer: 2,
  },
  {
    question: "In Prison Break, what nickname does T-Bag often use for Michael Scofield?",
    choice1: "Pretty",
    choice2: "Genius",
    choice3: "Boss",
    choice4: "Smart Guy",
    answer: 1,
  },

  // Sports
  {
    question: "Which country won the FIFA World Cup in 2018?",
    choice1: "Germany",
    choice2: "Brazil",
    choice3: "France",
    choice4: "Argentina",
    answer: 3,
  },
  {
    question: "Who won the Ballon d'Or in 2019?",
    choice1: "Cristiano Ronaldo",
    choice2: "Lionel Messi",
    choice3: "Luka Modrić",
    choice4: "Virgil van Dijk",
    answer: 2,
  },
  {
    question: "How many players are there in a basketball team on the court?",
    choice1: "4",
    choice2: "5",
    choice3: "6",
    choice4: "7",
    answer: 2,
  },
  {
    question: "As of 2025, how many official career goals has Cristiano Ronaldo scored?",
    choice1: "Over 600",
    choice2: "Over 700",
    choice3: "Over 800",
    choice4: "Over 900",
    answer: 4,
  },

  // Science & Nature
  {
    question: "True or False: Bananas grow on trees.",
    choice1: "True",
    choice2: "False",
    choice3: "Only in the tropics",
    choice4: "Depends on the variety",
    answer: 2,
  },
  {
    question: "How many bones are in the adult human body?",
    choice1: "206",
    choice2: "210",
    choice3: "201",
    choice4: "199",
    answer: 1,
  },

  // General Knowledge
  {
    question: "According to the Mayan calendar prediction, which year was expected to be the end of the world?",
    choice1: "2000",
    choice2: "2012",
    choice3: "2020",
    choice4: "1999",
    answer: 2,
  },
  {
    question: "What is the largest ocean on Earth?",
    choice1: "Atlantic Ocean",
    choice2: "Indian Ocean",
    choice3: "Pacific Ocean",
    choice4: "Arctic Ocean",
    answer: 3,
  },

  // Music
  {
    question: "Which band is known as the 'Fab Four'?",
    choice1: "The Beatles",
    choice2: "The Rolling Stones",
    choice3: "Queen",
    choice4: "The Who",
    answer: 1,
  },
  {
    question: "Who is the 'King of Pop'?",
    choice1: "Prince",
    choice2: "Elvis Presley",
    choice3: "Michael Jackson",
    choice4: "Freddie Mercury",
    answer: 3,
  },

  // Geography
  {
    question: "What is the capital of Angola?",
    choice1: "Huila",
    choice2: "Benguela",
    choice3: "Luanda",
    choice4: "Huambo",
    answer: 3,
  },
  {
    question: "Which country has the most islands in the world?",
    choice1: "Norway",
    choice2: "Sweden",
    choice3: "Indonesia",
    choice4: "Canada",
    answer: 2,
  },
  {
    question: "Which country's flag has green, yellow, and blue with a circle of stars?",
    choice1: "Argentina",
    choice2: "Brazil",
    choice3: "Australia",
    choice4: "South Africa",
    answer: 2,
  },

  // History
  {
    question: "Which came first?",
    choice1: "Instagram",
    choice2: "Snapchat",
    choice3: "Twitter",
    choice4: "TikTok",
    answer: 3,
  },
  {
    question: "Who was the first woman to win a Nobel Prize?",
    choice1: "Marie Curie",
    choice2: "Rosalind Franklin",
    choice3: "Ada Lovelace",
    choice4: "Mother Teresa",
    answer: 1,
  },
  {
    question: "Who was the first person to travel into space?",
    choice1: "Neil Armstrong",
    choice2: "Buzz Aldrin",
    choice3: "Yuri Gagarin",
    choice4: "John Glenn",
    answer: 3,
  },
];

// CONFIG
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = Math.min(10, questions.length);

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  shuffle(availableQuestions);
  getNewQuestion();
}

function getNewQuestion() {
  if (questionCounter >= MAX_QUESTIONS || availableQuestions.length === 0) {
    return finishQuiz();
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${Math.min(
    (questionCounter / MAX_QUESTIONS) * 100,
    100
  )}%`;

  // Pick current question
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  questionEl.innerText = currentQuestion.question;

  const order = [1, 2, 3, 4];
  shuffle(order);

  choices.forEach((choiceEl, i) => {
  const originalIndex = order[i];                 // 1..4 in random order
  choiceEl.innerText = currentQuestion["choice" + originalIndex];
  choiceEl.dataset.number = String(originalIndex); // IMPORTANT: keep original index here
  choiceEl.setAttribute("tabindex", "0");
  choiceEl.setAttribute("role", "button");
  });

  // Remove it from the pool
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

choices.forEach((choice) => {
  // Click support
  choice.addEventListener("click", handleAnswer);
  // Keyboard (Enter/Space) support
  choice.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAnswer({ target: e.currentTarget });
    }
  });
});

function handleAnswer(e) {
  if (!acceptingAnswers) return;
  acceptingAnswers = false;

  const selectedChoice = e.target;
  const selectedAnswer = selectedChoice.dataset.number; // dot notation

  const isCorrect = Number(selectedAnswer) === Number(currentQuestion.answer);
  const classToApply = isCorrect ? "correct" : "incorrect";

  // Visual feedback on selected container
  selectedChoice.parentElement.classList.add(classToApply);

  if (isCorrect) {
    incrementScore(CORRECT_BONUS);
  } else {
    // Also highlight the correct one
    const correctChoice = choices.find(
      (c) => Number(c.dataset.number) === Number(currentQuestion.answer) // dot notation
    );
    if (correctChoice) {
      correctChoice.parentElement.classList.add("correct");
    }
  }

  // Prevent rapid clicks during feedback
  disableChoices(true);

  setTimeout(() => {
    selectedChoice.parentElement.classList.remove(classToApply);
    choices.forEach((c) => c.parentElement.classList.remove("correct"));
    disableChoices(false);
    getNewQuestion();
  }, 1000);
}

function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
}

/* Utils */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // Use Math.floor instead of bitwise OR for clarity
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function disableChoices(disabled) {
  choices.forEach((c) => {
    c.style.pointerEvents = disabled ? "none" : "auto";
  });
}

function finishQuiz() {
  // Save score
  localStorage.setItem("mostRecentScore", score);

  // Show congrats overlay
  const congrats = document.getElementById("congrats");
  const finalScoreEl = document.getElementById("finalScore");
  if (congrats && finalScoreEl) {
    finalScoreEl.textContent = score;
    congrats.style.display = "flex";
  }

  // Confetti burst
  const confettiCanvas = document.getElementById("confetti");
  if (confettiCanvas) {
    const ctx = confettiCanvas.getContext("2d");
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    for (let i = 0; i < 150; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * confettiCanvas.width,
        Math.random() * confettiCanvas.height,
        4,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  // After 4s, go to end page
  setTimeout(() => {
    window.location.assign("end.html");
  }, 4000);
}

startGame();

