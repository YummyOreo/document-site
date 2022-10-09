import { auth } from "../../store";
import * as apiUtils from "../utils";

const BASE = "/user";

export async function getUserInfo() {
  return await apiUtils.MakeRequest(
    "GET",
    `${apiUtils.api["url"]}${BASE}`,
    undefined,
    auth.token
  );
}
