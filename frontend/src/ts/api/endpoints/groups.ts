import { auth } from "../../store";
import * as apiUtils from "../utils";

const BASE = "/groups";

export async function getGroups() {
  return await apiUtils.MakeRequest(
    "GET",
    `${apiUtils.api["url"]}${BASE}/getAll`,
    undefined,
    auth.token
  );
}
