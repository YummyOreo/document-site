import * as express from "express";
import { auth } from "../user";

export const router = express.Router();

/*
  Makes a user
*/
router.get("/auth", auth /*, more funcs here*/);
