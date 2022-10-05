import { currentUser } from "../auth/user";
import { config } from "./load";

export function checkPerms(perm: string): boolean {
  if (perm in config == false) {
    return false;
  }

  if (config[perm].includes(currentUser.getId())) {
    return true;
  }

  return false;
}

export function getPerms() {}
