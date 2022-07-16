import * as dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";
dotenv.config();

const URL = process.env.MONGODB_URL;
const DB_NAME = process.env.DB_NAME;

export const client = new MongoClient(URL);
export let db: Db;

export async function connect() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  db = client.db(DB_NAME);

  // the following code examples can be pasted here...

  return "done.";
}
