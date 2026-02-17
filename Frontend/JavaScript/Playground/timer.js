const timeElement = document.getElementById("time");
const timeButtons = document.querySelectorAll(".time-btn");
const startBtn = document.getElementById("startBtn");

let timeLimit = 15
let timeLeft = timeLimit
let timer = null

timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        timeLimit = parseInt(btn.dataset.time);
        timeLeft = timeLimit
        timeElement.textContent = timeLimit
    })
})

function startTimer() {
    timeLeft = timeLimit

    timer = setInterval(() => {
        timeLeft--;
        timeElement.ttimerextContent = timeLeft

        if (timeLeft === 0) {
            clearInterval(timer)
        }
    }, 1000)
}

startBtn.addEventListener('click', startTimer)