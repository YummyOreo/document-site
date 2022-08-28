import * as express from "express";
import { make } from "../user";

export const router = express.Router();

/*
  Makes a user
*/
router.get("/make", make /*, more funcs here*/);
