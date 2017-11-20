import { getSquareMoves } from "./squareBased";
/**
 * @param {*} state 
 * @param {*} square 
 */
export const getKnightMoves = (state, square) => {
  return getSquareMoves(state, square, [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, -1],
    [2, 1],
    [-2, -1],
    [-2, 1]
  ]);
};
