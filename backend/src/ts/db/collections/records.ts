import { Collection, Document } from "mongodb";
import { db } from "../db";

const COLLECTION_NAME = "records";

export function getCollection(): Collection<Document> {
  return db.collection(COLLECTION_NAME);
}
