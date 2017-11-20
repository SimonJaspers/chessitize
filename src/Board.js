/**
 * Returns a board that holds a default start position
 * @returns {[[string]]}
 */
export const StartPosition = () => [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"]
];

const clone = board => board.slice(0).map(row => row.slice(0));

/**
 * Returns the piece (" " if empty) at a position in a board
 * @param {[[string]]} board 
 * @param {Square} square 
 * @returns {string}
 */
export const getPieceAtSquare = (board, square) =>
  board[square.row][square.file];

/**
 * Sets the square in a board to a (piece/empty) string
 *
 * @param {[[string]]} board 
 * @param {Square} square 
 * @param {string} value 
 */
const setSquareString = (board, square, value) => {
  const newBoard = clone(board);
  newBoard[square.row][square.file] = value;
  return newBoard;
};

/**
 * Returns a new piece in which the fromSquare is empty, and
 * the toSquare has the moved piece. Note: this function does
 * not perform any validity checks
 * 
 * @param {[[string]]} board 
 * @param {Square} fromSquare 
 * @param {Square} toSquare 
 * @returns {[[string]]}
 */
export const movePieceInBoard = (board, fromSquare, toSquare) =>
  setSquareString(
    setSquareString(board, fromSquare, " "), // Board without fromSquare
    toSquare,
    getPieceAtSquare(board, fromSquare) // Get value from old square
  );
