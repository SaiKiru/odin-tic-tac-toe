const Marks = {
  X: 'X',
  O: 'O'
};

const GameBoard = (() => {
  let _board = Array(9).fill('');

  /**
   * Marks a square on the game board.
   * @param {string} mark - The mark to be made
   * @param {number} idx - The index of the square
   * @returns {boolean} Whether the square was marked successfully or not.
   */
  function markSquare(mark, idx) {
    if (_board[idx] !== '') return;

    _board[idx] = mark;
    return true;
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

  /**
   * Shows a message to the player.
   * @param {string} message The message to be shown.
   */
  function showMessage(message) {
    document.querySelector('#game-conclusion-message').textContent = message;
  }

  /**
   * Clears the message shown to the player.
   */
  function clearMessage() {
    document.querySelector('#game-conclusion-message').textContent = '';
  }

  return {
    updateDisplay,
    showMessage,
    clearMessage
  };
})();

const PlayerFactory = (mark, name) => {
  let _name = name || `Player ${mark}`;

  /**
   * @returns {string} The mark used by the player
   */
  function getMark() {
    return mark;
  }

  /**
   * @returns {string} The name of the player
   */
  function getName() {
    return _name;
  }

  return {
    getMark,
    getName
  };
};

const Game = (() => {
  const _player1 = PlayerFactory(Marks.X);
  const _player2 = PlayerFactory(Marks.O);
  let _currentPlayer = _player1;
  let _round = 1;

  /**
   * Plays a single move.
   * @param {number} idx The index of the square that triggered the move
   */
  function play(idx) {
    if (GameBoard.hasWinner()) return;

    let markSuccessful = GameBoard.markSquare(_currentPlayer.getMark(), idx);
    if (!markSuccessful) return;

    GUIController.updateDisplay(GameBoard.getBoardState());

    if (GameBoard.hasWinner()) {
      const message = `${_currentPlayer.getName()} won the game!`;
      GUIController.showMessage(message);
    }

    if (_round === 9 && !GameBoard.hasWinner()) {
      const message = "It's a draw!";
      GUIController.showMessage(message);
    }

    _round++;
    _currentPlayer = _currentPlayer === _player1 ? _player2 : _player1;
  };

  /**
   * Starts a new game and clears the board.
   */
  function newGame() {
    GameBoard.clearBoard();
    GUIController.updateDisplay(GameBoard.getBoardState());
    GUIController.clearMessage();
    _round = 1;
    _currentPlayer = _player1;
  }

  return {
    play,
    newGame
  };
})();

for (let i = 0; i < 9; i++) {
  let square = document.querySelector(`#gameboard-square${i}`);
  square.addEventListener('click', () => Game.play(i));
}

document.querySelector('#game-control-new-game').addEventListener(
  'click', () => Game.newGame()
);
