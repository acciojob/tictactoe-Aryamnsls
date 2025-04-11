document.getElementById('submit').addEventListener('click', () => {
  const p1 = document.getElementById('player1').value.trim();  // updated id
  const p2 = document.getElementById('player2').value.trim();  // updated id
  if (p1 && p2) {
    players = { X: p1, O: p2 };
    document.getElementById('playerInput').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    setMessage(`${players.X}, you're up`);
  }
});
