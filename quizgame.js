const startScreen = document.getElementById('start-screen')
const startBtn = document.getElementById('start-btn')
const quizScreen = document.getElementById('quiz-screen')
const quizHeader = document.getElementById('quiz-header')
const quizInfo = document.getElementById('quiz-info')
const currentQues = document.getElementById('current-ques')
const currentScore = document.getElementById('score')
const answerCont = document.getElementById('answer-container')
const answerBtn = document.getElementById('answer-btn')
const progressBar = document.getElementById('progress-bar')
const resultScreen = document.getElementById('result-screen')
const resultScore = document.getElementById('result-score')
const yourScore = document.getElementById('your-score')
const totalScore = document.getElementById('total-score')
const totalQues = document.getElementById('total-ques')
const resultMsg = document.getElementById('result-message')
const restartBtn = document.getElementById('restart-btn')

const quizQues = [
    {
        question : "In which film does Aamir Khan play an alien who lands on Earth and befriends a journalist?",
        answers : [
            {text: 'Taare Zameen Par', correct: false},
            {text: 'P.K.', correct: true},
            {text: 'Dhoom 3', correct: false},
            {text: 'Lagaan', correct: false}
        ]
    },
    {
        question : "Who played the role of “Mogambo” in the movie “Mr. India”?",
        answers : [
            {text: 'Amrish Puri', correct: true},
            {text: 'Om Puri', correct: false},
            {text: 'Paresh Rawal', correct: false},
            {text: 'Anil Kumar', correct: false}
        ]
    },
    {
        question : "Which movie features the song “Senorita” and is set in Spain?",
        answers : [
            {text: 'Dhoom 2', correct: false},
            {text: 'War', correct: false},
            {text: 'Zindagi Na Milegi Dobara', correct: true},
            {text: 'Bang Bang', correct: false}
        ]
    },
    {
        question : "Which actress made her Bollywood debut with the film “Dhadak”?",
        answers : [
            {text: 'Sara Ali Khan', correct: false},
            {text: 'Tara Sutaria', correct: false},
            {text: 'Ananya Panday', correct: false},
            {text: 'Janhvi Kapoor', correct: true}
        ]
    },
    {
        question : "Who played the role of Geet and Aditya in movie “Jab We Met”",
        answers : [
            {text: 'Kareena Kapoor, Ranbir Kapoor', correct: false},
            {text: 'Kareena Kapoor, Shahid Kapoor', correct: true},
            {text: 'Katrina Kaif, Shahid Kapoor', correct: false},
            {text: 'Katrina Kaif, Hrithik Roshan', correct: false}
        ]
    }
]

let currentQuesIndex = 0
let score = 0
let answerDisabled = false

totalQues.textContent = quizQues.length
totalScore.textContent = quizQues.length

startBtn.addEventListener('click',startQuiz)
restartBtn.addEventListener('click',restartQuiz)

function startQuiz() {
    currentQuesIndex = 0
    currentScore.textContent = 0
    startScreen.classList.remove('active')
    quizScreen.classList.add('active')

    showQues()
}

function showQues() {
    answerDisabled = false
    const currentQuestion = quizQues[currentQuesIndex]
    currentQues.textContent = currentQuesIndex + 1

    const progressPercent = (currentQuesIndex / quizQues.length) * 100
    progressBar.style.width = progressPercent + '%'

    quizHeader.textContent = currentQuestion.question

    answerCont.innerHTML = ''
    currentQuestion.answers.forEach((answers)=> {
        const button = document.createElement('button')
        button.textContent = answers.text
        button.classList.add('answer-btn')

        button.dataset.correct = answers.correct

        button.addEventListener('click',selectAnswer)
        answerCont.appendChild(button)
    })
}

function selectAnswer(event) {
    if(answerDisabled) return

    answerDisabled = true

    const selectButton = event.target
    const isCorrect = selectButton.dataset.correct === 'true'

    Array.from(answerCont.children).forEach(button=>{
        if (button.dataset.correct === 'true')
            button.classList.add('correct')
        else if (button === selectButton)
            button.classList.add('incorrect')
    })

    if(isCorrect) {
        score++
        currentScore.textContent = score
    }

    setTimeout(() => {
        currentQuesIndex++

        if(currentQuesIndex < quizQues.length)
            showQues()

        else
            showResult()

    }, 1000);

    function showResult() {
        quizScreen.classList.remove('active')
        resultScreen.classList.add('active')

        yourScore.textContent = score

        const percenatge = (score/quizQues.length) * 100

        if (percenatge === 100)
            resultMsg.textContent = 'Perfect! You are Genius...'
        else if (percenatge >= 80)
            resultMsg.textContent = 'Great Job! You know your Stuff...'
        else if (percenatge >= 60)
            resultMsg.textContent = 'Good Effort! Keep Learning...'
        else if (percenatge >= 40)
            resultMsg.textContent = 'Not Bad! Try again to Improve...'
        else
            resultMsg.textContent = 'Keep Learning! It will get better very soon...'
    }
}

function restartQuiz() {
    resultScreen.classList.remove('active')
    score = 0
    startQuiz()
}