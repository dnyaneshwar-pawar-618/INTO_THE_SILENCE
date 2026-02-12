// ========== WORD BANK ==========
const words = [
    "javascript", "developer", "function", "variable", "object",
    "browser", "coding", "design", "keyboard", "performance",
    "frontend", "backend", "react", "node", "database",
    "system", "network", "security", "algorithm", "software",
    "engineer", "typing", "speed", "accuracy", "challenge",
    "random", "dynamic", "project", "application", "structure"
];

// ========== DOM ELEMENTS ==========
const textDisplay = document.getElementById("textDisplay");
const inputField = document.getElementById("inputField");
const timeElement = document.getElementById("time");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const timeButtons = document.querySelectorAll(".time-btn");

let timeLimit = 15;
let timeLeft = timeLimit;
let timer = null;
let isTyping = false;
let totalTyped = 0;
let correctTyped = 0;

// ========== TIME SELECTION ==========
timeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        timeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        timeLimit = parseInt(btn.dataset.time);
        timeLeft = timeLimit;
        timeElement.textContent = timeLimit;
    });
});

// ========== GENERATE RANDOM TEXT ==========
function generateText() {
    textDisplay.innerHTML = "";
    let numberOfWords = timeLimit * 3; // more time = more words

    let randomText = [];
    for (let i = 0; i < numberOfWords; i++) {
        randomText.push(words[Math.floor(Math.random() * words.length)]);
    }

    let finalText = randomText.join(" ");

    finalText.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        textDisplay.appendChild(span);
    });

    textDisplay.querySelector("span").classList.add("active");
}

// ========== START TIMER ==========
function startTest() {
    generateText();
    inputField.disabled = false;
    inputField.value = "";
    inputField.focus();

    isTyping = true;
    totalTyped = 0;
    correctTyped = 0;
    timeLeft = timeLimit
    wpmElement.textContent = 0;
    accuracyElement.textContent = 0;


    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;

        if (timeLeft === 0) {
            endTest();
        }
    }, 1000);
}

// ========== END TEST ==========
function endTest() {
    clearInterval(timer);
    isTyping = false;
    inputField.disabled = true;

    let minutes = timeLimit / 60;
    let wpm = Math.round((correctTyped / 5) / minutes);
    let accuracy = totalTyped === 0 ? 0 : 
        Math.round((correctTyped / totalTyped) * 100);

    wpmElement.textContent = wpm;
    accuracyElement.textContent = accuracy;
}

// ========== INPUT HANDLING ==========
inputField.addEventListener("input", () => {
    if (!isTyping) return;

    const typedText = inputField.value;
    const spans = textDisplay.querySelectorAll("span");

    totalTyped = typedText.length;
    correctTyped = 0;

    spans.forEach((span, index) => {
        const typedChar = typedText[index];

        if (typedChar == null) {
            span.classList.remove("correct", "incorrect");
        } else if (typedChar === span.textContent) {
            span.classList.add("correct");
            span.classList.remove("incorrect");
            correctTyped++;
        } else {
            span.classList.add("incorrect");
            span.classList.remove("correct");
        }
    });

    spans.forEach(span => span.classList.remove("active"));
    if (spans[typedText.length]) {
        spans[typedText.length].classList.add("active");
    }
});

// ========== RESTART ==========
function restartTest() {
    clearInterval(timer);
    timeLeft = timeLimit;
    timeElement.textContent = timeLimit;
    inputField.value = "";
    inputField.disabled = true;
    textDisplay.innerHTML = "";
    wpmElement.textContent = 0;
    accuracyElement.textContent = 0;
}

startBtn.addEventListener("click", startTest);
restartBtn.addEventListener("click", restartTest);
