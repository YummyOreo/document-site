import * as express from "express";
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

  await getCollection().insertOne({
    title: req.query["title"],
    body: req.body,
  });

  res.status(200).send("Document made: " + req.body);
});
