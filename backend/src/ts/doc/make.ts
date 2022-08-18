import * as express from "express";
import { getCollection } from "../db/collections/documents";

export async function make(req: express.Request, res: express.Response) {
  check(req).then((error) => {
    if (error != "") {
      res.status(400).send({ error });
    }
  });

  let title: any,
    body = [req.query["title"], req.body];

  const record = await getCollection()
    .insertOne({
      title,
      body,
    })
    .catch(() => {
      res.status(500).send({
        error:
          "There was a internal error trying to make your document, please report this to the developers",
      });
    });

  if (!record) return;

  res.headersSent
    ? undefined
    : res.status(200).send({
        id: record.insertedId.toString(),
      });
}

async function check(req: express.Request): Promise<string> {
  if (req.headers["content-type"] != "text/plain") {
    return 'Please set the "content-type" header to "text/plain"';
  }

  if (!("title" in req.query)) {
    return "Plese provide a title in the query params";
  }

  if (req.query["title"] == "") {
    return "Plese provide a title";
  }

  if (req.body == "") {
    return "Please provide a body";
  }

  if (
    (await getCollection().find({ title: req.query["title"] }).toArray())
      .length > 0
  ) {
    return "A document with that title already exists";
  }

  if (req.body.length > 20000) {
    return `Your document is too long. Please reduce your document by: ${
      req.body.length - 20000
    } characters`;
  }

  return "";
}
