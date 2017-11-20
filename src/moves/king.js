import { getSquareMoves } from "./squareBased";
/**
 * @param {GameState} state 
 * @param {Square} square 
 * @returns {[Move]}
 */
export const getKingMoves = (state, square) => {
  // TODO: (Simon) Castling
  return getSquareMoves(state, square, [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1]
  ]);
};
