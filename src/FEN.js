import { trim } from "./utils";
import GameState from "./GameState";

/* A regular chess game's starting position in FEN notation */
const START_POSITION =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

/**
 * Splits up a fen string in to parts for rows, side to move, 
 * castle options, en passant, half moves and full moves
 * 
 * @param {string} fen 
 * @returns {[string]}
 */
const fenParts = fen => fen.split(/\s+/g);

/**
 * (Recursively) create a fen row code from a list of piece
 * codes, in which empty squares are " "
 * 
 * @param {[string]} pieces 
 * @param {string} [result=""] 
 * @param {number} [empties=0] 
 * @return {string}
 */
const pieceCodesToFenRow = (pieces, result = "", empties = 0) =>
  pieces.length === 0
    ? result + (empties || "")
    : pieces[0] === " "
      ? pieceCodesToFenRow(pieces.slice(1), result, empties + 1)
      : pieceCodesToFenRow(
          pieces.slice(1),
          result + (empties || "") + pieces[0],
          0
        );

/**
 * Translates a fen row code (part between /.../) to a list of pieces,
 * in which empty squares are " "
 * 
 * @param {string} fenRow 
 * @returns [string]
 */
const fenRowToPieceCodes = fenRow =>
  fenRow
    .split("")
    .reduce((acc, p) => acc.concat(+p > 0 ? Array(+p).fill(" ") : p), []);

/**
 * Transform a FEN string in to a game state
 * @param string} fen 
 * @returns {GameState}
 */
const fenToGameState = fen => {
  const [rows, toMove, castles, enPassant, halfMoves, fullMoves] = fenParts(
    fen
  );

  const board = rows
    .split("/")
    .map(trim)
    .map(fenRowToPieceCodes);

  return GameState(board, toMove, castles, enPassant, halfMoves, fullMoves);
};

/**
 * Generate a FEN string from a GameState
 * 
 * @param {GameState} state 
 * @returns {string}
 */
const gameStateToFen = state => {
  const rows = state.board.map(p => pieceCodesToFenRow(p));

  return [
    rows.join("/"),
    state.whiteToMove ? "w" : "b",
    [
      state.whiteCanCastleShort ? "K" : "",
      state.whiteCanCastleLong ? "Q" : "",
      state.blackCanCastleShort ? "k" : "",
      state.blackCanCastleLong ? "q" : ""
    ].join("") || "-",
    state.enPassant || "-",
    state.halfMoves,
    state.moveNr
  ].join(" ");
};

export default {
  fenToGameState,
  gameStateToFen,
  START_POSITION
};
