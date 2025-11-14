// Game variables
let num1, num2, operator, correctAnswer;
let score = 0;
let timerInterval;
let timeLeft = 30;

// Question limits per level
const levelLimits = { easy: 20, medium: 50, hard: 100 };

// Counters to track how many questions answered per level
let levelCounters = { easy: 0, medium: 0, hard: 0 };

// DOM elements
const answerInput = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const restartBtn = document.getElementById("restart");
const questionDisplay = document.getElementById("question");
const levelSelect = document.getElementById("level");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

// Generate random number based on level
function generateNumber(level) {
    if (level === "easy") return Math.floor(Math.random() * 20) + 1;   // 1–20
    if (level === "medium") return Math.floor(Math.random() * 50) + 1; // 1–50
    return Math.floor(Math.random() * 100) + 1;                        // 1–100
}

// Start 30-second timer
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
            nextQuestion();
        }
    }, 1000);
}

// Generate a new question
function generateQuestion() {
    const level = levelSelect.value;

    // Check if level is completed
    if (levelCounters[level] >= levelLimits[level]) {
        endLevel();
        return;
    }

    num1 = generateNumber(level);
    num2 = generateNumber(level);
    const operators = ["+", "-", "×"];
    operator = operators[Math.floor(Math.random() * operators.length)];

    if (operator === "+") correctAnswer = num1 + num2;
    if (operator === "-") correctAnswer = num1 - num2;
    if (operator === "×") correctAnswer = num1 * num2;

    const questionNumber = levelCounters[level] + 1;
    const totalQuestions = levelLimits[level];

    questionDisplay.textContent = `Question ${questionNumber}/${totalQuestions}: ${num1} ${operator} ${num2} = ?`;
    answerInput.value = "";
    feedback.textContent = "";
    startTimer();
    answerInput.focus();
}

// Check user's answer
function checkAnswer() {
    const userAns = Number(answerInput.value);
    clearInterval(timerInterval);

    if (userAns === correctAnswer) {
        feedback.textContent = "✅ Correct!";
        score++;
        correctSound.play();
    } else {
        feedback.textContent = `❌ Wrong! Correct answer: ${correctAnswer}`;
        wrongSound.play();
    }

    scoreDisplay.textContent = score;

    // Increment counter for this level
    const level = levelSelect.value;
    levelCounters[level]++;

    // Move to next question
    setTimeout(generateQuestion, 1000);
}

// Shortcut for Enter key
answerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// Restart button
restartBtn.addEventListener("click", function() {
    score = 0;
    scoreDisplay.textContent = score;
    answerInput.disabled = false;

    // Reset counters
    levelCounters = { easy: 0, medium: 0, hard: 0 };
    generateQuestion();
});

// End of level
function endLevel() {
    const level = levelSelect.value;
    questionDisplay.textContent = `🏆 Level ${level} Completed!`;
    feedback.textContent = `Final Score: ${score} / ${levelLimits[level]}`;
    answerInput.disabled = true;
    clearInterval(timerInterval);
}

// Initialize first question
generateQuestion();
