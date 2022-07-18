import { Request, Response } from "express";
import { getCollection } from "../db/collections/records";
import { client, connect } from "../db/db";

export async function hello(req: Request, res: Response) {
  console.log("hello");

  await connect().then(() => {
    console.log("test");

    getCollection().insertOne({ a: 1 });
    getCollection().find({}).toArray();

    console.log(getCollection());

    setTimeout(() => {
      client.close();
    }, 1500);
    res.status(202).send({ hello: "ello" });
  });
}
