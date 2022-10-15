import * as express from "express";
import { ObjectId } from "mongodb";
import { Group } from "../../../types/BackendTypes";
import { checkPerms } from "../config/get";
import { getCollection } from "../db/collections/groups";
import { isValidObjectId } from "../utils/mongo";

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
      const group: Group = {
        name: document["name"],
        color: document["color"],
        users: document["users"],
        position: document["position"],
      };

      if (!checkPerms("admin")) {
        group.users = undefined;
      }

      res.status(200).send(group);
    })
    .catch(() => {
      res.status(500).send({
        error:
          "There was a internal error trying to fetch your group. If this keeps happening, please contact the devs.",
        status: 500,
      });
    });
}

async function check(req: express.Request): Promise<string> {
  if (!("id" in req.query)) {
    return "Please provide a id in the query params";
  }

  if (req.query["id"] == "") {
    return "Please provide a id";
  }

  if (!isValidObjectId(req.query["id"].toString())) {
    return "Please provide a valid id";
  }

  return "";
}
