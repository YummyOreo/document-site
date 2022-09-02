import { getEnv } from "./utils";

export const DB_NAME: string = getEnv("DB_NAME");
export const DB_URL: string = getEnv("MONGODB_URL");
