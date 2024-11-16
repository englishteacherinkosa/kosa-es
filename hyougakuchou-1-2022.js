const questions = [
  {
    audio: '1-2-vegetables.m4a',
    images: {
      1: "1-1-seafood.PNG",
      2: "1-2-vegetables.PNG",
      3: "1-3-fruits.PNG"
    },
    correctAnswer: "2"
  },
  {
    audio: '2-1-hospital.m4a',
    images: {
      1: "2-1-hospital.PNG",
      2: "2-2-school.PNG",
      3: "2-3-station.PNG"
    },
    correctAnswer: "1"
  },
  {
    audio: '3-3-Saturday.m4a',
    images: {
      1: "3-1-Thursday.PNG",
      2: "3-2-Friday.PNG",
      3: "3-3-Saturday.PNG"
    },
    correctAnswer: "3"
  },
  {
    audio: '4-3-August.m4a',
    images: {
      1: "4-1-July.PNG",
      2: "4-2-July.PNG",
      3: "4-3-August.PNG"
    },
    correctAnswer: "3"
  },
  {
    audio: '5-2-How many do you want.mp3',
    images: {
      1: "5-1-How_much.PNG",
      2: "5-2-How_many.PNG",
      3: "5-3-What_time.PNG"
    },
    correctAnswer: "2"
  }
]

function togglePlay(num) {
  var audio = document.getElementsByTagName("audio")[num];
  audio.play();
}

const submitButton = document.getElementById('submit-button');
const questionBoxContainer = document.getElementById('question-box-container');

function buildTest() {

  const questionBox = [];

  questions.forEach(
    (currentQuestion, questionNumber) => {
      
      const choices = [];
      for(number in currentQuestion.images) {
        choices.push(
          `<div class="choice">
            <label>
              <img class="choice-image" src="images/${currentQuestion.images[number]}"/>
              <input class="choice-button" type="radio" name="question-${questionNumber}" value="${number}"/>
            </label>
          </div>`
        )
      }

      questionBox.push(
        `<div class="question-box">
          <div class="question-number-audio-and-mark-box">
            <div class="question-number">
              （${questionNumber+1}）
            </div>
            <img class="audio-icon" onclick="togglePlay(${questionNumber})" src="images/speaker-icon.svg">
            <audio>
              <source src="audio/${currentQuestion.audio}"/>
            </audio>
            <div class="check-mark-box"></div>
          </div>
          <div id="choices-box">${choices.join('')}</div>
        </div>`
      )
    }
  )
  questionBoxContainer.innerHTML = questionBox.join('');
}

buildTest();

function checkAnswers() {

  const choicesBoxContainer = questionBoxContainer.querySelectorAll('#choices-box')
  const resultsContainer = document.getElementById('results-container');

  let correctAnswers = 0;

  questions.forEach(
    (currentQuestion, questionNumber) => {

      const choicesBox = choicesBoxContainer[questionNumber];
      const selector = `input[name="question-${questionNumber}"]:checked`;
      const studentAnswer = (choicesBox.querySelector(selector) || {}).value;
      const checkMarkBox = document.querySelectorAll('.check-mark-box');
      const questionBox = document.querySelectorAll('.question-box');

      if(studentAnswer === currentQuestion.correctAnswer) {
        correctAnswers++;
        checkMarkBox[questionNumber].innerHTML = `<img class="check-mark-icon" src="images/correct-icon.png">`
        questionBox[questionNumber].style.background = 'lightblue';
      } else {
        checkMarkBox[questionNumber].innerHTML = `<img class="check-mark-icon" src="images/incorrect-icon.png">`
        questionBox[questionNumber].style.background = 'lightpink';
      }
    }
  )
  resultsContainer.innerHTML = `点数：${correctAnswers}／${questions.length}`;
}

submitButton.addEventListener('click', checkAnswers);