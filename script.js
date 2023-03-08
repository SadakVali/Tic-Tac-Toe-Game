const restartGame = document.querySelector(".restart-game");
const allBoxes = document.querySelectorAll(".box");
const winNums = document.querySelectorAll(".num-of-wins");
const playerX = document.querySelector(".player-x");
const numOfWinsX = document.querySelector(".num-of-wins-x");
const numOfWinsO = document.querySelector(".num-of-wins-o");
const playerO = document.querySelector(".player-o");
const customStatus = document.querySelector(".current-status");

let numOfClicks = 0;
let currentPlayer = "";
let gameStarted = false;
let gameWon = false;
let gameGrid = ["","","","","","","","",""];
const winCases = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const initializeGame = (nextLevel=false) => {
    gameStarted = false;
    numOfClicks = 0;
    gameWon = false;
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    allBoxes.forEach((box, index) => {
        box.textContent = "";
        box.classList = `box box${index+1}`;
        box.style.pointerEvents = "all";
    });
    winNums.forEach((box) => box.textContent = 0);
    if (nextLevel)
        customStatus.textContent = `player ${currentPlayer} turn`;
    else {
        customStatus.textContent = "Choose the player";
        playerX.classList = "player-x";
        playerO.classList = "player-o";
        currentPlayer = "";
    }
}; 

restartGame.addEventListener("click", () => {
    numOfWinsX.textContent = 0;
    numOfWinsO.textContent = 0;
    initializeGame();
});

playerX.addEventListener("click", () => {
    if ((!gameStarted) && (!gameWon)) {
        playerX.classList.add("active");
        playerO.classList.remove("active");
        currentPlayer = "X";
        customStatus.textContent = `player X turn`;
    }
});

playerO.addEventListener("click", () => {
    if ((!gameStarted) && (!gameWon)) {
        playerO.classList.add("active");
        playerX.classList.remove("active");
        currentPlayer = "O";
        customStatus.textContent = `player O turn`;
    }
});

const swapCurrentPlayer = () => {
    if (currentPlayer === "X") {
        currentPlayer = "O";
        playerO.classList.add("active");
        playerX.classList.remove("active");
    }
    else {
        currentPlayer = "X";
        playerX.classList.add("active");
        playerO.classList.remove("active");
    }
    customStatus.textContent = `player ${currentPlayer} turn`;
};

const handleWinCase = () => {
    winCases.forEach((casse) => {
        if (((gameGrid[casse[0]] === "X") && (gameGrid[casse[1]] === "X") && (gameGrid[casse[2]] === "X")) ||
            (gameGrid[casse[0]] === "O") && (gameGrid[casse[1]] === "O") && (gameGrid[casse[2]] === "O")) {
            swapCurrentPlayer();
            gameWon = true;
            allBoxes[casse[0]].classList.add("make-bgc-green");
            allBoxes[casse[1]].classList.add("make-bgc-green");
            allBoxes[casse[2]].classList.add("make-bgc-green");
            allBoxes.forEach((box) => box.style.pointerEvents = "none");
            customStatus.textContent = `player ${currentPlayer} won`;
            if (currentPlayer === "X") 
                numOfWinsX.textContent = parseInt(numOfWinsX.textContent) + 1;
            else 
                numOfWinsO.textContent = parseInt(numOfWinsO.textContent) + 1;
            setTimeout(() => {
                customStatus.textContent = "New Game Starting...";
            }, 1000);
            setTimeout(() => {
                initializeGame(true);
            }, 2000)
        }
    });
    if (numOfClicks === 9) {
        customStatus.textContent = `Match Draw`;
        console.log("Entered... Sadak")
        setTimeout(() => {
            initializeGame(true);
        }, 2000)
    }
};

const handleClick = (index) => {
    if (currentPlayer !== "") {
        numOfClicks += 1; 
        console.log(numOfClicks);
        gameStarted = true;
        allBoxes[index].textContent = currentPlayer;
        allBoxes[index].style.pointerEvents = "none";
        gameGrid[index] = currentPlayer;
        swapCurrentPlayer();
        handleWinCase();
    }
};

allBoxes.forEach((box, index) => {
    box.addEventListener("click", () => {handleClick(index);});
})


