import { vi, describe, expect, it } from "vitest";
import { store } from "../store";
import { openDB } from "idb";

describe("store", () => {
  it("should add a review", async () => {
    store.addReview("test");

    const db = await openDB("katsuyou", 1);

    expect(await db.getAll("reviews")).toEqual([
      { slug: "test", dueDate: expect.any(Date) },
    ]);
  });

  it("should get the next review", async () => {
    vi.setSystemTime(new Date("2021-01-10"));
    await store.addReview("first-review");

    vi.setSystemTime(new Date("2021-01-05"));
    await store.addReview("second-review");

    const review = await store.getNextReview();

    expect(review?.slug).toEqual("second-review");
  });
});
