var question = document.getElementById("question");
var choices =Array.from (document.getElementsByClassName("choice-text"));
var currentQuestion={};
var score= 0;
var questionCounter= 0;
var availableQuestions= [];
var timerEl = document.querySelector(".timer")
var secondsLeft= 75;

let questions =[    
    {   
        question:"Commonly used data types DO NOT include:",
        choice1:"strings",
        choice2:"booleans",
        choice3:"alerts",
        choice4:"numbers",
        answer: 3
    },
    {   
       question:"The condition in an if/else statement is enclosed within _____.",
        choice1:"quotes",
        choice2:"curly brackets",
        choice3:"parentheses",
        choice4:"square brackets",
        answer:3
    },
    {   question:"Arrays in JavaScript can be used to store______.",
         choice1:"numbers and strings",
         choice2:"other arrays",
         choice3:"boolens",
         choice4:"all of the above",
        answer:4
    },
    {   
        question:"String values must be enclosed within_____when being assigned to variables.",
        choice1:"commas",
        choice2:"curly backets",
        choice3:"quotes",
        choice4:"parentheses",
        answer:3
    }
    
     ];

const CORRECT_BONUS = 1;
const MAX_QUESTIONS =5;

function startQuiz() {
    questionCounter= 0;
    score= 0;
    availableQuestions= [...questions];
console.log(availableQuestions);
getNewQuestion();
};

function getNewQuestion (){ 
    questionCounter++;
       const questionIndex = Math.floor(Math.random() * availableQuestions.length);
       currentQuestion =availableQuestions[questionIndex];
       question.innerText= currentQuestion.question;
       
       choices.forEach(choice => {
           const number = choice.dataset["number"];
           choice.innerText = currentQuestion ["choice" + number];
           
       });
       availableQuestions.splice(questionIndex,1);
       acceptingAnswers= true;
   };
choices.forEach(choice => {
    choice.addEventListener('click', e =>  {
       if(!acceptingAnswers) return;

       acceptingAnswers = false;
       const selectedChoice = e.target;
       const selectedAnswer = selectedChoice.dataset["number"];
       getNewQuestion();
   
});
    
});
    
   startQuiz();

function setTime() {
      var timerInterval = setInterval(function(startQuiz) {
        secondsLeft--;
        timerEl.textContent ="Time:" + secondsLeft ;
    
        if(secondsLeft === 0) {
          clearInterval(timerInterval);
          sendMessage();
        }
    
      }, 1000);
    }function sendMessage() {
      timerEl.textContent = "Time is Up! ";
    }
    setTime();
