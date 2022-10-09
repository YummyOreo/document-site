import { getUserInfo } from "../api/endpoints/user";
import { auth, user } from "../store";

export async function getUserInformation() {
  if (auth.signedIn) {
    const userInfo = await getUserInfo();

    if (!userInfo["error"]) {
      user.discriminator = userInfo["discriminator"];
      user.id = userInfo["id"];
      user.name = userInfo["name"];
      user.perms = userInfo["perms"];
    }
  }
}
