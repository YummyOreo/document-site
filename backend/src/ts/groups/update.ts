import * as express from "express";
import { ObjectId } from "mongodb";
import { updateGroup } from "../../../types/BackendTypes";
import { currentUser } from "../auth/user";
import { getCollection } from "../db/collections/groups";

export async function update(req: express.Request, res: express.Response) {
  await check(req).then((error) => {
    if (error != "") {
      res.status(400).send({ error, status: 400 });
    }
  });

  // do this because we can't return in a func that we passed through
  // if we see that we have sent something then we know that there was a error
  if (res.headersSent) return;

  const updatedContent = await getUpdatedContent(req);

  const id = req.query["id"].toString();

  getCollection()
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedContent },
      { upsert: true }
    )
    .then(() => {
      res.status(200).send({ id });
    })
    .catch(() => {
      res.status(500).send({
        error:
          "There was a internal error trying to update your group. If this keeps happening, please contact the devs.",
        status: 500,
      });
    });
}

async function getUpdatedContent(req: express.Request): Promise<updateGroup> {
  const updatedContent: updateGroup = {};

  if (req.headers["content-type"] == "application/json") {
    if (req.body && req.body["users"]) {
      updatedContent["users"] = req.body["users"];
    }
  }

  if ("name" in req.query && req.query["name"].toString().length < 40) {
    updatedContent["name"] = req.query["name"].toString();
  }

  if ("color" in req.query) {
    updatedContent["color"] = req.query["color"].toString();
  }

  return updatedContent;
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

  if ("name" in req.query) {
    if (req.query["name"].toString().length > 40) {
      return `Your name is too long. Please reduce your name by: ${
        req.query["name"].toString().length - 40
      } characters`;
    }
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
