const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById('score');
const progressBarfull =  document.getElementById("progressBarfull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
  }, 500);
});


let questions = [
    // Movies & TV
    {
        question: "A boy wizard attends a school for magic.",
        choice1: "The Lord of the Rings",
        choice2: "Harry Potter",
        choice3: "Percy Jackson",
        choice4: "The Chronicles of Narnia",
        answer: 2
    },
    {
        question: "In Friends, what is the name of Ross’s second wife?",
        choice1: "Emily",
        choice2: "Rachel",
        choice3: "Susan",
        choice4: "Janice",
        answer: 1
    },

    // Science & Nature
    {
        question: "True or False: Bananas grow on trees.",
        choice1: "True",
        choice2: "False",
        choice3: "Only in the tropics",
        choice4: "Depends on the variety",
        answer: 2
    },
    {
        question: "What planet is known as the Ringed Planet?",
        choice1: "Venus",
        choice2: "Mars",
        choice3: "Jupiter",
        choice4: "Saturn",
        answer: 4
    },

    // Music
    {
        question: "Which band is known as the 'Fab Four'?",
        choice1: "The Beatles",
        choice2: "The Rolling Stones",
        choice3: "Queen",
        choice4: "The Who",
        answer: 1
    },
    {
        question: "Who is the 'King of Pop'?",
        choice1: "Prince",
        choice2: "Elvis Presley",
        choice3: "Michael Jackson",
        choice4: "Freddie Mercury",
        answer: 3
    },

    // Geography
    {
        question: "What is the capital of Angola?",
        choice1: "Huila",
        choice2: "Benguela",
        choice3: "Luanda",
        choice4: "Huambo",
        answer: 3
    },
    {
        question: "Which country has the most islands in the world?",
        choice1: "Norway",
        choice2: "Sweden",
        choice3: "Indonesia",
        choice4: "Canada",
        answer: 2
    },

    // History
    {
        question: "Which came first?",
        choice1: "Instagram",
        choice2: "Snapchat",
        choice3: "Twitter",
        choice4: "TikTok",
        answer: 1
    },
    {
        question: "Who was the first woman to win a Nobel Prize?",
        choice1: "Marie Curie",
        choice2: "Rosalind Franklin",
        choice3: "Ada Lovelace",
        choice4: "Mother Teresa",
        answer: 1
    },

];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Update the progress bar
    progressBarfull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true; 
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        } else {
            // Highlight the correct answer
            const correctChoice = choices.find(choice => 
                choice.dataset["number"] == currentQuestion.answer
            );
            correctChoice.parentElement.classList.add("correct");
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            choices.forEach(choice => choice.parentElement.classList.remove("correct"));
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();

