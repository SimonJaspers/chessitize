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
  !!piece && !pieceIsEmpty(piece) && piece.toUpperCase() === piece;

/**
 * @param {string} piece
 * @returns {boolean}
 */
export const pieceIsBlack = piece =>
  !!piece && !pieceIsEmpty(piece) && piece.toLowerCase() === piece;

/**
 * @param {string} p1
 * @param {string} p2
 * @returns {boolean}
 */
export const piecesAreSameColor = (p1, p2) =>
  (pieceIsWhite(p1) && pieceIsWhite(p2)) ||
  (pieceIsBlack(p1) && pieceIsBlack(p2));

/**
 * @param {string} p1
 * @param {string} p2
 * @returns {boolean}
 */
export const pieceCanTakePiece = (p1, p2) =>
  (pieceIsWhite(p1) && pieceIsBlack(p2)) ||
  (pieceIsBlack(p1) && pieceIsWhite(p2));
