//Questions to be asked and the options and correct answer
var questions = [{
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["js( )", "javascript( )", "script( )" , "scripting( )"],
    answer: "js( )"

},
{
    title: "Choose the server-side JavaScript object? ",
    choices: ["FileUpLoad( )", "Function( )", "File( )" , "Date( )"],
    answer: "File( )"

},
{
    title: "Which of the following is not considered a JavaScript operator?",
    choices: ["new( )", "this( )", "delete( )" , "typeof( )"],
    answer: "this( )"

},
{
    title: "Choose the client-side JavaScript object?",
    choices: ["Database( )", "Cursor( )", "Client( )" , "FileUpLoad( )"],
    answer: "FileUpLoad( )"
},
{
title: "Is it possible to nest functions in JavaScript?",
choices: ["True( )", "False( )"],
answer: "True( )"
}

]

//Variables for the Score and Time
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//Start button to start timer
function start() {

    timeLeft = 90;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //Go to end function when timer is below 0 
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
    }
}, 1000);
next();

}

//Stop to end game
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>You received a ` + score +  ` /100!</h3>
    <h3>Which means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}


function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function getHighscore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="CloseHighscore()">Close!</button>
    
    `;

    document.getElementById("displayHighscore").innerHTML = quizContent;
}

function CloseHighscore() {
    document.getElementById("displayHighscore").innerHTML = "";
}





//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
    timeLeft -= 15; 
    alert ("Incorrect Response");
    next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
    score += 20;
    alert ("Correct Response");
    next();
}

//loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}




