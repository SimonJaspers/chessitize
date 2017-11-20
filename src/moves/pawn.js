import board from "./../Board";
import Square from "./../Square";
import moves from "./../Moves";
import { pieceIsBlack, pieceIsWhite, pieceIsEmpty } from "./../piece";

const { getPieceAtSquare } = board;
const { Move } = moves;

/**
 * Returns a list of possible moves for a square that holds a pawn
 * @param {GameState} state 
 * @param {Square} square 
 */
const getPawnMoves = (state, square) => {
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
    moves.push(Move(square, firstStep.square, false, true));

    if (isStartPos && canMove(secondStep)) {
      moves.push(Move(square, secondStep.square, false, true));
    }
  }

  if (canTake(takesLeft)) {
    moves.push(Move(square, takesLeft.square, true, true));
  }

  if (canTake(takesRight)) {
    moves.push(Move(square, takesRight.square, true, true));
  }

  return moves;
};

export default getPawnMoves;
