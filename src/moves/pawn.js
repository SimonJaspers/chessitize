import { getPieceAtSquare } from "./../Board";
import Square from "./../Square";
import { Move } from "./../Moves";

import { pieceIsBlack, pieceIsWhite, pieceIsEmpty } from "./../piece";

/**
 * Returns a list of possible moves for a square that holds a pawn
 * @param {GameState} state
 * @param {Square} square
 */
export const getPawnMoves = (state, square) => {
  const board = state.board;
  const piece = getPieceAtSquare(board, square);
  const isBlack = pieceIsBlack(piece);

  const canTake = ({ square, piece }) =>
    // There's piece info
    piece &&
    // The square is on the board
    square.inBounds &&
    // There's a piece of the opposite color OR
    // it's the state's en passant square
    ((isBlack ? pieceIsWhite(piece) : pieceIsBlack(piece)) ||
      state.enPassant === square.code);

  const canMove = ({ square, piece }) => square.inBounds && pieceIsEmpty(piece);

  const isStartPos = isBlack ? square.row === 1 : square.row === 6;

  const directions = [
    isBlack ? [1, 0] : [-1, 0], // First step
    isBlack ? [2, 0] : [-2, 0], // Second step
    isBlack ? [1, -1] : [-1, -1], // Takes left
    isBlack ? [1, 1] : [-1, 1] // Takes right
  ];

  const piecesAtValidSquares = directions
    .map(d => Square.relativeFrom(square, d))
    .map(s => ({
      piece: s.inBounds ? getPieceAtSquare(board, s) : null,
      square: s
    }));

  const moves = [];
  const [firstStep, secondStep, takesLeft, takesRight] = piecesAtValidSquares;

  if (canMove(firstStep)) {
    moves.push(Move(square, firstStep.square, state));

    if (isStartPos && canMove(secondStep)) {
      moves.push(Move(square, secondStep.square, state));
    }
  }

  if (canTake(takesLeft)) {
    moves.push(Move(square, takesLeft.square, state));
  }

  if (canTake(takesRight)) {
    moves.push(Move(square, takesRight.square, state));
  }

  return moves;
};
