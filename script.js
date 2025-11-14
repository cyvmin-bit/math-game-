// DOM elements
const levelSelect = document.getElementById("level");
const timeDisplay = document.getElementById("time");
const questionDisplay = document.getElementById("question");
const answerInput = document.getElementById("answer");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart");

let score = 0;
let time = 10;
let correctAnswer = 0;
let timer;

// Start the game immediately
startGame();

// Generate random number based on level
function getNumber(level) {
    if (level === "easy") return Math.floor(Math.random() * 10) + 1;
    if (level === "medium") return Math.floor(Math.random() * 50) + 1;
    if (level === "hard") return Math.floor(Math.random() * 100) + 1;
}

// Generate new question
function newQuestion() {
    const level = levelSelect.value;
    const num1 = getNumber(level);
    const num2 = getNumber(level);

    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    questionDisplay.textContent = ${num1} ${operator} = ?;

    // Calculate correct answer
    if (operator === "+") correctAnswer = num1 + num2;
    if (operator === "-") correctAnswer = num1 - num2;
    if (operator === "*") correctAnswer = num1 * num2;
}

// Start timer
function startTimer() {
    time = 10;
    timeDisplay.textContent = time;

    timer = setInterval(() => {
        time--;
        timeDisplay.textContent = time;

        if (time <= 0) {
            clearInterval(timer);
            alert("Time’s up!");
            startGame();
        }
    }, 1000);
}

// Start or restart the game
function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    answerInput.value = "";
    answerInput.focus();

    newQuestion();
    clearInterval(timer);
    startTimer();
}

// Check answer on Enter key
answerInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const userAnswer = Number(answerInput.value);

        if (userAnswer === correctAnswer) {
            score++;
            scoreDisplay.textContent = score;
        }

        answerInput.value = "";
        newQuestion();
    }
});

// Restart button
restartBtn.addEventListener("click", startGame);
