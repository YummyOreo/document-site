import * as express from "express";

export const router = express.Router();

/*
  Makes a document with the string provided:
  - max 10k char

  - uses Markdown
*/
router.post("/", async (req: express.Request, res: express.Response) => {
  res.status(200).send("Document made: " + req.body);
});
