import Moves from "./../src/Moves";
import GameState from "./../src/GameState";
import Square from "./../src/Square";
import FEN from "./../src/FEN";

import assert from "assert";

const { getPawnMoves } = Moves;

describe("Moves", () => {
  describe("Pawn ♙♟", () => {
    it("handles double pawn moves", () => {
      const moves = getPawnMoves(GameState(), Square.fromCode("a2"));

      assert.equal(moves.length, 2);

      assert.equal(moves[0].square.code, "a3");
      assert.equal(moves[1].square.code, "a4");

      const bMoves = getPawnMoves(GameState(), Square.fromCode("d7"));
      assert.equal(bMoves.length, 2);

      assert.equal(bMoves[0].square.code, "d6");
      assert.equal(bMoves[1].square.code, "d5");
    });

    it("handles single pawn moves", () => {
      const wMove = FEN.fenToGameState(
        "rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR b KQkq - 0 1"
      );
      const wMoves = getPawnMoves(wMove, Square.fromCode("a4"));

      assert.equal(wMoves.length, 1);
      assert.equal(wMoves[0].square.code, "a5");

      const bMove = FEN.fenToGameState(
        "rnbqkbnr/ppp1pppp/8/3p4/P7/7P/1PPPPPP1/RNBQKBNR b KQkq - 0 2"
      );
      const bMoves = getPawnMoves(bMove, Square.fromCode("d5"));

      assert.equal(bMoves.length, 1);
      assert.equal(bMoves[0].square.code, "d4");
    });

    it("handles takes", () => {
      const state = FEN.fenToGameState(
        "rnbqkbnr/pppp1p1p/8/4p1p1/3P1P2/8/PPP1P1PP/RNBQKBNR w KQkq - 0 3"
      );

      const wMoves = getPawnMoves(state, Square.fromCode("f4"));
      const bMoves = getPawnMoves(state, Square.fromCode("e5"));

      assert.equal(wMoves.length, 3);
      assert.equal(bMoves.length, 3);

      assert.deepEqual(wMoves.map(m => m.square.code), ["f5", "e5", "g5"]);
      assert.deepEqual(bMoves.map(m => m.square.code), ["e4", "d4", "f4"]);
    });

    it("handles en passant", () => {
      const whiteEnPassantState = FEN.fenToGameState(
        "rnbqkbnr/pp5p/2P2p2/3pP3/6pP/8/PPP1P1P1/RNBQKBNR w KQkq d6 0 7"
      );

      const wMoves = getPawnMoves(whiteEnPassantState, Square.fromCode("e5"));

      assert.equal(wMoves.length, 3);
      assert.equal(wMoves[1].square.code, "d6");
      assert.equal(wMoves[2].square.code, "f6");

      const blackEnPassantState = FEN.fenToGameState(
        "rnbqkbnr/pp1p1p1p/2P5/4p3/5PpP/8/PPP1P1P1/RNBQKBNR b KQkq h3 0 5"
      );

      const bMoves = getPawnMoves(blackEnPassantState, Square.fromCode("g4"));

      assert.equal(bMoves.length, 2);
      assert.equal(bMoves[1].square.code, "h3");
    });
  });
});
