import board from "./Board";
import GameState from "./GameState";
import Square from "./Square";

import { map, filter } from "./utils";

import { pieceIsBlack, pieceIsWhite, pieceIsEmpty } from "./piece";

const { getPieceAtSquare } = board;

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

/**
 * Move
 * 
 * @typedef {Object} Move
 * @property {Square} from
 * @property {Square} to
 * @property {boolean} takes
 * @property {boolean} pawnMove 
 * 
 */

/**
 * Creates a move to help create a PGN step
 * @param {Square} from 
 * @param {Square} to 
 * @param {boolean} takes 
 * @param {boolean} pawnMove 
 * @returns {Move}
 */
const Move = (from, to, takes, pawnMove) => ({
  from,
  to,
  takes,
  pawnMove
});

/**
 * Returns a series of moves a piece can make on a board.
 * Will not include castles or en passant, those are handled
 * seperately
 * 
 * @param {GameState} state 
 * @param {Square} square 
 * @returns {[Move]}
 */
const getMoves = (state, square) => {
  const board = state.board;
  const piece = getPieceAtSquare(board, square);

  if (piece === " ") return [];
  if (pieceIsBlack(piece) && !state.blackToMove) return [];
  if (pieceIsWhite(piece) && !state.whiteToMove) return [];

  // Step 1:
  // get all regular moves

  // Step 2:
  // calculate all potential new game states

  // Step 3:
  // remove moves that cause game states in which we
  // are in check
};

// TODO: (Simon) Don't forget to create these:
const getCastles = state => [];
const getEnPassants = state => [];

export default {
  getPawnMoves
};
