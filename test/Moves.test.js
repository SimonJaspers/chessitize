import GameState from "./../src/GameState";
import Square from "./../src/Square";
import FEN from "./../src/FEN";
import { getLegalMoves } from "./../src/Moves";

import assert from "assert";

describe("Moves", () => {
  describe("Illegal moves", () => {
    it("allows putting oponent in check", () => {
      const startPos = FEN.fenToGameState(
        "rnb1kbnr/pp1pp1pp/2p5/q4P2/8/5P2/PPPPK1PP/RNBQ1BNR b kq - 0 4"
      );

      const qMoves = getLegalMoves(startPos, Square.fromCode("a5"));

      assert.equal(qMoves.some(m => m.to.code === "b5"), true);
      assert.equal(qMoves.some(m => m.to.code === "d2"), true);
      assert.equal(qMoves.some(m => m.to.code === "e5"), true);
    });

    it("disallows discovered attack on own king", () => {
      const startPos = FEN.fenToGameState(
        "rnb1kbnr/pp1ppppp/2p5/q7/4P3/5P2/PPPP2PP/RNBQKBNR w KQkq - 1 3"
      );

      const unmoveablePawnSquare = Square.fromCode("d2");
      const noMoves = getLegalMoves(startPos, unmoveablePawnSquare);

      assert.equal(noMoves.length, 0);
    });
  });

  describe("Pawn ♙♟", () => {
    it("handles double pawn moves", () => {
      const moves = getLegalMoves(GameState(), Square.fromCode("a2"));

      assert.equal(moves.length, 2);

      assert.equal(moves[0].to.code, "a3");
      assert.equal(moves[1].to.code, "a4");

      const bMoves = getLegalMoves(
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
      const wMoves = getLegalMoves(wMove, Square.fromCode("a4"));

      assert.equal(wMoves.length, 1);
      assert.equal(wMoves[0].to.code, "a5");

      const bMove = FEN.fenToGameState(
        "rnbqkbnr/ppp1pppp/8/3p4/P7/7P/1PPPPPP1/RNBQKBNR b KQkq - 0 2"
      );
      const bMoves = getLegalMoves(bMove, Square.fromCode("d5"));

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

      const wMoves = getLegalMoves(whiteToMove, Square.fromCode("f4"));
      const bMoves = getLegalMoves(blackToMove, Square.fromCode("e5"));

      assert.equal(wMoves.length, 3);
      assert.equal(bMoves.length, 3);

      assert.deepEqual(wMoves.map(m => m.to.code), ["f5", "e5", "g5"]);
      assert.deepEqual(bMoves.map(m => m.to.code), ["e4", "d4", "f4"]);
    });

    it("handles en passant", () => {
      const whiteEnPassantState = FEN.fenToGameState(
        "rnbqkbnr/pp5p/2P2p2/3pP3/6pP/8/PPP1P1P1/RNBQKBNR w KQkq d6 0 7"
      );

      const wMoves = getLegalMoves(whiteEnPassantState, Square.fromCode("e5"));

      assert.equal(wMoves.length, 3);
      assert.equal(wMoves[1].to.code, "d6");
      assert.equal(wMoves[2].to.code, "f6");

      const blackEnPassantState = FEN.fenToGameState(
        "rnbqkbnr/pp1p1p1p/2P5/4p3/5PpP/8/PPP1P1P1/RNBQKBNR b KQkq h3 0 5"
      );

      const bMoves = getLegalMoves(blackEnPassantState, Square.fromCode("g4"));

      assert.equal(bMoves.length, 2);
      assert.equal(bMoves[1].to.code, "h3");
    });
  });

  describe("Knight ♘♞", () => {
    it("jumps to the right squares", () => {
      const whiteStartMoves = getLegalMoves(GameState(), Square.fromCode("b1"));

      assert.equal(whiteStartMoves.length, 2);
      assert.equal(whiteStartMoves[0].to.code, "a3");
      assert.equal(whiteStartMoves[1].to.code, "c3");
    });
  });

  describe("Bishop ♗♝", () => {
    const state = FEN.fenToGameState(
      "rnbqkbnr/pppp2pp/4pp2/8/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 3"
    );

    const whiteMoves = getLegalMoves(state, Square.fromCode("c4"));

    it("moves in four directions", () => {
      assert.equal(whiteMoves.length, 8);
    });

    it("takes", () => {
      const takes = whiteMoves.filter(m => m.takes);
      assert.equal(takes.length, 1);
      assert.equal(takes[0].to.code, "e6");
    });
  });

  describe("Rook ♖♜", () => {
    const state = FEN.fenToGameState(
      "2bqkbnr/1ppp3p/4ppp1/p1rB4/3nP3/2PP1P1P/PP2N1P1/RNBQK2R b KQk - 2 11"
    );

    const rMoves = getLegalMoves(state, Square.fromCode("c5"));

    it("moves horizontally and vertically", () => {
      assert.equal(rMoves.length, 5);
    });

    it("takes", () => {
      assert.equal(rMoves.filter(m => m.takes).length, 2);
    });
  });

  describe("Queen ♕♛", () => {
    const state = FEN.fenToGameState(
      "r1bqkbnr/pppp2pp/2n1pp2/8/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 2 4"
    );
    const qMoves = getLegalMoves(state, Square.fromCode("f3"));

    it("moves diagonally, vertically and horizontally", () => {
      assert.equal(qMoves.length, 14);
    });

    it("takes", () => {
      assert.equal(qMoves.filter(m => m.takes).length, 1);
    });
  });

  describe("King ♔♚", () => {
    it("can move around", () => {
      const wState = FEN.fenToGameState("8/6p1/4k3/8/8/2K5/8/8 w - -");
      const wMoves = getLegalMoves(wState, Square.fromCode("c3"));

      assert.equal(wMoves.length, 8);
      assert.deepEqual(
        wMoves.map(m => m.to.code).sort(),
        ["c4", "d4", "d3", "d2", "c2", "b2", "b3", "b4"].sort()
      );

      const bState = FEN.fenToGameState("7k/6p1/8/8/8/2K5/8/8 b - -");
      const bMoves = getLegalMoves(bState, Square.fromCode("h8"));

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
        (moves, square) => moves.concat(getLegalMoves(state, square)),
        []
      );

      assert.equal(moves.length, 20);
    });
  });
});
