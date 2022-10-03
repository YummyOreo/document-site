import * as express from "express";
import { DISCORD_URL } from "../env/auth";

export async function url(_: express.Request, res: express.Response) {
  res.status(202).send({ url: DISCORD_URL });
}
