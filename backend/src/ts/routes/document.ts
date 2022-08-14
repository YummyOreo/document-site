import * as express from "express";
import { getCollection } from "../db/collections/records";

export const router = express.Router();

/*
  Makes a document with the string provided:
  - max 20k char

  - uses Markdown
*/
router.post("/", async (req: express.Request, res: express.Response) => {
  if (req.headers["content-type"] != "text/plain") {
    return res
      .status(400)
      .send('Please set the "content-type" header to "text/plain"');
  }

  if (!("title" in req.query)) {
    return res.status(400).send("Plese provide a title in the query params");
  }

  if (req.body == "") {
    return res.status(400).send("Please provide a body");
  }

  const title = req.query["title"];

  const body = req.body;

  if ((await getCollection().find({ title }).toArray()).length > 0) {
    return res.status(400).send("A document with that title already exists");
  }

  if (body.length > 20000) {
    return res
      .status(400)
      .send(
        `Your document is too long. Please reduce your document by: ${
          body.length - 20000
        } characters`
      );
  }

  const record = await getCollection()
    .insertOne({
      title,
      body,
    })
    .catch(() => {
      res
        .status(500)
        .send(
          "There was a internal error trying to make your document, please report this to the developers"
        );
    });

  if (!record) return;

  res.status(200).send({
    id: record.insertedId.toString(),
  });
});
