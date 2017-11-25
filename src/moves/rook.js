import { getDirectionalMoves } from "./directionBased";
/**
 * @param {GameState} state 
 * @param {Square} square 
 * @returns {[Move]}
 */
export const getRookMoves = (state, square) => {
  return getDirectionalMoves(state, square, [[1, 0], [-1, 0], [0, -1], [0, 1]]);
};
