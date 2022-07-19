import { Request, Response } from "express";
import { getDocuments } from "../dal/example";

export async function getExample(req: Request, res: Response) {
  console.log(await Promise.resolve(getDocuments()));

  res.status(202).send({ hello: "ello" });
}
