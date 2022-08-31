import { Db, MongoClient } from "mongodb";
import { DB_URL, DB_NAME } from "../env/db";

export const client = new MongoClient(DB_URL);
export let db: Db = client.db(DB_NAME);
