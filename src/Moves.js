import GameState, {
  applyMoveToGameState,
  whiteInCheck,
  blackInCheck,
  blackPieceAttacksSquare,
  whitePieceAttacksSquare
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
 * @param {GameState} state
 * @param {[string]} emptySquareCodes
 * @param {[string]} safeSquareCodes
 * @returns {boolean}
 */
const castlingPrevented = (state, emptySquareCodes, safeSquareCodes) => {
  const clearPath = emptySquareCodes
    .map(Square.fromCode)
    .map(sq => getPieceAtSquare(state.board, sq))
    .every(pieceIsEmpty);

  if (!clearPath) return true;

  const attackCeck = state.whiteToMove
    ? blackPieceAttacksSquare
    : whitePieceAttacksSquare;

  const underAttack = safeSquareCodes
    .map(Square.fromCode)
    .some(sq => attackCeck(state, sq));

  return underAttack;
};

const castleMoves = (state, square) => {
  const piece = getPieceAtSquare(state.board, square);
  const moves = [];
  const opts = {
    K: {
      long: {
        path: ["b1", "c1", "d1"],
        safe: ["a1", "c1", "d1", "e1"]
      },
      short: {
        path: ["f1", "g1"],
        safe: ["f1", "g1", "h1", "e1"]
      }
    },
    k: {
      long: {
        path: ["b8", "c8", "d8"],
        safe: ["a8", "c8", "d8", "e8"]
      },
      short: {
        path: ["f8", "g8"],
        safe: ["f8", "g8", "h8", "e8"]
      }
    }
  };

  const canCastleLong = pieceIsBlack(piece)
    ? state.blackCanCastleLong
    : state.whiteCanCastleLong;

  const canCastleShort = pieceIsBlack(piece)
    ? state.blackCanCastleShort
    : state.whiteCanCastleShort;

  const longCastleOpts = opts[piece].long;
  const shortCastleOpts = opts[piece].short;

  if (
    canCastleLong &&
    !castlingPrevented(state, longCastleOpts.path, longCastleOpts.safe)
  ) {
    moves.push(Move(square, Square.relativeFrom(square, [0, -2]), state));
  }

  if (
    canCastleShort &&
    !castlingPrevented(state, shortCastleOpts.path, shortCastleOpts.safe)
  ) {
    moves.push(Move(square, Square.relativeFrom(square, [0, 2]), state));
  }

  return moves;
};

/**
 * Gets a list of legal moves for the piece on a square
 * @param {GameState} state
 * @param {Square} square
 * @returns {[Move]}
 */
export const getLegalMoves = (state, square) => {
  const piece = getPieceAtSquare(state.board, square);

  if (pieceIsBlack(piece) && !state.blackToMove) return [];
  if (pieceIsWhite(piece) && !state.whiteToMove) return [];

  let moves = getMoves(state, square);

  if (piece === "K" || piece === "k") {
    moves = moves.concat(castleMoves(state, square));
  }

  return moves.filter(move => !movePutsOwnKingInCheck(state, move));
};

/**
 * Gets a list of all legal moves for a state
 * @param {GameState} state
 */
export const getAllLegalMoves = state =>
  Square.allInBoard().reduce(
    (moves, square) => moves.concat(getLegalMoves(state, square)),
    []
  );

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
