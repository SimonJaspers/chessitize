import GameState from "./GameState";
import Square from "./Square";

import getPawnMoves from "./moves/pawn";
import { pieceIsBlack, pieceIsWhite, pieceIsEmpty } from "./piece";

import board from "./Board";

const { getPieceAtSquare } = board;

/**
 * Returns a list of possible moves for a piece on a square
 * in a game
 * @param {GameState} state 
 * @param {Square} square 
 * @param {string} piece 
 * @returns {[Move]}
 */
const getMovesForPiece = (state, square, piece) => {
  switch (piece) {
    case "p":
    case "P":
      return getPawnMoves(state, square);
    default:
      return [];
  }
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
export const Move = (from, to, takes, pawnMove) => ({
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
export const getMoves = (state, square) => {
  const board = state.board;
  const piece = getPieceAtSquare(board, square);

  if (piece === " ") return [];
  if (pieceIsBlack(piece) && !state.blackToMove) return [];
  if (pieceIsWhite(piece) && !state.whiteToMove) return [];

  // Step 1:
  const moves = getMovesForPiece(state, square, piece);

  // Step 2:
  // calculate all potential new game states

  // Step 3:
  // remove moves that cause game states in which we
  // are in check

  return moves;
};
