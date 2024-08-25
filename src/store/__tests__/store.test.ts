import { describe, expect, it } from "vitest";
import { initializeStore, store } from "..";

describe("store", async () => {
  await initializeStore();
  it("should have the child stores", () => {
    expect(store.reviews).toBeDefined();
  });
});
