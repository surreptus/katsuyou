import { DBSchema, IDBPDatabase, openDB } from "idb";
import { Review } from "../types";
import { createReviewsStore } from "./reviews";

export interface StoreSchema extends DBSchema {
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

/**
 * the main entry point for creating the data store for the application. we use idb,
 * then initialize each of the object store abstractions using it. at the end of this
 * file we export a singleton of the store to use around the application.
 *
 * @returns a set of stores for each of the entity types in the database
 */
export async function createStore() {
  const db = await openDB<StoreSchema>("katsuyou", 1, {
    upgrade(db) {
      const reviews = db.createObjectStore("reviews", { keyPath: "slug" });
      reviews.createIndex("dueDate", "dueDate");
    },
  });

  return {
    db,
    reviews: createReviewsStore(db),
  };
}

export let store: {
  db: IDBPDatabase<StoreSchema>;
  reviews: ReturnType<typeof createReviewsStore>;
};

export async function initializeStore() {
  console.log("initializing store");
  if (!store) store = await createStore();
}
