let highScore, score, history;
let secretNum;
const resetBtn = document.querySelector('.reset');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const tryAgainBtn = document.querySelector('.try-again');

const guessLabel = document.querySelector('.guess');
const scoreLabel = document.querySelector('.score');
const highScoreLabel = document.querySelector('.high-score');
const historyList = document.querySelector('.history-list');
const hintLabel = document.querySelector('.hint');
const scoreBlock = document.querySelector('.score-block');
const mainPanel = document.querySelector('.main');

const finalScore = document.querySelector('.your-score');
const finalBestScore = document.querySelector('.best-score');
const secretNumber = document.querySelector('.secret-num');
const secretNumberLose = document.querySelector('.secret-num-lose');

const image = document.querySelector('.image');

function startGame() {
    highScore = 0;
    resetGame();
}

function resetGame() {
    score = 10;
    history = [];
    secretNum = Math.trunc(Math.random() * 100 + 1);
    scoreLabel.innerText = 'Score: ' + secretNum;
    if (highScore !== 0) // Need to win at least one time
        highScoreLabel.innerText = 'High Score: ' + highScore;
    historyList.innerText = '';
    guessLabel.value = '';
    hintLabel.innerText = 'Guess a Number';
}

function againGame() {
    mainPanel.classList.remove('win');
    mainPanel.classList.remove('lose');
    scoreBlock.style.display = 'block';
    resetBtn.style.display = 'block';
    image.src = 'img/confused.png';
    resetGame();
}

function gameWin() {
    scoreBlock.style.display = 'none';
    resetBtn.style.display = 'none';
    mainPanel.classList.add('win');
    highScore = Math.max(highScore, score);
    secretNumber.innerText = secretNum;
    finalScore.innerText = 'Your score: ' + score;
    finalBestScore.innerHTML = 'Best score: ' + highScore;
    image.src = 'img/win.png';
}

function gameLose() {
    resetBtn.style.display = 'none';
    mainPanel.classList.add('lose');
    secretNumberLose.innerText = secretNum;
    image.src = 'img/game-over.png';
}

function guessNum() {
    let num = guessLabel.value;
    if (num == '') {
        hintLabel.innerText = 'Please enter number between 1 and 100';
        return;
    }

    num = +num; // Make a number from string

    if (!Number.isInteger(num) || num < 1 || num > 100) {
        hintLabel.innerText = 'You can only enter numbers between 1 and 100';
        return;
    }

    if (history.includes(num)) {
        hintLabel.innerText = 'You already tried to guess this number';
        if (num > secretNum)
            hintLabel.innerText += '(too high)';
        else if (num < secretNum)
            hintLabel.innerText += '(too low)';
        return;
    }


    addHistory(num);

    if (num === secretNum) { // If win
        gameWin();
        return;
    }

    score--;

    if (score === 0) { // If lose
        gameLose();
        return;
    }

    if (num > secretNum) {
        hintLabel.innerText = 'Your number is too high';
    }

    if (num < secretNum) {
        hintLabel.innerText = 'Your number is too low';
    }

    scoreLabel.innerHTML = 'Score: ' + score;
}

function addHistory(historyNum) {
    history.push(historyNum);
    const historyItem = document.createElement('li');
    historyItem.classList.add('history-item');
    historyItem.innerText = historyNum;
    historyList.append(historyItem);
}

document.addEventListener('DOMContentLoaded', startGame); // Start game after page loaded
resetBtn.addEventListener('click', resetGame);
checkBtn.addEventListener('click', guessNum);
againBtn.addEventListener('click', againGame);
tryAgainBtn.addEventListener('click', againGame);