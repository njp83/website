const board = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill('');

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

// Check for a winner or draw
function checkWinner() {
  for (let combo of winningCombinations) {
    const [a,b,c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a];
    }
  }
  return gameState.includes('') ? null : 'Draw';
}

// Handle a cell click
function handleClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] !== '') return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    message.textContent = winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`;
    board.forEach(cell => cell.removeEventListener('click', handleClick));
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Add click listeners
board.forEach(cell => cell.addEventListener('click', handleClick));

// Reset button functionality
resetBtn.addEventListener('click', () => {
  gameState = Array(9).fill('');
  currentPlayer = 'X';
  message.textContent = `Player X's turn`;
  board.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick);
  });
});

