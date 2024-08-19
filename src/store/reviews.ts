import { IDBPDatabase } from "idb";

import { StoreSchema } from ".";
import { Review } from "../types";

export function createReviewsStore(db: IDBPDatabase<StoreSchema>) {
  async function findNextDue() {
    const range = IDBKeyRange.upperBound(new Date(), true);
    const index = await db
      .transaction("reviews", "readonly")
      .store.index("dueDate");

    const cursor = await index.openCursor(range, "next");

    while (cursor) {
      return cursor.value;
    }
  }

  async function get(slug: string) {
    return await db.get("reviews", slug);
  }

  async function list() {
    return await db.getAll("reviews");
  }

  async function create(review: Review) {
    return await db.add("reviews", review);
  }

  async function update(review: Review) {
    return await db.put("reviews", review);
  }

  return { create, get, list, update, findNextDue };
}
