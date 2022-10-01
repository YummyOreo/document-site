import * as express from "express";
import { isAuthed } from "../auth/check";
import { make } from "../groups";

export const router = express.Router();

/*
	 Makes a role
	
	 - Their id (from discord) has to be a ceritain id [out of a list], (need to implement late)
	 - If their id is from the list then they can make the role

	 - name (under 40 chars)
	 - list of users (discord id, this auto includes them)
	 - Color (hex)
*/
router.post("/", isAuthed, /* check if they have id (see above) ,*/ make);
