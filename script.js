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
let timerSpeed = 30; // Default timerSpeed, adjust based on difficulty

function startTutorial() {
    startBox.style.display = "none";
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

function count() {
    let currentQNo = parseInt(qNo.innerHTML, 10);
    qNo.innerHTML = currentQNo + 1;
}

function resetGame() {
    // Reset game state
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
    nextQuestion();
    gameBox.style.display = "block";
    endBox.style.display = "none";
}

function whenFinished() {
    gameBox.style.display = "none";
    endBox.style.display = "flex";
    lastMessage();
}

function nextQuestion() {
    timed();

    document.getElementById("final-score").innerHTML = score.innerHTML;
    if (parseInt(qNo.innerText, 10) > 9) { // Ensure it stops after 10 questions
        whenFinished();
        return;
    }

    let a = Math.floor(Math.random() * intensity * 10) + 1; // Starting value between 1 and 10
    let d = Math.floor(Math.random() * intensity * 5) + 1;  // Common difference between 1 and 5

    let harmonicSequence = [];
    for (let i = 0; i < 5; i++) { // Create a sequence of 5 terms
        let term = a + i * d;
        harmonicSequence.push(`1/${term}`);
    }
    let currentQNo = parseInt(qNo.innerHTML, 10);
    console.log("Current QNo:", currentQNo);
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
    }, 500);
}

function lastMessage() {
    clearInterval(t);
    const finalScore = parseInt(document.getElementById("final-score").innerText, 10);

    if (finalScore >= 800) {
        message.innerHTML = "WOW !! UNBELIEVABLE !! ";
    } else if (finalScore >= 500) {
        message.innerHTML = "TOO CLOSE !! ";
    } else if (finalScore >= 100) {
        message.innerHTML = "Better luck next time ";
    } else {
        message.innerHTML = "Bad Luck ";
    }
}

function timed() {
    const intervalTime = timerSpeed * 10;
    const progressElement = document.querySelector('#progress');
    
    if (!progressElement) {
        console.error("Progress element not found");
        return;
    }

    let width = parseInt(progressElement.style.width, 10);
    if (isNaN(width)) width = 100; // Default width

    t = setInterval(() => {
        width -= 1;
        if (width < 0) width = 0; // Prevent negative width
        progressElement.style.width = width + "%";

        if (width <= 0) {
            clearInterval(t);
            gameBox.style.display = "none";
            endBox.style.display = "flex";

            let emoji;
            const finalScore = parseInt(document.getElementById("final-score").innerText, 10);

            if (finalScore >= 800) {
                emoji = "&#128525;";
                message.innerHTML = "WOW !! UNBELIEVABLE !! " + emoji;
            } else if (finalScore >= 500) {
                emoji = "&#128531;";
                message.innerHTML = "TOO CLOSE !! " + emoji;
            } else if (finalScore >= 100) {
                emoji = "&#128549;";
                message.innerHTML = "Better luck next time " + emoji;
            } else {
                emoji = "&#128577;";
                message.innerHTML = "Bad Luck " + emoji;
            }

            console.log("lastMessage");
        }
    }, intervalTime);
}

document.getElementById("restart-btn").addEventListener('click', () => {
    startBox.style.display = "block";
    endBox.style.display = "none";
});
