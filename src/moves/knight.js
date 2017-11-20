import { piecesAreSameColor } from "./../piece";
import { getPieceAtSquare } from "./../Board";
import { Move } from "./../Moves";
import Square from "./../Square";
/**
 * 
 * @param {*} state 
 * @param {*} square 
 */
export const getKnightMoves = (state, square) => {
  const directions = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, -1],
    [2, 1],
    [-2, -1],
    [-2, 1]
  ];

  const knight = getPieceAtSquare(state.board, square);

  const toSquares = directions
    .map(d => Square.relativeFrom(square, d))
    .filter(s => s.inBounds)
    .map(s => ({ square: s, piece: getPieceAtSquare(state.board, s) }))
    .filter(to => !piecesAreSameColor(knight, to.piece));

  return toSquares.map(to => Move(square, to.square, to.piece !== " ", false));
};
