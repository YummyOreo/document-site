import { GetRequest } from "../api.js";

const BASE = "";

export default async function getHello(): Promise<any> {
  return await GetRequest(BASE, "/");
}
