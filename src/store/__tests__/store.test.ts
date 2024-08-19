import { describe, expect, it } from "vitest";
import { store } from "..";

describe("store", () => {
  it("should have the child stores", () => {
    expect(store.reviews).toBeDefined();
  });
});
