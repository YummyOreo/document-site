import { GetRequest } from "../api";

const BASE = "/example";

export default async function getHello(): Promise<any> {
  return await GetRequest(BASE, "/");
}
