import * as express from "express";
import { isAuthed } from "../auth/check";
import { get, getAll, make } from "../groups";

export const router = express.Router();

/*
	 Makes a role
	
	 - Their id (from discord) has to be a ceritain id [out of a list]
	 - If their id is from the list then they can make the role

	 - name (under 40 chars)
	 - list of users (discord id, this auto includes them)
	 - Color (hex)
*/
router.post("/", isAuthed, /* check if they have id (see above) ,*/ make);

/*
	Gets a role by their id
	
	- they have to be authed and have a ceritain id (out of a list)
	
	- the id of the role (must be a valid doc id)

*/
router.get("/", isAuthed, /* check if they have id (see above) ,*/ get);

/*
	Gets all the groups
	
	- they have to be authed and have a ceritain id (out of a list)
*/
router.get(
  "/getAll",
  isAuthed,
  /* check if they have id (see above) ,*/ getAll
);
