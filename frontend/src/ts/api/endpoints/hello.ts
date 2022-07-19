import { GetRequest } from "../api.js";

const BASE = "/example";

export default async function getHello(): Promise<any> {
  return await GetRequest(BASE, "/");
}
