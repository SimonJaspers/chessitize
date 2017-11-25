import { piecesAreSameColor } from "./../piece";
import { getPieceAtSquare } from "./../Board";
import { Move } from "./../Moves";
import Square from "./../Square";

/**
 * Recursively explores a direction on a board until the piece
 * is out of moves
 * @param {GameState} state 
 * @param {string} piece 
 * @param {Square} square 
 * @param {[number]} direction 
 * @param {[Move]} results 
 * @returns {[Move]}
 */
const getMovesUntilNotEmpty = (
  state,
  piece,
  square,
  direction,
  results = []
) => {
  const nextSquare = Square.relativeFrom(square, direction);

  // Edge of board, end of move
  if (!nextSquare.inBounds) return results;

  const toPiece = getPieceAtSquare(state.board, nextSquare);
  const hasPiece = toPiece !== " ";
  const hasEnemyPiece = hasPiece && !piecesAreSameColor(piece, toPiece);

  // Own piece, end of move
  if (hasPiece && !hasEnemyPiece) return results;

  // We can make a move for sure
  const move = Move(square, nextSquare, hasPiece && hasEnemyPiece, false);

  if (hasPiece) return results.concat(move);

  return getMovesUntilNotEmpty(
    state,
    piece,
    nextSquare,
    direction,
    results.concat(move)
  );
};

/**
 * Gets a list of moves for a piece on a square based on a set of
 * directions
 * @param {GameState} state 
 * @param {Square} square 
 * @param {[[number]]} directions 
 * @returns {[Move]}
 */
export const getDirectionalMoves = (state, square, directions) => {
  const piece = getPieceAtSquare(state.board, square);
  return directions
    .map(d => getMovesUntilNotEmpty(state, piece, square, d))
    .reduce((xs, x) => xs.concat(x));
};
