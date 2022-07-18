import { Request, Response } from "express";
import { client, connect } from "../db/db";

export async function hello(req: Request, res: Response) {
  await connect().then(async () => {
    setTimeout(() => {
      client.close();
    }, 1500);
    res.status(202).send({ hello: "ello" });
  });
}
