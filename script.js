let currentPlayer = "x";
let players = { x: "", o: "" };

document.getElementById("submit").addEventListener("click", () => {
  const player1 = document.getElementById("player1").value.trim();
  const player2 = document.getElementById("player2").value.trim();

  if (!player1 || !player2) return;

  players.x = player1;
  players.o = player2;

  document.getElementById("gameBoard").style.display = "grid";
  document.querySelector(".message").textContent = `${player1}, you're up`;
});

const winPatterns = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7]             // diagonals
];

const boardState = {};

document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.textContent || !players.x || !players.o) return;

    cell.textContent = currentPlayer;
    boardState[cell.id] = currentPlayer;

    if (checkWin(currentPlayer)) {
      document.querySelector(".message").textContent = `${players[currentPlayer]} congratulations you won!`;
      return;
    }

    currentPlayer = currentPlayer === "x" ? "o" : "x";
    document.querySelector(".message").textContent = `${players[currentPlayer]}, you're up`;
  });
});

function checkWin(player) {
  return winPatterns.some(pattern =>
    pattern.every(cellId => boardState[cellId] === player)
  );
}
