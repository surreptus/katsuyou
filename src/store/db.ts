import { DBSchema, openDB } from "idb";

interface StoreSchema extends DBSchema {
  reviews: {
    key: string;
    value: {
      slug: string;
      dueDate: Date;
    };
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
    const index = db.transaction("reviews").store.index("dueDate");

    for await (const cursor of index.iterate()) {
      const review = { ...cursor.value };
      return review;
    }
  }

  async function addReview(slug: string) {
    return await db.put("reviews", {
      slug,
      dueDate: new Date(),
    });
  }

  return { addReview, getNextReview };
}

export const store = await createStore();
