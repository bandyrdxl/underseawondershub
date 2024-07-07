const questions = [
  {
      question: "What percentage of carbon dioxide does the ocean absorb?",
    answers: [
      { text: "20%", correct: false },
      { text: "25%", correct: false },
      { text: "30%", correct: true },
      { text: "35%", correct: false }
    ]
  },

  {
      question: "Coral Reefs support __% of ocean life",
    answers: [
      { text: "15", correct: false },
      { text: "25", correct: true },
      { text: "35", correct: false },
      { text: "45", correct: false }
    ]
  },

  {
      question: "Oceans cover __% of the Earth’s surface.",
    answers: [
      { text: "71", correct: true },
      { text: "72", correct: false },
      { text: "73", correct: false },
      { text: "70", correct: false }
    ]
  },

  {
      question: "When is World Wetlands Day celebrated every year?",
    answers: [
      { text: "February 02", correct: true },
      { text: "February 03", correct: false },
      { text: "February 04", correct: false },
      { text: "February 05", correct: false }
    ]
  },
  {
      question: "Over ___ billion people depend on marine and coastal biodiversity for their livelihoods.",
    answers: [
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "4", correct: false },
      { text: "5", correct: false }
    ]
  },
  {
      question: "What share of all plastic waste in the world ends up in the oceans?",
    answers: [
      { text: "Less the 6%", correct: true },
      { text: "Around 36%", correct: false },
      { text: "More than 66%", correct: false },
      { text: "Around 90%", correct: false }
    ]
  },
  {
      question: "What happened to the annual number of oil spills from tankers worldwide since the 1970s?",
    answers: [
      { text: "Decreased tenfold", correct: true },
      { text: "Stayed about the same", correct: false },
      { text: "Increased tenfold", correct: false },
      { text: "None of the above", correct: false }
    ]
  },
  {
      question: "Oil and the gas were the marine sectors that made the most money in 2010. If trends continue as before, which sector will it be in 2030?",
    answers: [
      { text: "Oil and gas", correct: false },
      { text: "Tourism", correct: true },
      { text: "Wave energy", correct: false },
      { text: "None of the above", correct: false }
    ]
  },
  {
      question: "Globally, people eat an average of 6kg of beef and veal a year. How much fish is consumed on average per person?",
    answers: [
      { text: "Around 3kg", correct: false },
      { text: "Around 6kg", correct: false },
      { text: "Around 10kg", correct: true },
      { text: "Around 15kg", correct: false }
    ]
  },
  {
      question: "How many countries have ratified the Law of the Sea, a UN convention introduced in 1982? (There are 195 countries.)",
    answers: [
      { text: "49 countries", correct: false },
      { text: "109 countries", correct: true },
      { text: "149 countries", correct: false },
      { text: "189 countries", correct: false }
    ]
  },
];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click',selectAnswer);
  })
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e){
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct == 'true';
  if (isCorrect){
    selectBtn.classList.add("correct");
    score++;
  }
  else{
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct == "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener("click",() => {
  if (currentQuestionIndex < questions.length){
    handleNextButton();
  }
  else{
    startQuiz();
  }
})

startQuiz();