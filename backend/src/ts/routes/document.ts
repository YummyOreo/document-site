import * as express from "express";

import { make } from "../doc/";

export const router = express.Router();

/*
  Makes a document with the string provided:
  - max 20k char

  - uses Markdown
*/
router.post("/", async (req: express.Request, res: express.Response) => {
  await make(req, res);
});
