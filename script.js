// Main content 
var questionsEl = document.querySelector(".questions-choices");
var finalScoreEl= document.querySelector(".finalScore");
var currentQuestion={};
var scoreEl= document.querySelector(".highScore");

// timer variables
var secondsLeft= 75;
var timerInterval;
var timerEl = document.querySelector(".timer");

// Buttons 
var submitBtn= document.querySelector("#submit");
var returnBtn= document.querySelector("#goBack");

// User Input
var initialEl = document.querySelector("#initials");
var scoreForm = document.querySelector("#scoreForm");
var listScores = document.querySelector("#listScores");
var userInitials = [];

// hide content
document.querySelector(".finalScore").style.display="none";
document.querySelector(".highPage").style.display="none";

//return button event listener click
returnBtn.addEventListener("click", function () {
    location.reload()
});

// timer function when 0
function setTime() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time Left: " + secondsLeft;
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            document.querySelector(".finalScore").style.display = "block";
            document.querySelector(".timer").style.display = "none";
            document.querySelector(".questions-choices").style.display = "none";
            scoreEl.textContent = "Total score = " + secondsLeft;
        }
    }, 1000);
}

// start button event listener
const startBtn = document.querySelector("#startBtn");

startBtn.addEventListener("click",function () {
    setTime();
    startBtn.style.display="none";
    document.querySelector(".homePage").style.display="none";
    enterQuestions(questionIndex);
} )

var questionIndex = 0;
// enter questions and choices
function enterQuestions(){  

    questionsEl.textContent = "";
    var question = questions[questionIndex];
    var questionDiv = document.createElement("div");
    var questionText = document.createElement("h2");
    questionText.textContent = question.title;
    questionDiv.appendChild(questionText)


    for(var i=0; i < question.Choices.length ;i++) {  
        var option = document.createElement("button");
        option.textContent= question.Choices[i];
        option.setAttribute("class","option");
        option.addEventListener("click",function(e) {
            var optionChosen = (e.target.innerHTML);
// alert user to answer choice
            if(optionChosen === questions[questionIndex].answer){  

                alert("correct!");
                enterQuestions(questionIndex++);
            }
            else{   
                alert("Wrong!");
                enterQuestions(questionIndex++);
                secondsLeft -=15;
            }
                
            
        });

        if (questionIndex == questions.length - 1){ 
            clearInterval(timerInterval);
            document.querySelector(".finalScore").style.display="block";
            document.querySelector(".timer").style.display="none";
            scoreEl.textContent= "Total score = " + secondsLeft;
            return;
        }
        questionDiv.appendChild(option);

    }
    questionsEl.appendChild(questionDiv);

}
// Show the score, allow to clear
function showScores(){  
  listScores.innerHTML = "";

for (var j = 0; j < userInitials.length; j ++){ 
    var characters = userInitials[j];

    var list = document.createElement("li");
    list.textContent = characters;
    list.setAttribute("data-index", j);

    var clearBtn= document.createElement("Button");
    clearBtn.textContent= "Clear";


    list.appendChild(clearBtn);
    listScores.appendChild(list);
}


}
// storage of user information
 function initials() {
     var userScores = JSON.parse(localStorage.getItem("userInitials"));

     if (userScores !==null) {
         userInitials = userScores;
     }
     const submitButton = document.querySelector("#submit");

     submitButton.addEventListener("click", function () {
         event.preventDefault();
         
         var initialChar =initialEl.value.trim();
        
         if (initialChar === "") {
             return;
         }
         userInitials.push(initialChar + " " + secondsLeft);
        //  console.log(userInitials);
         initialEl.value= "";
         
         document.querySelector(".finalScore").style.display="none";
         document.querySelector(".highPage").style.display="block";
         
         
         scoreStorage();
         showScores();

        });
 }
// storage of user information

function scoreStorage() {
    localStorage.setItem("userInitials", JSON.stringify(userInitials));
}

listScores.addEventListener("click",function (event) {
    var element = event.target;

    if (element.matches("button")=== true) {
        var index = element.parentElement.getAttribute("data-index");
        userInitials.splice(index, 1);

        scoreStorage();
        showScores();
        
    }
});
 initials();