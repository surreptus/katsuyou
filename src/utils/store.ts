import { DBSchema, openDB } from "idb";
import { Level, Review } from "../types";

interface StoreSchema extends DBSchema {
  preferences: {
    key: string;
    value: string;
  };
  reviews: {
    key: string;
    value: Review;
    indexes: { dueDate: Date };
  };
}

async function createStore() {
  const db = await openDB<StoreSchema>("katsuyou", 1, {
    upgrade(db) {
      const store = db.createObjectStore("reviews", { keyPath: "slug" });
      store.createIndex("dueDate", "dueDate");
    },
  });

  async function getNextReview() {
    const index = db.transaction("reviews", "readonly").store.index("dueDate");

    for await (const cursor of index.iterate(new Date())) {
      const review = { ...cursor.value };
      return review;
    }
  }

  async function listAllReviews() {
    return await db.getAll("reviews");
  }

  async function addReview(slug: string) {
    return await db.put("reviews", {
      slug,
      level: Level.Beginner,
      dueDate: new Date(),
    });
  }

  return { addReview, getNextReview, listAllReviews };
}

export const store = await createStore();
