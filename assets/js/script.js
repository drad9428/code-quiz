var currentTime = document.querySelector('#seconds')
var questionContent = document.querySelector('#questions')
var heading = document.querySelector('.heading')
var buttonWrapper = document.querySelector('#button-wrapper')
var ulCreate = document.createElement('ul')
var startBtn = document.querySelector('#start-quiz')
var seconds = document.querySelector('#seconds')
var timeHeading = document.querySelector('#time')
var timeLeft = 80
var timeInterval = 0
var penalty = 10
var points = 5
var score = 0
var questionIndex = 0
var questions = [
    {
        question: 'Which is not a primitive data type:',
        options: [
            'String',
            'Boolean',
            'Integer',
            'Alert'
        ],
        answer: 'Alert'
    },
    {
        question: 'In what tags do you write/link javascript',
        options: [
            '<script>',
            '<h2>',
            '<link>',
            '<img>'
        ],
        answer: '<script>'
    },
    {
        question: 'What is the correct syntax to link a js file',
        options: [
            '<script name="">',
            '<script href="">',
            '<script src="">',
            '<script class="">'
        ],
        answer: '<script src="">'
    },
    {
        question: 'Proper syntax for alert',
        options: [
            'alert()',
            'alertText()',
            'alertValue()',
            'alertPrompt()'
        ],
        answer: 'alert()'
    },
    {
        question: 'How to create a variable',
        options: [
            'var',
            'let',
            'const',
            'All of the above'
        ],
        answer: 'All of the above'
    },
]

startBtn.addEventListener('click', () => {
    if(timeInterval === 0){
        timeInterval = setInterval(() => {
            timeLeft--
            seconds.textContent = timeLeft
            if(timeLeft <= 0){
                clearInterval(timeInterval)
                quizCompleted()
                timeHeading.textContent = ''
                seconds.textContent = 'Game over'
            }
        }, 1000)
    }
    displayQuestion(questionIndex)
})

function displayQuestion(question){
    questionContent.innerHTML = ''
    ulCreate.innerHTML = ''
    buttonWrapper.innerHTML = ''

    var renderQuestion = questions[question].question
    var renderOptions = questions[question].options
    questionContent.textContent = renderQuestion

    renderOptions.forEach(item =>{
        var listItem = document.createElement('li')
        listItem.textContent = item
        questionContent.appendChild(ulCreate)
        ulCreate.appendChild(listItem)
        listItem.addEventListener('click', checkAnswer)
    })
}

function checkAnswer(event){
    var element = event.target
    if(element.matches('li')){
        var createDiv = document.createAttribute('div')
        createDiv.setAttribute('id', 'createDiv')
        if(element.textContent == questions[questionIndex].answer){
            score++
            createDiv.textContent = 'Correct'
            timeLeft = timeLeft + points
        }
        else{
            timeLeft = timeLeft - penalty
            createDiv.textContent = 'Incorrect'
        }
        questionIndex++
        if(questionIndex >= questions.length){
            quizCompleted()
            createDiv.textContent = 'Your score: ' + score
        }
        else{
            displayQuestion(questionIndex)
        }
        questionContent.appendChild(createDiv)
    }
}

function createInput() {
    var nameInput = document.createElement('input')
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('id', 'userInitials')
    nameInput.placeholder = 'Enter your initials'
    nameInput.setAttribute('style', 'font-size: 21px; text-align: center; margin: 20px;padding: 20px; width: 80%')
    questionContent.appendChild(nameInput)
}

function createDiv(){
    var newDiv = document.createElement('div')
    newDiv.setAttribute('id', 'highScoreDiv')
    questionContent.appendChild(newDiv)
}

function quizCompleted() {
    heading.innerHTML = ''
    questionContent.innerHTML = ''
    seconds.textContent = timeLeft

    var newH1 = document.createElement('h1')
    newH1.setAttribute('id', 'finalH1')
    newH1.textContent = 'Game over'
    questionContent.appendChild(newH1)

    var pTag = document.createElement('p')
    pTag.setAttribute('id', 'pTag')
    questionContent.appendChild(pTag)

    if(timeLeft >= 0){
        var timeScore = timeLeft
        var newPTag = document.createElement('p')
        clearInterval(timeInterval)
        pTag.textContent = 'Score: ' + timeScore
        questionContent.appendChild(newPTag)
    }
    createInput()

    var scoreSubmit = document.createElement('button')
    scoreSubmit.setAttribute('type', 'submit')
    scoreSubmit.setAttribute('style', 'font-size: 30px; background-color: purple; color: white; padding: 12px; margin: auto; display: block;')
    scoreSubmit.textContent = 'Submit'
    questionContent.appendChild(scoreSubmit)

    scoreSubmit.addEventListener('click', () =>{
        scoreBoard()
    })

    var returnSubmit = document.createElement('button')
    returnSubmit.setAttribute('type', 'submit')
    returnSubmit.setAttribute('style', 'font-size: 30px; background-color: pink; color: white; padding: 10px; margin: auto; display: block')
    returnSubmit.textContent = 'redo'
    questionContent.appendChild(returnSubmit)

    returnSubmit.addEventListener('click', () =>{
        window.location.replace('./index.html')
    })
}

function scoreBoard(){
    var highScores = []
    var userInitialsValue = document.getElementById('userInitials').ariaValueMax
    var savedScore = {
        initials: userInitialsValue,
        score: timeLeft
    }
    highScores.push(savedScore)

    highScores = highScores.concat(JSON.parse(localStorage.getItem('highScores') || '[]'))

    localStorage.setItem('highScores', JSON.stringify(highScores))
    console.log(highScores)

    for(i = 0; i < highScores.length; i++){
        var newDiv = document.createElement('div')
        newDiv.setAttribute('id', 'high-score')
        newDiv.innerHTML = highScores[i].initials + ':' + highScores[i].score
        document.body.appendChild(newDiv)
    }
}
