import { Db, MongoClient } from "mongodb";
import { URL, DB_NAME } from "../env/db";

export const client = new MongoClient(URL);
export let db: Db = client.db(DB_NAME);
