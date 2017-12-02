import { StartPosition, movePieceInBoard, getPieceAtSquare } from "./Board";
import { Move, getMoves } from "./Moves";
import { compose } from "./utils";
import { pieceIsBlack, pieceIsWhite } from "./piece";
import Square from "./Square";

/**
 * Represents a chess board during a game
 * @typedef {Object} GameState
 * @property {[[string]]} board
 * @property {boolean} whiteToMove
 * @property {boolean} blackToMove
 * @property {boolean} whiteCanCastleShort
 * @property {boolean} whiteCanCastleLong
 * @property {boolean} blackCanCastleShort
 * @property {boolean} blackCanCastleLong
 * @property {string?} enPassant - Position behind a pawn that just made a 2 square advance
 * @property {number} halfMoves - Half moves since last capture or pawn
 * @property {number} moveNr - Total moves in game. Starts at 1, increment per black move
 */

/**
 * Create a GameState
 * @param {[[string]]} board - A list of rows containing piece codes
 * @param {string} toMove - "w" for white, "b" for black
 * @param {string} castleOptions - Any combination of "KQkq" for white/black king/queen side castling
 * @param {string} enPassantSquare - Position behind a pawn that just made a 2 square advance
 * @param {string|number} halfMoves - Half moves since last capture or pawn advance
 * @param {string|number} fullMoves - Total moves in game. Starts at 1, increment per black move
 * @returns {GameState}
 */
const GameState = (
  board,
  toMove = "w",
  castleOptions = "KQkq",
  enPassantSquare = "-",
  halfMoves = 0,
  fullMoves = 1
) => {
  return {
    board: board || StartPosition(),
    // Side to move
    whiteToMove: toMove === "w",
    blackToMove: toMove === "b",
    // Castle options
    whiteCanCastleShort: castleOptions.includes("K"),
    whiteCanCastleLong: castleOptions.includes("Q"),
    blackCanCastleShort: castleOptions.includes("k"),
    blackCanCastleLong: castleOptions.includes("q"),
    // En passant
    enPassant: enPassantSquare === "-" ? null : enPassantSquare,
    // Move numbers
    halfMoves: +halfMoves,
    moveNr: +fullMoves
  };
};

/**
 *
 * @param {GameState} state
 * @param {Move} move
 * @returns {GameState}
 */
export const applyMoveToGameState = (state, move) =>
  GameState(
    movePieceInBoard(state.board, move.from, move.to),
    state.whiteToMove ? "b" : "w",
    undefined, // TODO: (Simon) Calculate castle options
    move.isPawnMove && move.to.row - move.from.row === 2, // TODO: (Simon) get en passant square
    state.halfMoves + 1,
    state.moveNr + (state.whiteToMove ? 1 : 0)
  );

/**
 * @param {GameState} state
 * @returns {boolean}
 */
export const hasCheck = state => {
  return Square.allInBoard().some(square =>
    getMoves(state, square).some(move => move.takesKing)
  );
};

// TODO: (Simon) DRY
/**
 * @param {GameState} state
 * @returns {boolean}
 */
export const whiteInCheck = state => {
  return Square.allInBoard()
    .filter(sq => pieceIsBlack(getPieceAtSquare(state.board, sq)))
    .some(square => getMoves(state, square).some(move => move.takesKing));
};

/**
 * @param {GameState} state
 * @returns {boolean}
 */
export const blackInCheck = state => {
  return Square.allInBoard()
    .filter(sq => pieceIsWhite(getPieceAtSquare(state.board, sq)))
    .some(square => getMoves(state, square).some(move => move.takesKing));
};

export default GameState;
