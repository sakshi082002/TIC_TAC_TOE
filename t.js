let symbol = "";
let currentPlayer = "";
let gameBoard = [];
let gameOver = false;

function chooseSymbol(selectedSymbol) {
  symbol = selectedSymbol;
  currentPlayer = 'X';
  gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  gameOver = false;
  document.querySelectorAll('.board .cell').forEach(cell => cell.removeEventListener('click', handleClick));
  document.getElementById('board').innerHTML = '';
  createBoard();
  if (symbol === 'O') {
    computerMove();
  }
}

function createBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', handleClick);
      document.getElementById('board').appendChild(cell);
    }
  }
}

function handleClick(event) {
  if (!gameOver) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;
    if (gameBoard[row][col] === '') {
      event.target.textContent = currentPlayer;
      gameBoard[row][col] = currentPlayer;
      if (checkWin(currentPlayer)) {
        gameOver = true;
        if (currentPlayer === symbol) {
          alert('Congratulations! You win!');
        } else {
          alert('You lose!');
        }
      } else if (checkTie()) {
        gameOver = true;
        alert('It\'s a tie!');
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        computerMove();
      }
    }
  }
}

function computerMove() {
  const availableCells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameBoard[i][j] === '') {
        availableCells.push({ row: i, col: j });
      }
    }
  }
  if (availableCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const randomCell = availableCells[randomIndex];
    const row = randomCell.row;
    const col = randomCell.col;
    gameBoard[row][col] = currentPlayer;
    document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`).textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      gameOver = true;
      if (currentPlayer === symbol) {
        alert('Congratulations! You win!');
      } else {
        alert('You lose!');
      }
    } else if (checkTie()) {
      gameOver = true;
      alert('It\'s a tie!');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWin(player) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (gameBoard[i][0] === player && gameBoard[i][1] === player && gameBoard[i][2] === player) {
        return true;
      }
    }
  
    // Check columns
    for (let j = 0; j < 3; j++) {
      if (gameBoard[0][j] === player && gameBoard[1][j] === player && gameBoard[2][j] === player) {
        return true;
      }
    }
  
    // Check diagonals
    if (gameBoard[0][0] === player && gameBoard[1][1] === player && gameBoard[2][2] === player) {
      return true;
    }
    if (gameBoard[0][2] === player && gameBoard[1][1] === player && gameBoard[2][0] === player) {
      return true;
    }
  
    return false;
  }
  
  function checkTie() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard[i][j] === '') {
          return false; // If there's an empty cell, game is not tied
        }
      }
    }
    return true; // If no empty cells left, game is tied
  }
  