import * as express from "express";
import { isAuthed } from "../auth/check";

import { make, get, getAll } from "../doc/";

export const router = express.Router();

/*
  Makes a document with the string provided:
  - max 20k char

  - max 40 char for title

  - uses Markdown
*/
router.post("/", isAuthed, make /*, more funcs here*/);

/*
  Gets the document by the id:
  Params:
    - ID: the id of the document you want to get
*/
router.get("/", isAuthed, get /*, more funcs here*/);

/*
  Gets the all documents
*/
router.get("/getAll", isAuthed, getAll);
