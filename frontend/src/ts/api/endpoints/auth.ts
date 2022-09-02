import * as apiUtils from "../utils";

const BASE = "/user";

export async function getUrl(): Promise<any> {
  return await apiUtils.MakeRequest("GET", `${apiUtils.api["url"]}${BASE}/url`);
}
