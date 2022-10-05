import * as express from "express";
import { isAuthed } from "../auth/check";
import { auth, get, url } from "../user";

export const router = express.Router();

/*
  Gets the user's perms, group, and info
*/

router.get("/", isAuthed, get);

/*
  Makes a user
*/
router.get("/auth", auth /*, more funcs here*/);

/*
  Returns the url for discord auth
*/
router.get("/url", url);
