import * as express from "express";
import { auth, url } from "../user";

export const router = express.Router();

/*
  Makes a user
*/
router.get("/auth", auth /*, more funcs here*/);

/*
  Returns the url for discord auth
*/
router.get("/url", url);
