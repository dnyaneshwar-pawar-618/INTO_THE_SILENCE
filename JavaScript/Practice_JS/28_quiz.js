const questions = [
    {
        question : 'Which is the largest animal in the world?',
        answers : [
            {text : 'Shark', correct :false},
            {text : 'Blue Whale', correct :true},
            {text : 'Elephant', correct :false},
            {text : 'Giraffe', correct :false},
        ]
    },
    {
        question : 'Which is the largest animal in the world?',
        answers : [
            {text : 'Shark', correct :false},
            {text : 'Blue Whale', correct :true},
            {text : 'Elephant', correct :false},
            {text : 'Giraffe', correct :false},
        ]
    },
    {
        question : 'Which is the largest animal in the world?',
        answers : [
            {text : 'Shark', correct :false},
            {text : 'Blue Whale', correct :true},
            {text : 'Elephant', correct :false},
            {text : 'Giraffe', correct :false},
        ]
    },
    {
        question : 'Which is the largest animal in the world?',
        answers : [
            {text : 'Shark', correct :false},
            {text : 'Blue Whale', correct :true},
            {text : 'Elephant', correct :false},
            {text : 'Giraffe', correct :false},
        ]
    }
]

let questionElement = document.querySelector('#question');
const answerButton = document.querySelector('#answer-buttons')
const nxtButton = document.querySelector('#next-btn')

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nxtButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });   
}

function resetState() {
    nxtButton.style.diaplay = 'none';
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct == 'true'
    if (isCorrect) {
        score++;
        selectBtn.classList.add('correct');
    } else {
        selectBtn.classList.add('incorrect');
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nxtButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nxtButton.innerHTML = 'Play Again';
    nxtButton.style.diaplay = 'block';
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nxtButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
