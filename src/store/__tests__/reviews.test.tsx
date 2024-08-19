import { vi, describe, expect, it } from "vitest";
import { Inflection } from "@surreptus/japanese-conjugator";
import { Level } from "../../types";
import { createStore } from "..";

describe("store", () => {
  it("should add a review", async () => {
    const store = await createStore();

    store.reviews.create({
      slug: "test",
      dueDate: new Date("2021-02-01"),
      prompt: Inflection.Passive,
      level: Level.Beginner,
    });

    expect(await store.reviews.get("test")).toEqual({
      slug: "test",
      dueDate: expect.any(Date),
      prompt: Inflection.Passive,
      level: Level.Beginner,
    });

    store.db.close();
  });

  it("should get the next review", async () => {
    const store = await createStore();

    vi.setSystemTime(new Date("2021-01-10"));
    const review = {
      slug: "test",
      prompt: Inflection.Passive,
      level: Level.Beginner,
      dueDate: new Date(),
    };

    await store.reviews.create({
      ...review,
      slug: "first-review",
      dueDate: new Date("2021-01-10"),
    });

    await store.reviews.create({
      ...review,
      slug: "second-review",
      dueDate: new Date("2021-01-05"),
    });

    const result = await store.reviews.findNextDue();

    expect(result?.slug).toEqual("second-review");

    store.db.close();
  });
});
