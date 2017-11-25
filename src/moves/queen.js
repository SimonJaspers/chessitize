import { getDirectionalMoves } from "./directionBased";
import { getBishopMoves } from "./bishop";
import { getRookMoves } from "./rook";
/**
 * @param {GameState} state 
 * @param {Square} square 
 * @returns {[Move]}
 */
export const getQueenMoves = (state, square) => {
  return getBishopMoves(state, square).concat(getRookMoves(state, square));
};
