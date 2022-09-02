import * as express from "express";
import { getCollection } from "../db/collections/users";

export async function isAuthed(
  req: express.Request,
  res: express.Response,
  next: any
) {
  if (
    !req.header("Authorization") ||
    !req.header("Authorization").startsWith("Bearer ")
  ) {
    return res
      .status(401)
      .send({ error: "Invalid Authorization methiod.", status: 401 });
  }

  const token = req.header("Authorization").replace("Bearer ", "");

  const user = await getCollection()
    .findOne({ token })
    .catch(() => {
      res.status(500).send({
        error:
          "There was a interal server error, please try again. If this keeps happening, please contact the devs.",
        status: 500,
      });
    });

  if (res.headersSent) return;

  if (!user) {
    return res
      .status(401)
      .send({ error: "Faild to authenticate.", status: 401 });
  }

  next();
}
