import { Config } from "../../../types/BackendTypes";
import { checkGroup } from "../auth/check";
import { getCollection } from "../db/collections/config";

export let config: Config = {
  admin: [],
};

export async function loadConfig() {
  const currentConfig: any = await getCollection().find({}).toArray();

  console.log(await checkGroup("6339c1d7aecb12d87a8302c9"));

  if (currentConfig == undefined || currentConfig.length <= 0) {
    return createConfig();
  }

  config = currentConfig[0];
}

export function createConfig() {
  getCollection().insertOne(config);
}
