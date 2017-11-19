import FEN from "./../src/FEN";
import GameState from "./../src/GameState";
import Board from "./../src/Board";

import assert from "assert";

const testData = [
  {
    fen: "8/pR6/4p1k1/4P3/2P4p/8/PP5r/2K5 b - - 0 35",
    board: [
      [" ", " ", " ", " ", " ", " ", " ", " "],
      ["p", "R", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", "p", " ", "k", " "],
      [" ", " ", " ", " ", "P", " ", " ", " "],
      [" ", " ", "P", " ", " ", " ", " ", "p"],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      ["P", "P", " ", " ", " ", " ", " ", "r"],
      [" ", " ", "K", " ", " ", " ", " ", " "]
    ]
  },
  {
    fen: FEN.START_POSITION,
    board: Board.StartPosition()
  }
];

describe("FEN tools", () => {
  describe("fenToGameState", () => {
    // Note: (Simon) A bit of a weird test... Might want to
    //               include some sort of type check?
    it("converts to a GameState compatible object", () => {
      const result = FEN.fenToGameState(FEN.START_POSITION);
      const ref = GameState();
      assert.deepEqual(Object.keys(result).sort(), Object.keys(ref).sort());
    });

    it("correctly parses the board", () => {
      const startPos = FEN.fenToGameState(
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      );

      assert.deepEqual(startPos.board, Board.StartPosition());

      const somePos = FEN.fenToGameState(testData[0].fen);
      const someBoard = testData[0].board;

      assert.deepEqual(somePos.board, someBoard);
    });

    it("correctly parses side to move", () => {
      const result = FEN.fenToGameState(FEN.START_POSITION);

      assert.equal(result.whiteToMove, true);
      assert.equal(result.blackToMove, false);

      assert.equal(
        FEN.fenToGameState(
          "rnbqkb1r/ppp1pp1p/5np1/8/2B5/2N2N2/PPPP1PPP/R1BQ1RK1 b kq - 1 6"
        ).whiteToMove,
        false
      );

      assert.equal(
        FEN.fenToGameState(
          "2kr3r/ppp1ppbp/2nq1np1/8/2BP4/2N1BQ1P/PPP2PP1/R3R1K1 w - - 1 12"
        ).whiteToMove,
        true
      );
    });

    it("correctly parses move numbers", () => {
      const game1 = FEN.fenToGameState(
        "rnbqkbnr/pp1p1ppp/8/2pPp3/8/8/PPP1PPPP/RNBQKBNR w KQkq c6 0 3"
      );

      const game2 = FEN.fenToGameState(
        "2kr3r/ppp1ppbp/2nq1np1/8/2BP4/2N1BQ1P/PPP2PP1/R3R1K1 w - - 1 12"
      );

      assert.equal(game1.halfMoves, 0);
      assert.equal(game1.moveNr, 3);
      assert.equal(game2.halfMoves, 1);
      assert.equal(game2.moveNr, 12);
    });

    it("correctly parses castle options", () => {
      const game1 = FEN.fenToGameState(
        "rnbqkbnr/pp1p1ppp/8/2pPp3/8/8/PPP1PPPP/RNBQKBNR w KQkq c6 0 3"
      );

      const game2 = FEN.fenToGameState(
        "rnbqkb1r/ppp1pp1p/5np1/8/2B5/2N2N2/PPPP1PPP/R1BQ1RK1 b kq - 1 6"
      );

      const game3 = FEN.fenToGameState(
        "2kr3r/ppp1ppbp/2nq1np1/8/2BP4/2N1BQ1P/PPP2PP1/R3R1K1 w - - 1 12"
      );

      assert.equal(game1.blackCanCastleLong, true);
      assert.equal(game1.blackCanCastleShort, true);
      assert.equal(game1.whiteCanCastleLong, true);
      assert.equal(game1.whiteCanCastleShort, true);

      assert.equal(game2.blackCanCastleLong, true);
      assert.equal(game2.blackCanCastleShort, true);
      assert.equal(game2.whiteCanCastleLong, false);
      assert.equal(game2.whiteCanCastleShort, false);

      assert.equal(game3.blackCanCastleLong, false);
      assert.equal(game3.blackCanCastleShort, false);
      assert.equal(game3.whiteCanCastleLong, false);
      assert.equal(game3.whiteCanCastleShort, false);
    });

    it("correctly parses en passant square", () => {
      assert.equal(
        FEN.fenToGameState(
          "rnbqkbnr/pp1p1ppp/8/2pPp3/8/8/PPP1PPPP/RNBQKBNR w KQkq c6 0 3"
        ).enPassant,
        "c6"
      );

      assert.equal(
        FEN.fenToGameState(
          "rnbqkbnr/ppp1pppp/8/8/8/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 4"
        ).enPassant,
        null
      );
    });
  });

  describe("gameStateToFen", () => {
    it("returns a string", () => {
      assert.equal(typeof FEN.gameStateToFen(GameState()), "string");
    });

    // Note: (Simon) Now that fenToGameState is tested, we can test
    //               this by reversing it.
    it("correctly parses", () => {
      const fens = [
        "rnbqkbnr/pp1p1ppp/8/2pPp3/8/8/PPP1PPPP/RNBQKBNR w KQkq c6 0 3",
        "rnbqkbnr/ppp1pppp/8/8/8/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 4",
        "2kr3r/ppp1ppbp/2nq1np1/8/2BP4/2N1BQ1P/PPP2PP1/R3R1K1 w - - 1 12",
        "rnbqkb1r/ppp1pp1p/5np1/8/2B5/2N2N2/PPPP1PPP/R1BQ1RK1 b kq - 1 6"
      ];

      assert.deepEqual(
        fens.map(FEN.fenToGameState).map(FEN.gameStateToFen),
        fens
      );
    });
  });
});
