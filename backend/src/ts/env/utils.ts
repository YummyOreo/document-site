import * as dotenv from "dotenv";
dotenv.config();

export function getEnv(name: string): string {
  const envVar = process.env[name];
  if (envVar == "") {
    return "";
  }
  return envVar;
}
