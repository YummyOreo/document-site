import { Collection, Document } from "mongodb";
import { db } from "../db";

// Records are documents

const COLLECTION_NAME = "records";

export function getCollection(): Collection<Document> {
  return db.collection(COLLECTION_NAME);
}
