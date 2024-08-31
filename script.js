let n1;
let n2;
let opSelector;
let ansOpt;
let answer;
let qNo = document.getElementById("Qno");
let score = document.getElementById("score");
let question = document.getElementById("question");
let buttons = document.querySelectorAll(".answer-card button");
let startBox = document.getElementById("tutorial-section");
let gameBox = document.getElementById("in-game");
let endBox = document.getElementById("end-game");
let progress = document.getElementById("progress");
let message = document.getElementById("message");
let operator = ['+', '-', '*', '/'];
let t;

function startTutorial() {
    document.getElementById("tutorial-section").style.display = "none";
    document.getElementById("difficulty-selection").style.display = "block";
}

function reloadPage() {
    location.reload(); // Reloads the current page


    
}




function showCustomOptions() {
    document.getElementById("difficulty-selection").style.display = "none";
    document.getElementById("custom-options").style.display = "block";
}

function startGame(difficulty) {
    console.log("Difficulty selected:", difficulty); // Debug line

    switch(difficulty) {
        case 'easy':
            intensity = 1;
            timerSpeed = 60;
            break;
        case 'medium':
            intensity = 2;
            timerSpeed = 30;
            break;
        case 'hard':
            intensity = 3;
            timerSpeed = 5;
            break;
        case 'custom':
            intensity = parseInt(document.getElementById("intensity").value, 10);
            timerSpeed = parseInt(document.getElementById("timer-speed").value, 10);
            break;
    }

    resetGame();
    initGame();
    document.getElementById("custom-options").style.display = "none";
    document.getElementById("in-game").style.display = "block";
}

function resetGame() {
    // Reset game state
    console.log("Resetting game...");
    qNo.innerHTML = "0"; // Start question number from 1
    score.innerHTML = "0";
    progress.style.width = "100%";
    clearInterval(t); // Stop any existing timers
    buttons.forEach(button => {
        button.style.color = "#000";
        button.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        button.removeEventListener('click', handleAnswerClick); // Remove previous event listeners
    });
}

function initGame() {
    let currentQNo = parseInt(qNo.innerHTML, 10);
    console.log("Current QNo:", currentQNo);
    qNo.innerHTML = currentQNo + 1;
    console.log("Updated QNo:", qNo.innerHTML);
    
    nextQuestion();
    console.log("Next question triggered...");
    gameBox.style.display = "block";
    endBox.style.display = "none";
}

function whenFinished() {
    gameBox.style.display = "none";
    endBox.style.display = "flex";
    lastMessage();
}

function nextQuestion() {
    console.log("Progress bar width before update:", progress.style.width);
    progress.style.width = "100%"; // Reset progress bar width
    timed(); // Start the timer for the new question

    document.getElementById("final-score").innerHTML = score.innerHTML;

    if (parseInt(qNo.innerText, 10) > 10) {
        whenFinished();
        return;
    }

    let a = Math.floor(Math.random() * intensity * 10) + 1;
    let d = Math.floor(Math.random() * intensity * 5) + 1;
    let harmonicSequence = [];
    for (let i = 0; i < 5; i++) {
        let term = a + i * d;
        harmonicSequence.push(`1/${term}`);
    }

    question.innerHTML = harmonicSequence.slice(0, -1).join(", ") + ", ... ?";
    answer = harmonicSequence[harmonicSequence.length - 1];
    getOptions();
}


function getOptions() {
    ansOpt = Math.floor(Math.random() * 4); // Randomly choose the correct answer position

    buttons.forEach((button, index) => {
        button.removeEventListener('click', handleAnswerClick); // Remove any previous event listeners
        button.addEventListener('click', handleAnswerClick.bind(null, index)); // Add new event listener
        if (index !== ansOpt) {
            let randomOffset = Math.floor(Math.random() * 5) + 1; // Add a random offset to create other options
            let wrongAnswer = answer.replace(/\d+$/, (match) => parseInt(match) + randomOffset);
            button.innerHTML = wrongAnswer;
        } else {
            button.innerHTML = answer;
        }
    });
}


function getScore() {
    score.innerHTML = parseInt(score.innerHTML, 10) + (1000 / 10); // Adjusted to increment by 100 per question
}



function handleAnswerClick(index) {
    // Move nextQuestion call here
    nextQuestion();
  
    let currentQNo = parseInt(qNo.innerHTML, 10);
    console.log("Current QNo:", currentQNo);
    qNo.innerHTML = currentQNo + 1;
    console.log("Updated QNo:", qNo.innerHTML);
    if (buttons[index].innerHTML === answer) {
        doWhenCorrect(index);
    } else {
        doWhenIncorrect(index);
    }
    outro(index);
}

function doWhenCorrect(i) {
    buttons[i].style.color = "#fff";
    buttons[i].style.backgroundColor = "green";
    getScore();
}

function doWhenIncorrect(i) {
    buttons[i].style.color = "#fff";
    buttons[i].style.backgroundColor = "#fb3640";
    
}

function outro(i) {
    setTimeout(() => {
        nextQuestion();
        buttons[i].style.color = "#000";
        buttons[i].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }, 0);
}

function lastMessage() {
    clearInterval(t);
    let emoji;
    if (parseInt(document.getElementById("final-score").innerText, 10) >= 800) {
        emoji = "&#128525;";
        message.innerHTML = "WOW !! UNBELIEVABLE !! " + emoji;
    } else if (parseInt(document.getElementById("final-score").innerText, 10) >= 500) {
        emoji = "&#128531;";
        message.innerHTML = "TOO CLOSE !! " + emoji;
    } else if (parseInt(document.getElementById("final-score").innerText, 10) >= 100) {
        emoji = "&#128549;";
        message.innerHTML = "Better luck next time " + emoji;
    } else {
        emoji = "&#128577;";
        message.innerHTML = "Bad Luck " + emoji;
    }
}

function timed() {
    console.log("Starting timer with speed:", timerSpeed);
    let progressWidth = parseFloat(progress.style.width);
    t = setInterval(() => {
        progressWidth -= 15; // Decrease by a fixed amount per interval
        if (progressWidth <= 0) {
            progressWidth = 0; // Ensure it does not go negative
            clearInterval(t);
            whenFinished();
        }
        progress.style.width = progressWidth + "px";
    }, timerSpeed * 100); // Timer speed in milliseconds
}



document.getElementById("restart-btn").addEventListener('click', () => {
    // Reset game and show tutorial section
    
    document.getElementById("tutorial-section").style.display = "none";
    document.getElementById("difficulty-selection").style.display = "block";
});
