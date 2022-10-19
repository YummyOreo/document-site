import { auth } from "../../store";
import { Group } from "../../types/FrontendTypes";
import * as apiUtils from "../utils";

const BASE = "/groups";

export async function getGroups(): Promise<any> {
  return await apiUtils.MakeRequest(
    "GET",
    `${apiUtils.api["url"]}${BASE}/getAll`,
    undefined,
    auth.token
  );
}

export async function makeGroup(group: Group): Promise<any> {
  return await apiUtils.MakeRequest(
    "POST",
    `${apiUtils.api["url"]}${BASE}/`,
    JSON.stringify({
      users: group.users == undefined ? [] : group.users,
    }),
    auth.token,
    {
      name: group.name,
      color: group.color,
      position: group.position.toString(),
    },
    "application/json"
  );
}