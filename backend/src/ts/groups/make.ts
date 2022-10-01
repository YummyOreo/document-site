import * as express from "express";
import { getCollection } from "../db/collections/roles";

export async function make(req: express.Request, res: express.Response) {
  await check(req).then((error) => {
    if (error != "") {
      res.status(400).send({ error, status: 400 });
    }
  });

  // do this because we can't return in a func that we passed through
  // if we see that we have sent something then we know that there was a error
  if (res.headersSent) return;

  const users = JSON.parse(req.body)["users"];
  if (users == null || users == undefined) {
    return res.status(400).send({
      error: "Please provide a body containing the users",
      status: 400,
    });
  }
}

async function check(req: express.Request): Promise<string> {
  if (!("name" in req.query)) {
    return "Plese provide a name in the query params";
  }

  if (req.query["title"] == "") {
    return "Plese provide a name";
  }

  if (!("color" in req.query)) {
    return "Plese provide a color in the query params";
  }

  if (req.query["color"] == "") {
    return "Plese provide a color";
  }

  if (!req.body || req.body == "") {
    return "Plese provide a body with the user's id";
  }

  if (
    (await getCollection().find({ name: req.query["name"] }).toArray()).length >
    0
  ) {
    return "A role with that name already exists";
  }

  if (req.query["name"].toString().length > 40) {
    return `Your name is too long. Please reduce your name by: ${
      req.query["name"].toString().length - 40
    } characters`;
  }

  return "";
}
