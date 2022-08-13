import * as dotenv from "dotenv";
dotenv.config();

export const URL: string = process.env.MONGODB_URL
  ? process.env.MONGODB_URL
  : "";
export const DB_NAME: string = process.env.DB_NAME ? process.env.DB_NAME : "";
