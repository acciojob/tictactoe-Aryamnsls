document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const player1Input = document.getElementById("player1");
  const player2Input = document.getElementById("player2");
  const submitBtn = document.getElementById("submit");
  const message = document.querySelector(".message");

  let currentPlayer = "x";
  let players = { x: "", o: "" };
  let board = Array(9).fill("");

  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  function checkWin() {
    for (let combo of winConditions) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        message.textContent = `${players[board[a]]} congratulations you won!`;
        cells.forEach(cell => cell.removeEventListener("click", handleClick));
        return true;
      }
    }
    if (!board.includes("")) {
      message.textContent = "It's a tie!";
      return true;
    }
    return false;
  }

  function handleClick(e) {
    const index = +e.target.id - 1;
    if (board[index] !== "") return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (!checkWin()) {
      currentPlayer = currentPlayer === "x" ? "o" : "x";
      message.textContent = `${players[currentPlayer]}, you're up`;
    }
  }

  submitBtn.addEventListener("click", () => {
    const p1 = player1Input.value.trim();
    const p2 = player2Input.value.trim();

    if (!p1 || !p2) {
      message.textContent = "Please enter both player names.";
      return;
    }

    players = { x: p1, o: p2 };
    currentPlayer = "x";
    board = Array(9).fill("");

    cells.forEach(cell => {
      cell.textContent = "";
      cell.addEventListener("click", handleClick);
    });

    message.textContent = `${players[currentPlayer]}, you're up`;
  });
});
