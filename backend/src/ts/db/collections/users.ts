import { Collection, Document } from "mongodb";
import { db } from "../db";

export function getCollection(): Collection<Document> {
  return db.collection("users");
}
