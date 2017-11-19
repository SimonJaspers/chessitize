import { World } from "./../src/World";
import assert from "assert";

describe("World", () => {
  it("should return a string", () => {
    assert.equal(typeof World, "string");
  });

  it("should return World", () => {
    assert.equal(World, "World");
  });

  it("should start with a capital letter", () => {
    assert.equal(World[0], World[0].toUpperCase());
  });
});
