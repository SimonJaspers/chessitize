import { getDirectionalMoves } from "./directionBased";
/**
 * @param {GameState} state 
 * @param {Square} square 
 * @returns {[Move]}
 */
export const getBishopMoves = (state, square) => {
  return getDirectionalMoves(state, square, [
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1]
  ]);
};
