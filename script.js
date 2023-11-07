const gameStatus = document.querySelector(".gameStatus");
const gameBoard = document.querySelector(".board");
const gameRestartBtn = document.querySelector(".gameRestart");
let boardValues = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameIsActive = true;
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const putMark = (clickedCell, clickedCellIndex) => {
  boardValues[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
};

const changePlayer = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.innerHTML = `Ходит игрок: ${currentPlayer}`;
};

const checkResult = () => {
  let roundWon = false;
  for (let i = 0; i <= winConditions.length - 1; i++) {
    const winCondition = winConditions[i];
    let a = boardValues[winCondition[0]];
    let b = boardValues[winCondition[1]];
    let c = boardValues[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    gameStatus.innerHTML = `Победил игрок: ${currentPlayer}`;
    gameIsActive = false;
    return;
  }
  let roundDraw = !boardValues.includes("");
  if (roundDraw) {
    gameStatus.innerHTML = "Ничья!";
    gameIsActive = false;
    return;
  }
  changePlayer();
};

const handleBord = (clickedCellEvent) => {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );
  if (boardValues[clickedCellIndex] !== "" || !gameIsActive) {
    return;
  }
  putMark(clickedCell, clickedCellIndex);
  checkResult();
};

const restartGame = () => {
  gameIsActive = true;
  currentPlayer = "X";
  boardValues = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerHTML = `Ходит игрок: ${currentPlayer}`;
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
};

const createBoard = () => {
  gameBoard.innerHTML = "";
  boardValues.forEach((value, index) => {
    gameBoard.innerHTML += `<div data-cell-index="${index}" class="cell">${value}</div>`;
  });
  document
    .querySelectorAll(".cell")
    .forEach((value) => value.addEventListener("click", handleBord));
};

createBoard();
restartGame();
gameRestartBtn.addEventListener("click", restartGame);
