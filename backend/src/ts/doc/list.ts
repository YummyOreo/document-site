import * as express from "express";
import { ObjectId } from "mongodb";
import { getCollection } from "../db/collections/documents";

export async function list(req: express.Request, res: express.Response) {
  await check(req).then(async (error) => {
    if (error != "") {
      res.status(400).send({ error });
    }
  });

  if (res.headersSent) return;

  const documents = await getCollection().find().toArray();

  res.status(202).send({ documents });
}

async function check(req: express.Request): Promise<string> {
  return "";
}
