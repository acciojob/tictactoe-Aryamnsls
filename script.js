let players = {};
let currentPlayer = 'X';
let gameActive = true;
const board = Array(9).fill(null);

// Winning combinations
const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // columns
  [0,4,8], [2,4,6]            // diagonals
];

// Function to set message
function setMessage(msg) {
  document.querySelector('.message').textContent = msg;
}

// Handle submit
document.getElementById('submit').addEventListener('click', () => {
  const p1 = document.getElementById('player1').value.trim();
  const p2 = document.getElementById('player2').value.trim();
  if (p1 && p2) {
    players = { X: p1, O: p2 };
    document.getElementById('playerInput').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    setMessage(`${players.X}, you're up`);
  }
});

// Handle cell click
document.querySelectorAll('.cell').forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
      setMessage(`${players[currentPlayer]}, congratulations you won!`);
      highlightWinningCells();
      gameActive = false;
      return;
    }

    if (board.every(cell => cell !== null)) {
      setMessage("It's a draw!");
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setMessage(`${players[currentPlayer]}, you're up`);
  });
});

// Check for win
function checkWin() {
  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Highlight winning cells
function highlightWinningCells() {
  winCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.getElementById((a + 1).toString()).classList.add('winning-cell');
      document.getElementById((b + 1).toString()).classList.add('winning-cell');
      document.getElementById((c + 1).toString()).classList.add('winning-cell');
    }
  });
}
