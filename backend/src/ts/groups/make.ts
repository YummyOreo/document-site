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

  const users = req.body["users"];
}

async function check(req: express.Request): Promise<string> {
  if (req.headers["content-type"] != "application/json") {
    return 'Please set the "content-type" header to "application/json"';
  }

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

  if (!req.body || req.body["users"] == undefined) {
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
