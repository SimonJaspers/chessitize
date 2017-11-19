import Square from "./../src/Square";

import assert from "assert";

const testData = [
  [0, 0, [0, 0], "a8"],
  [7, 7, [7, 7], "h1"],
  [0, 7, [0, 7], "h8"],
  [7, 0, [7, 0], "a1"],
  [3, 4, [3, 4], "e5"]
];

describe("Square", () => {
  describe("by row & file", () => {
    it("returns the correct square", () => {
      testData.forEach(([rowNr, fileNr, coord, code]) =>
        assert.deepEqual(Square(rowNr, fileNr).coord, coord)
      );
    });
  });

  describe("fromCoord", () => {
    it("returns the correct square", () => {
      testData.forEach(([rowNr, fileNr, coord, code]) =>
        assert.equal(Square.fromCoord(coord).code, code)
      );
    });
  });

  describe("fromCode", () => {
    it("returns the correct square", () => {
      testData.forEach(([rowNr, fileNr, coord, code]) => {
        const square = Square.fromCode(code);
        assert.equal(square.row, rowNr);
        assert.equal(square.file, fileNr);
      });
    });
  });
});
