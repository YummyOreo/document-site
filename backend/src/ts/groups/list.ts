import * as express from "express";
import { checkPerms } from "../config/get";
import { getCollection } from "../db/collections/groups";

export async function getAll(_: any, res: express.Response) {
  const groups = await getCollection().find({}).toArray();

  res.status(202).send({ groups: filter(groups) });
}

function filter(groups: any[]) {
  if (checkPerms("admin")) {
    return groups;
  }

  const newGroups = [];

  for (const i in groups) {
    const group = groups[i];
    const newGroup = group;
    newGroup["users"] = undefined;
    newGroups.push(newGroup);
  }
  return newGroups;
}
