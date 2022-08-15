import * as apiUtils from "../utils";

const BASE = "/doc";

export default async function makeDoc(body: string, title: string) {
  return await apiUtils.MakeRequest(
    "POST",
    `${apiUtils.api["url"]}${BASE}`,
    body,
    { title }
  );
}
