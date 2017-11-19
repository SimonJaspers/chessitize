import Board from "./Board";

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
    board: board || Board.StartPosition(),
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

export default GameState;
