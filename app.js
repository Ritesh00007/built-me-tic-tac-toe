// ===== CONSTANTS =====
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// ===== STATE =====
let boardState = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0, Draw: 0 };

// ===== DOM REFERENCES =====
const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const currentPlayerEl = document.getElementById('current-player');
const xScoreEl = document.getElementById('x-score');
const oScoreEl = document.getElementById('o-score');
const drawScoreEl = document.getElementById('draw-score');
const resetBtn = document.getElementById('reset-btn');
const clearScoreBtn = document.getElementById('clear-score-btn');
const scoreXCard = document.getElementById('score-x');
const scoreOCard = document.getElementById('score-o');

// ===== HELPERS =====

function updateStatus(text, cssClass) {
  statusEl.className = 'status ' + (cssClass || '');
  statusEl.innerHTML = text;
  // Trigger animation
  statusEl.classList.remove('status-animate');
  void statusEl.offsetWidth; // reflow
  statusEl.classList.add('status-animate');
}

function updateScoreboard() {
  xScoreEl.textContent = scores.X;
  oScoreEl.textContent = scores.O;
  drawScoreEl.textContent = scores.Draw;
}

function highlightActivePlayer() {
  scoreXCard.classList.remove('active-x', 'active-o');
  scoreOCard.classList.remove('active-x', 'active-o');

  if (!gameActive) return;

  if (currentPlayer === 'X') {
    scoreXCard.classList.add('active-x');
  } else {
    scoreOCard.classList.add('active-o');
  }
}

function setStatusTurn() {
  const colorClass = currentPlayer === 'X' ? 'x-turn' : 'o-turn';
  const colorSpan = currentPlayer === 'X'
    ? `<span id="current-player" class="x-color">X</span>`
    : `<span id="current-player" class="o-color">O</span>`;
  updateStatus(`Player ${colorSpan}'s turn`, colorClass);
}

// ===== WIN / DRAW DETECTION =====

function checkWin(player) {
  return WINNING_COMBOS.find(combo =>
    combo.every(index => boardState[index] === player)
  );
}

function checkDraw() {
  return boardState.every(cell => cell !== null);
}

// ===== CELL CLICK =====

function handleCellClick(e) {
  const cell = e.currentTarget;
  const index = parseInt(cell.dataset.index, 10);

  if (!gameActive || boardState[index] !== null) return;

  // Place marker
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken', currentPlayer.toLowerCase());

  // Check win
  const winCombo = checkWin(currentPlayer);
  if (winCombo) {
    gameActive = false;
    scores[currentPlayer]++;
    updateScoreboard();
    highlightWinningCells(winCombo);

    const colorClass = currentPlayer === 'X' ? 'winner-x' : 'winner-o';
    const colorSpan = currentPlayer === 'X'
      ? `<span class="x-color">X</span>`
      : `<span class="o-color">O</span>`;
    updateStatus(`🎉 Player ${colorSpan} wins!`, colorClass);
    disableBoard();
    scoreXCard.classList.remove('active-x', 'active-o');
    scoreOCard.classList.remove('active-x', 'active-o');
    return;
  }

  // Check draw
  if (checkDraw()) {
    gameActive = false;
    scores.Draw++;
    updateScoreboard();
    updateStatus('🤝 It\'s a draw!', 'draw');
    disableBoard();
    scoreXCard.classList.remove('active-x', 'active-o');
    scoreOCard.classList.remove('active-x', 'active-o');
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  setStatusTurn();
  highlightActivePlayer();
}

function highlightWinningCells(combo) {
  combo.forEach((index, i) => {
    setTimeout(() => {
      cells[index].classList.add('winning');
    }, i * 120);
  });
}

function disableBoard() {
  cells.forEach(cell => {
    if (!cell.classList.contains('taken')) {
      cell.classList.add('disabled');
    }
  });
}

// ===== RESET GAME =====

function resetGame() {
  boardState = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell'; // Remove all extra classes
  });

  setStatusTurn();
  highlightActivePlayer();
}

// ===== CLEAR SCORES =====

function clearScores() {
  scores = { X: 0, O: 0, Draw: 0 };
  updateScoreboard();
  resetGame();
}

// ===== EVENT LISTENERS =====

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
clearScoreBtn.addEventListener('click', clearScores);

// ===== INIT =====
setStatusTurn();
highlightActivePlayer();
