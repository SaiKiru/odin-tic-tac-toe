const GameBoard = (() => {
  let _board = Array(9).fill('');

  /**
   * Marks a square on the game board.
   * @param {string} mark - The mark to be made
   * @param {number} idx - The index of the square
   */
  function markSquare(mark, idx) {
    if (_board[idx] !== '') return;

    _board[idx] = mark;
  }

  /**
   * Clears the mark on a square on the board.
   * @param {number} idx - The index of the square
   */
  function clearSquare(idx) {
    _board[idx] = '';
  }

  /**
   * Clears the board.
   */
  function clearBoard() {
    _board = Array(9).fill('');
  }

  /**
   * @returns {Array<string>} the current state of the board.
   */
  function getBoardState() {
    return _board;
  }

  /**
   * Checks if the game already has a winner.
   * @returns {boolean} `true` if the game has a winner. `false` otherwise.
   */
  function hasWinner() {
    if (
      // check rows
      _board[0] && _board[0] === _board[1] && _board[0] === _board[2] ||
      _board[3] && _board[3] === _board[4] && _board[3] === _board[5] ||
      _board[6] && _board[6] === _board[7] && _board[6] === _board[8] ||

      // check columns
      _board[0] && _board[0] === _board[3] && _board[0] === _board[6] ||
      _board[1] && _board[1] === _board[4] && _board[1] === _board[7] ||
      _board[2] && _board[2] === _board[5] && _board[2] === _board[8] ||

      // check diagonals
      _board[0] && _board[0] === _board[4] && _board[0] === _board[8] ||
      _board[2] && _board[2] === _board[4] && _board[2] === _board[6]
    ) return true;

    return false;
  }

  return {
    markSquare,
    clearSquare,
    clearBoard,
    getBoardState,
    hasWinner
  };
})();

const GUIController = (() => {
  /**
   * Selects a specific square on the board
   * @param {number} idx - the index of the square
   * @returns {Element} the square `Element`
   */
  function _selectSquare(idx) {
    return document.querySelector(`#gameboard-square${idx}`);
  }

  /**
   * Updates the board display.
   * @param {Array<number>} boardState - the current state of the board
   */
  function updateDisplay(boardState) {
    for (let i = 0; i < 9; i++) {
      _selectSquare(i).textContent = boardState[i];
    }
  }

  return {
    updateDisplay
  };
})();

const PlayerFactory = (mark) => {
  function getMark() {
    return mark;
  }

  return {
    getMark
  };
};

for (let i = 0; i < 9; i++) {
  let square = document.querySelector(`#gameboard-square${i}`);
  square.addEventListener('click', () => Game.play(i));
}
