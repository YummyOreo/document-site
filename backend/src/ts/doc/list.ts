import * as express from "express";
import { getCollection } from "../db/collections/documents";

export async function getAll(_: any, res: express.Response) {
  const documents = await getCollection().find({}).toArray();

  res.status(202).send({ documents });
}
