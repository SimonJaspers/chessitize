import GameState from "./../src/GameState";
import Square from "./../src/Square";
import FEN from "./../src/FEN";
import { getMoves } from "./../src/Moves";

import assert from "assert";

describe("Moves", () => {
  describe("Pawn ♙♟", () => {
    it("handles double pawn moves", () => {
      const moves = getMoves(GameState(), Square.fromCode("a2"));

      assert.equal(moves.length, 2);

      assert.equal(moves[0].to.code, "a3");
      assert.equal(moves[1].to.code, "a4");

      const bMoves = getMoves(
        FEN.fenToGameState(
          "rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR b KQkq - 0 1"
        ),
        Square.fromCode("d7")
      );
      assert.equal(bMoves.length, 2);

      assert.equal(bMoves[0].to.code, "d6");
      assert.equal(bMoves[1].to.code, "d5");
    });

    it("handles single pawn moves", () => {
      const wMove = FEN.fenToGameState(
        "rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR w KQkq - 0 1"
      );
      const wMoves = getMoves(wMove, Square.fromCode("a4"));

      assert.equal(wMoves.length, 1);
      assert.equal(wMoves[0].to.code, "a5");

      const bMove = FEN.fenToGameState(
        "rnbqkbnr/ppp1pppp/8/3p4/P7/7P/1PPPPPP1/RNBQKBNR b KQkq - 0 2"
      );
      const bMoves = getMoves(bMove, Square.fromCode("d5"));

      assert.equal(bMoves.length, 1);
      assert.equal(bMoves[0].to.code, "d4");
    });

    it("handles takes", () => {
      const whiteToMove = FEN.fenToGameState(
        "rnbqkbnr/pppp1p1p/8/4p1p1/3P1P2/8/PPP1P1PP/RNBQKBNR w KQkq - 0 3"
      );
      const blackToMove = FEN.fenToGameState(
        "rnbqkbnr/pppp1p1p/8/4p1p1/3P1P2/8/PPP1P1PP/RNBQKBNR b KQkq - 0 3"
      );

      const wMoves = getMoves(whiteToMove, Square.fromCode("f4"));
      const bMoves = getMoves(blackToMove, Square.fromCode("e5"));

      assert.equal(wMoves.length, 3);
      assert.equal(bMoves.length, 3);

      assert.deepEqual(wMoves.map(m => m.to.code), ["f5", "e5", "g5"]);
      assert.deepEqual(bMoves.map(m => m.to.code), ["e4", "d4", "f4"]);
    });

    it("handles en passant", () => {
      const whiteEnPassantState = FEN.fenToGameState(
        "rnbqkbnr/pp5p/2P2p2/3pP3/6pP/8/PPP1P1P1/RNBQKBNR w KQkq d6 0 7"
      );

      const wMoves = getMoves(whiteEnPassantState, Square.fromCode("e5"));

      assert.equal(wMoves.length, 3);
      assert.equal(wMoves[1].to.code, "d6");
      assert.equal(wMoves[2].to.code, "f6");

      const blackEnPassantState = FEN.fenToGameState(
        "rnbqkbnr/pp1p1p1p/2P5/4p3/5PpP/8/PPP1P1P1/RNBQKBNR b KQkq h3 0 5"
      );

      const bMoves = getMoves(blackEnPassantState, Square.fromCode("g4"));

      assert.equal(bMoves.length, 2);
      assert.equal(bMoves[1].to.code, "h3");
    });
  });

  describe("Knight ♘♞", () => {
    it("jumps to the right squares", () => {
      const whiteStartMoves = getMoves(GameState(), Square.fromCode("b1"));

      assert.equal(whiteStartMoves.length, 2);
      assert.equal(whiteStartMoves[0].to.code, "a3");
      assert.equal(whiteStartMoves[1].to.code, "c3");
    });
  });

  describe("Bishop", () => {
    it("moves in four directions", () => {
      const state = FEN.fenToGameState(
        "rnbqkbnr/pppp2pp/4pp2/8/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 3"
      );

      const whiteMoves = getMoves(state, Square.fromCode("c4"));

      assert.equal(whiteMoves.length, 8);
    });
  });

  describe("King", () => {
    it("can move around", () => {
      const wState = FEN.fenToGameState("8/6p1/4k3/8/8/2K5/8/8 w - -");
      const wMoves = getMoves(wState, Square.fromCode("c3"));

      assert.equal(wMoves.length, 8);
      assert.deepEqual(
        wMoves.map(m => m.to.code).sort(),
        ["c4", "d4", "d3", "d2", "c2", "b2", "b3", "b4"].sort()
      );

      const bState = FEN.fenToGameState("7k/6p1/8/8/8/2K5/8/8 b - -");
      const bMoves = getMoves(bState, Square.fromCode("h8"));

      assert.equal(bMoves.length, 2);
    });
  });

  describe("Start position", () => {
    it("allows 20 moves", () => {
      const state = GameState();

      const squares = state.board.reduce(
        (squares, row, rowNr) =>
          row.reduce(
            (squares, piece, fileNr) => squares.concat(Square(rowNr, fileNr)),
            squares
          ),
        []
      );

      const moves = squares.reduce(
        (moves, square) => moves.concat(getMoves(state, square)),
        []
      );

      assert.equal(moves.length, 20);
    });
  });
});
