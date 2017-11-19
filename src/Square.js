const rowOrder = "87654321";
const fileOrder = "abcdefgh";

/**
 * Represents a square in a chess board without its contents
 * 
 * @typedef {Object} Square
 * @property {number} row
 * @property {number} file
 * @property {string} code - Name of the square
 * @property {[number]} coord - row and file nrs in array
 */

/**
 * Create a square by row and file nr.
 * 
 * @param {number} rowNr 
 * @param {number} fileNr 
 * @returns {Square}
 */
const Square = (rowNr, fileNr) => ({
  row: rowNr,
  file: fileNr,
  code: `${fileOrder[fileNr]}${rowOrder[rowNr]}`,
  coord: [rowNr, fileNr]
});

/**
 * Create the square for a square name
 * @param {string} code 
 * @returns {Square}
 */
Square.fromCode = code =>
  Square(rowOrder.indexOf(code[1]), fileOrder.indexOf(code[0]));

/**
 * Create the square for a coordinate array
 * @param {[number]} coords - [rowNr, fileNr] 
 */
Square.fromCoord = ([rowNr, fileNr]) => Square(rowNr, fileNr);

export default Square;
