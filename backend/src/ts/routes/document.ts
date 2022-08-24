import * as express from "express";

import { make, get } from "../doc/";

export const router = express.Router();

/*
  Makes a document with the string provided:
  - max 20k char

  - uses Markdown
*/
router.post("/", make /*, more funcs here*/);

/*
  Gets the document by the id:
  Params:
    - ID: the id of the document you want to get
*/
router.get("/", get /*, more funcs here*/);
