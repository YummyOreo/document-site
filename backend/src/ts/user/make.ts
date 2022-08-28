import * as express from "express";

export async function make(req: express.Request, res: express.Response) {
  console.log(req.query["code"]);
  res.status(200).send({ code: "Success" });
}
