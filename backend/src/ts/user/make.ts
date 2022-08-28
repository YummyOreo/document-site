import * as express from "express";
import { getCollection } from "../db/collections/users";
import { ID, SECRET, REDIRECT } from "../env/auth";
import { CLIENT_URL } from "../env/other";

import DiscordOauth2 = require("discord-oauth2");

export async function make(req: express.Request, res: express.Response) {
  const [user, token] = await Oauth(req);

  const userScheme = {
    id: user["id"],
    name: user["username"],
    discriminator: user["discriminator"],
    token: token["access_token"],
  };

  if ((await getCollection().findOne({ id: user["id"] })) != null) {
    getCollection().findOneAndReplace({ id: user["id"] }, userScheme);
  } else {
    getCollection().insertOne(userScheme);
  }

  res.status(304).redirect(`${CLIENT_URL}?token=${token["access_token"]}`);
}

async function Oauth(req) {
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

  return [await oauth.getUser(token["access_token"]), token];
}
