let questions = [];
let result = 0;
let currentIndex = 0;
let modal = document.getElementById('result-modal');
let closeButton = document.getElementById('close');
closeButton.addEventListener('click', closeModal)


function getQuestions () {
    fetch('questions.json')
    //Get response (Promise)
    .then(response => {
       return response.json()})
    .then(data => {
        questions = data
        renderQuestionById(currentIndex)
    }).catch(error => console.error('Error loading data:', error))


}

function renderQuestionById (index) {
    if (index < questions.length) {
        const currentQuestion = questions[index]
        document.querySelector('.question-title').textContent = currentQuestion.question

        const amount = document.getElementById('amount');
        amount.textContent = `${index + 1}/${questions.length}`

        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';
        currentQuestion.possibleAnswers.forEach(answer => {
            const answerDiv = document.createElement('div');
            answerDiv.textContent = answer;
            answerDiv.classList.add('option-div');
            answerDiv.addEventListener('click', () => checkAnswer(answer, currentQuestion.correctAnswer));
            optionsContainer.appendChild(answerDiv);
        });

    }
}

function checkAnswer(answer, realAnswer) {
    if (answer === realAnswer) {
        result++;
        currentIndex++;
    } else {
        currentIndex++;
    }
    if (currentIndex < questions.length) {
        renderQuestionById(currentIndex);
    } else {
        showResult(result);
    }
}


function showResult (result) {
    modal.style.display = "block";
    let modalData = document.getElementById('modal-data');
    if (result === questions.length) {
        modalData.innerHTML = `Good job yor result is ${result}/${questions.length}`;
    } else {
        modalData.innerHTML = `Nice try your result is ${result}/${questions.length} try again`;
    }
}

function closeModal () {
    modal.style.display = "none";
    location.reload();
}
getQuestions();