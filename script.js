let num1, num2, operator, correctAnswer;
let score = 0;
let timeLeft = 30;
let timerInterval;

const answerInput = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const restartBtn = document.getElementById("restart");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const questionDisplay = document.getElementById("question");

function generateNumber(level) {
    if (level === "easy") return Math.floor(Math.random() * 10) + 1;
    if (level === "medium") return Math.floor(Math.random() * 25) + 1;
    return Math.floor(Math.random() * 50) + 1;
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    timeDisplay.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            feedback.textContent = `⏳ Time's up! Correct answer: ${correctAnswer}`;
            generateQuestion();
        }
    }, 1000);
}

function generateQuestion() {
    const level = document.getElementById("level").value;

    num1 = generateNumber(level);
    num2 = generateNumber(level);

    const operators = ["+", "-", "×"];
    operator = operators[Math.floor(Math.random() * operators.length)];

    if (operator === "+") correctAnswer = num1 + num2;
    if (operator === "-") correctAnswer = num1 - num2;
    if (operator === "×") correctAnswer = num1 * num2;

    questionDisplay.textContent = `${num1} ${operator} ${num2} = ?`;
    answerInput.value = "";
    feedback.textContent = "";
    startTimer();
}

function checkAnswer() {
    const userAns = Number(answerInput.value);

    if (userAns === correctAnswer) {
        feedback.textContent = "✅ Correct!";
        score++;
        correctSound.play();
    } else {
        feedback.textContent = `❌ Wrong! Correct answer: ${correctAnswer}`;
        wrongSound.play();
    }

    scoreDisplay.textContent = score;
    generateQuestion();
}

// Enter key submits answer
answerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// Restart button
restartBtn.addEventListener("click", function() {
    clearInterval(timerInterval);
    score = 0;
    scoreDisplay.textContent = score;
    generateQuestion();
});

// Initialize first question
generateQuestion();
