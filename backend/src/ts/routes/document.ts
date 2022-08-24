import * as express from "express";

import { make, get } from "../doc/";

export const router = express.Router();

/*
  Makes a document with the string provided:
  - max 20k char

  - uses Markdown
*/
router.post("/", make /*, more funcs here*/);
router.get("/", get /*, more funcs here*/);
