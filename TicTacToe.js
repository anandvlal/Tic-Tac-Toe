const board = document.getElementById("board");
const statusDisplay = document.getElementById("status");
const restartBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameState = Array(9).fill("");

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.getAttribute("data-index"));
  show("reset");

  if (gameState[index] || checkWinner()) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
  } else if (!gameState.includes("")) {
    statusDisplay.textContent = "It's a Draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}
function hide(Id){
	document.getElementById(Id).style.display="none";
}
function show(Id){
	document.getElementById(Id).style.display="block";
}

function restartGame() {
  gameState.fill("");
  currentPlayer = "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
  renderBoard();
  hide("reset");
}

function renderBoard() {
  board.innerHTML = "";
  gameState.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", index);
    cell.textContent = value;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
    
  });
}

restartBtn.addEventListener("click", restartGame);

// Start game
restartGame();