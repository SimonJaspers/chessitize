import {
  pieceIsEmpty,
  pieceIsBlack,
  pieceIsWhite,
  piecesAreSameColor,
  pieceCanTakePiece
} from "./../src/piece";
import assert from "assert";

describe("piece helpers", () => {
  describe("pieceIsEmpty", () => {
    it("recognizes empty pieces", () => {
      assert.equal(pieceIsEmpty(" "), true);

      ["", "  ", "_", null, false, "p", "K", "Q", "w", true].forEach(p =>
        assert.equal(pieceIsEmpty(p), false)
      );
    });
  });

  describe("pieceIsWhite", () => {
    it("recognizes white pieces", () => {
      ["K", "Q", "P", "B", "R", "N", "B"].forEach(p => {
        assert.equal(pieceIsWhite(p), true);
      });

      ["k", " ", "q", null, "", false, undefined].forEach(p => {
        assert.equal(pieceIsWhite(p), false);
      });
    });
  });

  describe("pieceIsBlack", () => {
    it("recognizes black pieces", () => {
      ["k", "q", "p", "b", "r", "n", "b"].forEach(p => {
        assert.equal(pieceIsBlack(p), true);
      });

      ["K", " ", "Q", null, "", false, undefined].forEach(p => {
        assert.equal(pieceIsBlack(p), false);
      });
    });
  });

  describe("piecesAreSameColor", () => {
    it("works for black pieces", () => {
      [["q", "k"], ["p", "n"]].forEach(pair =>
        assert.equal(piecesAreSameColor(...pair), true)
      );
    });

    it("works for white pieces", () => {
      [["Q", "N"], ["B", "P"]].forEach(pair =>
        assert.equal(piecesAreSameColor(...pair), true)
      );
    });

    it("returns false when one or both are empty", () => {
      [["Q", " "], ["q", " "], [" ", " "], [" ", "k"], [" ", "K"]].forEach(
        pair => assert.equal(piecesAreSameColor(...pair), false)
      );
    });
  });

  describe("pieceCanTakePiece", () => {
    it("works white to black", () => {
      assert.equal(pieceCanTakePiece("K", "p"), true);
    });

    it("works white to black", () => {
      assert.equal(pieceCanTakePiece("K", "p"), true);
    });

    it("handles empty squares", () => {
      [[" ", "q"], ["q", " "], [" ", " "], [" ", "k"], [" ", "K"]].forEach(
        pair => assert.equal(pieceCanTakePiece(...pair), false)
      );
    });
  });
});
