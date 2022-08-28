import * as express from "express";
import { getCollection } from "../db/collections/users";
import { ID, SECRET, REDIRECT } from "../env/auth";
import DiscordOauth2 = require("discord-oauth2");
import { CLIENT_URL } from "../env/other";

export async function make(req: express.Request, res: express.Response) {
  const oauth = new DiscordOauth2({
    clientId: ID,
    clientSecret: SECRET,
    redirectUri: REDIRECT,
  });

  const code: any = req.query["code"];

  const token = await oauth
    .tokenRequest({
      code,
      scope: "identify",
      grantType: "authorization_code",
    })
    .catch(console.log);

  const user = await oauth.getUser(token["access_token"]);

  if (await checkUser(user, token)) {
    return res
      .status(304)
      .redirect(`${CLIENT_URL}?token=${token["access_token"]}`);
  }

  updateUser(user, token, res);
}

async function checkUser(user, token): Promise<boolean> {
  if ((await getCollection().findOne({ id: user["id"] })) != null) {
    getCollection()
      .findOneAndReplace(
        { id: user["id"] },
        {
          id: user["id"],
          name: user["username"],
          discriminator: user["discriminator"],
          token: token["access_token"],
        }
      )
      .catch(console.log);

    return true;
  }
  return false;
}

async function updateUser(user, token, res) {
  getCollection()
    .insertOne({
      id: user["id"],
      name: user["username"],
      discriminator: user["discriminator"],
      token: token["access_token"],
    })
    .catch(console.log);

  return res
    .status(304)
    .redirect(`${CLIENT_URL}?token=${token["access_token"]}`);
}
