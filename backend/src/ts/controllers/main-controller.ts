import { Request, Response } from "express";

export async function hello(req: Request, res: any) {
  res.status(202).send({ hello: "ello" });
}
