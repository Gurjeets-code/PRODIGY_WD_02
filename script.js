const board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const gameBoard = document.getElementById("game-board");
const statusText = document.getElementById("status");

// Create the board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", () => handleMove(i));
  gameBoard.appendChild(cell);
}

function handleMove(index) {
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  gameBoard.children[index].textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell)) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function restartGame() {
  board.fill(null);
  currentPlayer = "X";
  gameActive = true;
  for (const cell of gameBoard.children) {
    cell.textContent = "";
  }
  statusText.textContent = `${currentPlayer}'s turn`;
}
