let currentPlayer = 'X';
let players = {};
let gameActive = true;
let board = Array(9).fill(null);

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.getElementById('submit').addEventListener('click', () => {
  const p1 = document.getElementById('player-1').value.trim();
  const p2 = document.getElementById('player-2').value.trim();
  if (p1 && p2) {
    players = { X: p1, O: p2 };
    document.getElementById('playerInput').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    setMessage(`${players.X}, you're up`);
  }
});

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.id) - 1;
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
      setMessage(`${players[currentPlayer]}, congratulations you won!`);
      highlightWinningCells();
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setMessage(`${players[currentPlayer]}, you're up`);
    }
  });
});

function setMessage(msg) {
  document.querySelector('.message').textContent = msg;
}

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function highlightWinningCells() {
  winPatterns.forEach(pattern => {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.getElementById(`${a + 1}`).classList.add('winning-cell');
      document.getElementById(`${b + 1}`).classList.add('winning-cell');
      document.getElementById(`${c + 1}`).classList.add('winning-cell');
    }
  });
}
