import { StartPosition, movePieceInBoard, getPieceAtSquare } from "./Board";
import { Move, getMoves } from "./Moves";
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
    state.fullMvoes + (state.whiteToMove ? 1 : 0)
  );

/**
 *
 * @param {GameState} state
 * @returns {boolean}
 */
export const hasCheck = state => {
  const enemyKing = state.whiteToMove ? "K" : "k";
  const squareToAttack = Square.allInBoard().find(
    sq => getPieceAtSquare(state.board, sq) === enemyKing
  );

  const potentialState = Object.assign({}, state, {
    whiteToMove: !state.whiteToMove,
    blackToMove: !state.blackToMove,
    enPassant: null
  });

  return Square.allInBoard().some(square =>
    getMoves(potentialState, square).some(
      move => move.to.code === squareToAttack.code
    )
  );
};

export default GameState;
