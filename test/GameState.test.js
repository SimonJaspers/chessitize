import GameState from "./../src/GameState";
import { hasCheck } from "./../src/GameState";
import { StartPosition } from "./../src/Board";
import FEN from "./../src/FEN";

import assert from "assert";

describe("GameState", () => {
  it("Constructs chess' starting position by default", () => {
    const state = GameState();

    assert.deepEqual(state.board, StartPosition());
    assert.equal(state.blackCanCastleLong, true);
    assert.equal(state.blackCanCastleShort, true);
    assert.equal(state.whiteCanCastleLong, true);
    assert.equal(state.whiteCanCastleShort, true);
    assert.equal(state.enPassant, null);
    assert.equal(state.whiteToMove, true);
    assert.equal(state.halfMoves, 0);
    assert.equal(state.moveNr, 1);
  });

  it("finds check", () => {
    const check = FEN.fenToGameState(
      "rnb1kbnr/pppp1ppp/8/4p3/5P1q/4P3/PPPP2PP/RNBQKBNR w KQkq - 1 3"
    );

    assert.equal(hasCheck(check), true);

    const noCheck = FEN.fenToGameState(
      "rnb1kbnr/pppp1ppp/8/4p3/5P1q/4P1P1/PPPP3P/RNBQKBNR b KQkq - 0 3"
    );

    assert.equal(hasCheck(noCheck), false);

    const anotherCheck = FEN.fenToGameState(
      "rnb1kbnr/pppp1Ppp/8/8/5q2/4P1P1/PPPP3P/RNBQKBNR b KQkq - 0 6"
    );

    assert.equal(hasCheck(anotherCheck), true);
  });
});
