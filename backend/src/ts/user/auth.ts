import * as express from "express";
import { getCollection } from "../db/collections/users";
import { DISCORD_ID, DISCORD_SECRET, DISCORD_REDIRECT } from "../env/auth";
import { CLIENT_URL } from "../env/other";

import DiscordOauth2 = require("discord-oauth2");
import { authenticateResult } from "../../../types/BackendTypes";

const oauth = new DiscordOauth2({
  clientId: DISCORD_ID,
  clientSecret: DISCORD_SECRET,
  redirectUri: DISCORD_REDIRECT,
});

export async function auth(req: express.Request, res: express.Response) {
  function error() {
    return res.status(500).send({
      error:
        "There was a error trying to authenticate you. If this keeps happening, please contact the devs.",
      status: 500,
    });
  }

  const [user, token] = await authenticate(req);

  if (user == true || token == true) {
    return error();
  }

  const userScheme = {
    id: user["id"],
    name: user["username"],
    discriminator: user["discriminator"],
    token: token["access_token"],
  };

  if (await getCollection().findOne({ id: user["id"] })) {
    getCollection()
      .findOneAndReplace({ id: user["id"] }, userScheme)
      .catch(error);
  } else {
    getCollection().insertOne(userScheme).catch(error);
  }

  if (res.headersSent) return;

  res
    .status(304)
    .redirect(
      `${CLIENT_URL}auth?token=${token["access_token"]}&name=${user["username"]}`
    );
}

async function authenticate(req: express.Request): Promise<authenticateResult> {
  const code: any = req.query["code"];

  const token = await oauth
    .tokenRequest({
      code,
      scope: "identify",
      grantType: "authorization_code",
    })
    .catch(() => {
      return true;
    });

  if (token == true) {
    return [true, true];
  }

  const user = await oauth.getUser(token["access_token"]).catch(() => {
    return true;
  });

  return [user, token];
}
