import * as express from "express";
import { currentUser } from "../auth/user";
import { checkPerms } from "../config/get";

export async function get(_: express.Request, res: express.Response) {
  const admin = checkPerms("admin");

  const groups = await currentUser.getGroups();

  const perms = {};

  if (admin) {
    perms["admin"] = true;
  }

  perms["groups"] = groups;

  res
    .status(202)
    .send({
      perms,
      name: currentUser.getName(),
      id: currentUser.getId(),
      discriminator: currentUser.getDiscriminator(),
    });
}
