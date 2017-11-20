import { piecesAreSameColor } from "./../piece";
import { getPieceAtSquare } from "./../Board";
import { Move } from "./../Moves";
import Square from "./../Square";

/**
 * @param {*} state 
 * @param {*} square 
 * @param {[[number]] relatives - Square locations [dRow, dFile] relative to this square}
 * @returns {[Moves]}
 */
export const getSquareMoves = (state, square, relatives) => {
  const thisPiece = getPieceAtSquare(state.board, square);

  const toSquares = relatives
    .map(d => Square.relativeFrom(square, d))
    .filter(s => s.inBounds)
    .map(s => ({ square: s, piece: getPieceAtSquare(state.board, s) }))
    .filter(to => to.piece === " " || !piecesAreSameColor(thisPiece, to.piece));

  return toSquares.map(to => Move(square, to.square, to.piece !== " ", false));
};
