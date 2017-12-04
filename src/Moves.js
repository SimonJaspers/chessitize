import GameState, {
  applyMoveToGameState,
  whiteInCheck,
  blackInCheck,
  blackPieceAttacksSquare
} from "./GameState";
import Square from "./Square";

import { getPawnMoves } from "./moves/pawn";
import { getKnightMoves } from "./moves/knight";
import { getKingMoves } from "./moves/king";

import {
  pieceIsBlack,
  pieceIsWhite,
  pieceIsEmpty,
  piecesAreSameColor,
  pieceCanTakePiece
} from "./piece";

import { getPieceAtSquare } from "./Board";
import { getBishopMoves } from "./moves/bishop";
import { getQueenMoves } from "./moves/queen";
import { getRookMoves } from "./moves/rook";

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
    case "n":
    case "N":
      return getKnightMoves(state, square);
    case "k":
    case "K":
      return getKingMoves(state, square);
    case "b":
    case "B":
      return getBishopMoves(state, square);
    case "q":
    case "Q":
      return getQueenMoves(state, square);
    case "r":
    case "R":
      return getRookMoves(state, square);
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
 * @property {boolean} takesKing
 * @property {boolean} castles
 *
 */

/**
 * Creates a move to help create a PGN step
 * @param {Square} from
 * @param {Square} to
 * @param {GameState} state
 * @returns {Move}
 */
export const Move = (from, to, state) => ({
  from,
  to,
  takes: pieceCanTakePiece(
    getPieceAtSquare(state.board, from),
    getPieceAtSquare(state.board, to)
  ),
  takesKing: getPieceAtSquare(state.board, to).toLowerCase() === "k",
  pawnMove: getPieceAtSquare(state.board, from).toLowerCase() === "p",
  castles:
    getPieceAtSquare(state.board, from).toLowerCase() === "k" &&
    Math.abs(from.file - to.file) === 2
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

  // Get all moves for the piece without worrying about illegal moves
  return getMovesForPiece(state, square, piece);
};

/**
 * Gets a list of legal moves
 * @param {GameState} state
 * @param {Square} square
 * @returns {[Move]}
 */
export const getLegalMoves = (state, square) => {
  const piece = getPieceAtSquare(state.board, square);

  if (pieceIsBlack(piece) && !state.blackToMove) return [];
  if (pieceIsWhite(piece) && !state.whiteToMove) return [];

  const moves = getMoves(state, square);

  if (state.whiteToMove && piece === "K" && !whiteInCheck(state)) {
    if (state.whiteCanCastleLong) {
      const clearPath = ["b1", "c1", "d1"]
        .map(Square.fromCode)
        .map(sq => getPieceAtSquare(state.board, sq))
        .map(p => (console.log(p), p))
        .every(pieceIsEmpty);

      if (clearPath) {
        const underAttack = ["a1", "c1", "d1"]
          .map(Square.fromCode)
          .some(sq => blackPieceAttacksSquare(state, sq));

        if (!underAttack) {
          moves.push(Move(square, Square.relativeFrom(square, [0, 2]), state));
        }
      }
    }

    if (state.whiteCanCastleShort) {
      // Check if "f1", "g1" or "h1" are under attack
    }
  }

  return moves.filter(move => !movePutsOwnKingInCheck(state, move));
};

/**
 * @param {GameState} state
 * @param {Move} move
 * @returns {boolean}
 */
const movePutsOwnKingInCheck = (state, move) => {
  const movedPiece = getPieceAtSquare(state.board, move.from);
  const newState = applyMoveToGameState(state, move);

  return pieceIsBlack(movedPiece)
    ? blackInCheck(newState)
    : whiteInCheck(newState);
};

/**
 * @param {GameState} state
 * @param {Move} move
 * @returns {boolean}
 */
const moveGivesCheck = (state, move) => {
  const movedPiece = getPieceAtSquare(state.board, move.from);
  const newState = applyMoveToGameState(state, move);

  return pieceIsBlack(movedPiece)
    ? whiteInCheck(newState)
    : blackInCheck(newState);
};
