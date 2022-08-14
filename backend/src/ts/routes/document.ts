import * as express from "express";
import { ObjectId } from "mongodb";
import { getCollection } from "../db/collections/records";

export const router = express.Router();

/*
  Makes a document with the string provided:
  - max 10k char

  - uses Markdown
*/
router.post("/", async (req: express.Request, res: express.Response) => {
  if (req.headers["content-type"] != "text/plain") {
    res
      .status(400)
      .send('Please set the "content-type" header to "text/plain"');
    return;
  }

  if (!("title" in req.query)) {
    res.status(400).send("Plese provide a title in the query params");
    return;
  }

  if (req.body == "") {
    res.status(400).send("Please provide a body");
    return;
  }

  const title = req.query["title"];

  const body = req.body;

  if ((await getCollection().find({ title }).toArray()).length > 0) {
    res.status(400).send("A document with that title already exists");
    return;
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
