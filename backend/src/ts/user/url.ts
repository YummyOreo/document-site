import * as express from "express";
import { DISCORD_URL } from "../env/auth";

export async function url(req: express.Request, res: express.Response) {
  await check(req).then(async (error) => {
    if (error != "") {
      res.status(400).send({ error, status: 400 });
    }
  });

  if (res.headersSent) return;

  res.status(202).send({ url: DISCORD_URL });
}

async function check(req: express.Request): Promise<string> {
  return "";
}
