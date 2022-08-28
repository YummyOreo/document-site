import * as apiUtils from "../utils";

const BASE = "/doc";

export async function makeDoc(body: string, title: string): Promise<any> {
  return await apiUtils.MakeRequest(
    "POST",
    `${apiUtils.api["url"]}${BASE}`,
    body,
    { title }
  );
}

export async function getDoc(id: string): Promise<any> {
  return await apiUtils.MakeRequest(
    "GET",
    `${apiUtils.api["url"]}${BASE}`,
    undefined,
    { id }
  );
}

export async function getDocs(): Promise<any> {
  return await apiUtils.MakeRequest(
    "GET",
    `${apiUtils.api["url"]}${BASE}/list`
  );
}
