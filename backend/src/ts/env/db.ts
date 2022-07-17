import * as dotenv from "dotenv";
dotenv.config();

export const URL = process.env.MONGODB_URL;
export const DB_NAME = process.env.DB_NAME;
