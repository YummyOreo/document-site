import { Config } from "../../../types/BackendTypes";
import { getCollection } from "../db/collections/config";

export let config: Config = {
  admin: [],
};

export async function loadConfig() {
  const currentConfig: any = await getCollection().find().toArray();

  if (currentConfig == undefined || currentConfig.length <= 0) {
    return createConfig();
  }

  config = currentConfig[0];
}

export function createConfig() {
  getCollection().insertOne(config);
}
