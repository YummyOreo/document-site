import * as express from "express";
import { ObjectId } from "mongodb";
import { getCollection } from "../db/collections/documents";

export async function get(req: express.Request, res: express.Response) {
  await check(req).then(async (error) => {
    if (error != "") {
      res.status(400).send({ error, status: 400 });
    }
  });

  if (res.headersSent) return;

  getCollection()
    .findOne({ _id: new ObjectId(req.query["id"].toString()) })
    .then((document) => {
      res.status(200).send({
        title: document["title"],
        body: document["body"],
      });
    })
    .catch(() => {
      res.status(500).send({
        error:
          "There was a internal error trying to fetch your document. If this keeps happening, please contact the devs.",
        status: 500,
      });
    });
}

async function check(req: express.Request): Promise<string> {
  if (!("id" in req.query)) {
    return "Plese provide a id in the query params";
  }

  if (req.query["id"] == "") {
    return "Plese provide a id";
  }

  if (!isValidObjectId(req.query["id"].toString())) {
    return "Plese provide a valid id";
  }

  return "";
}

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}
