import DiscordOauth2 = require("discord-oauth2");
import { ObjectId } from "mongodb";

export interface RateLimit {
  max: number;
  message?: string;
}

export interface UserDefault {
  token: string;
  name: string;
  id: string;
  discriminator: string;
}

export interface Group {
  name: string;
  color: string;
  users: string[];
}

export interface GroupWithId {
  _id: string | ObjectId;
  name: string;
  color: string;
  users: string[];
}

export interface Doc {
  title: string;
  body: string;
}

export interface DocWithId {
  _id: string | ObjectId;
  title: string;
  body: string;
}

export type updateGroup = { [name: string]: string | string[] | any };

export type authenticateResult = Array<
  boolean | DiscordOauth2.User | DiscordOauth2.TokenRequestResult
>;

export interface Config {
  admin: string[];
}
