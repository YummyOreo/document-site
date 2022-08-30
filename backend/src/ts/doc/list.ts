import * as express from "express";
import { getCollection } from "../db/collections/documents";

export async function list(req: express.Request, res: express.Response) {
  await check(req).then(async (error) => {
    if (error != "") {
      res.status(400).send({ error, status: 400 });
    }
  });

  if (res.headersSent) return;

  const documents = await getCollection().find().toArray();

  res.status(202).send({ documents });
}

async function check(req: express.Request): Promise<string> {
  return "";
}
