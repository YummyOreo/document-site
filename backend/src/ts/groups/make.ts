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

  const group = { name: req.query["name"], color: req.query["color"], users };

  getCollection()
    .insertOne(group)
    .then((document) => {
      res.status(201).send({
        id: document.insertedId.toString(),
      });
    })
    .catch(() => {
      res.status(500).send({
        error:
          "There was a internal error trying to create your group. If this keeps happening, please contact the devs.",
        status: 500,
      });
    });
}

async function check(req: express.Request): Promise<string> {
  if (req.headers["content-type"] != "application/json") {
    return 'Please set the "content-type" header to "application/json"';
  }

  if (!("name" in req.query)) {
    return "Plese provide a name in the query params";
  }

  if (req.query["name"] == "") {
    return "Plese provide a name";
  }

  if (!("color" in req.query)) {
    return "Plese provide a color in the query params";
  }

  if (req.query["color"] == "") {
    return "Plese provide a color";
  }

  if (!req.body || req.body["users"] == undefined) {
    return "Plese provide a body with a list of the users";
  }

  if (req.query["name"].toString().length > 40) {
    return `Your name is too long. Please reduce your name by: ${
      req.query["name"].toString().length - 40
    } characters`;
  }

  return "";
}
