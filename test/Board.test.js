import Board from "./../src/Board";
import Square from "./../src/Square";
import assert from "assert";
import FEN from "./../src/FEN";

const { StartPosition, getPieceAtSquare, movePieceInBoard } = Board;

describe("Board", () => {
  describe("StartPosition", () => {
    it("is a function", () => {
      assert.equal(typeof StartPosition, "function");
    });

    it("returns a new board every time", () => {
      const first = StartPosition();
      const second = StartPosition();

      // Not eqal by ref
      assert.equal(first === second, false);

      // Similar
      assert.deepEqual(first, second);

      // Mutate one...
      first.pop();

      // Other stays the same
      assert.equal(first.length === second.length, false);
    });
  });

  describe("getPieceAtSquare", () => {
    it("returns the correct piece", () => {
      const board = StartPosition();
      const positions = [
        ["a1", "R"],
        ["a8", "r"],
        ["d1", "Q"],
        ["e8", "k"],
        ["h2", "P"],
        ["g7", "p"]
      ];

      positions
        .map(([code, piece]) => [Square.fromCode(code), piece])
        .forEach(([square, piece]) =>
          assert.equal(getPieceAtSquare(board, square), piece)
        );
    });
  });

  describe("movePieceInBoard", () => {
    const board = StartPosition();

    const from = Square.fromCode("d2");
    const to = Square.fromCode("d4");

    const newBoard = movePieceInBoard(board, from, to);

    it("returns a new board", () => {
      assert.equal(board === newBoard, false);
    });

    it("returns a new board", () => {
      assert.equal(board === newBoard, false);
    });

    it("makes the right move", () => {
      assert.equal(getPieceAtSquare(newBoard, from), " ");

      assert.equal(
        getPieceAtSquare(newBoard, to),
        getPieceAtSquare(board, from)
      );
    });

    it("handles a series of moves", () => {
      const finalPos =
        "rnbqkb1r/ppp1pppp/8/3p4/4B3/6P1/PPPP1P1P/RNBQK1NR b KQkq - 0 4";
      const moves = [
        ["e2", "e4"],
        ["g8", "f6"],
        ["g2", "g3"],
        ["f6", "e4"],
        ["f1", "g2"],
        ["d7", "d5"],
        ["g2", "e4"]
      ].map(moves => moves.map(Square.fromCode));

      // Note: (Simon) Might even want to define this default reducer
      //               in the Board.js file.
      const board = moves.reduce(
        (b, [from, to]) => movePieceInBoard(b, from, to),
        StartPosition()
      );

      assert.deepEqual(FEN.fenToGameState(finalPos).board, board);
    });
  });
});
