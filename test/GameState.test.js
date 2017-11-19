import GameState from "./../src/GameState";
import Board from "./../src/Board";

import assert from "assert";

describe("GameState", () => {
  it("Constructs chess' starting position by default", () => {
    const state = GameState();

    assert.deepEqual(state.board, Board.StartPosition());
    assert.equal(state.blackCanCastleLong, true);
    assert.equal(state.blackCanCastleShort, true);
    assert.equal(state.whiteCanCastleLong, true);
    assert.equal(state.whiteCanCastleShort, true);
    assert.equal(state.enPassant, null);
    assert.equal(state.whiteToMove, true);
    assert.equal(state.halfMoves, 0);
    assert.equal(state.moveNr, 1);
  });
});
