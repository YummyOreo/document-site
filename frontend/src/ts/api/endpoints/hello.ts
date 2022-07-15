import { GetRequest } from "../api.js";

const BASE = "";

export default async function getHello() {
  return await GetRequest(BASE, "/");
}
