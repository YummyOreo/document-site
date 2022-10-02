import * as express from "express";
import { getCollection } from "../db/collections/roles";

export async function getAll(_: any, res: express.Response) {
  const groups = await getCollection().find({}).toArray();

  res.status(202).send({ groups });
}
