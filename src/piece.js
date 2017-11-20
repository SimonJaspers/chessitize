/**
 * @param {string} piece 
 * @returns {boolean}
 */
export const pieceIsEmpty = piece => piece === " ";

/**
 * @param {string} piece 
 * @returns {boolean}
 */
export const pieceIsWhite = piece =>
  piece && !pieceIsEmpty(piece) && piece.toUpperCase() === piece;

/**
 * @param {string} piece 
 * @returns {boolean}
 */
export const pieceIsBlack = piece =>
  piece && !pieceIsEmpty(piece) && piece.toLowerCase() === piece;
