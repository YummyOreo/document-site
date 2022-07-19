import { Document, WithId } from "mongodb";
import { getCollection } from "../db/collections/records";

export async function getDocuments(): Promise<WithId<Document>[]> {
  return getCollection().find({}).toArray();
}
