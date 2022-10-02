import { UserDefault } from "../../../types/BackendTypes";
import { getCollection } from "../db/collections/groups";

export class User implements UserDefault {
  token: string;
  name: string;
  id: string;
  discriminator: string;
  constructor(token: string, id: string, name: string, discriminator: string) {
    this.token = token;
    this.name = name;
    this.id = id;
    this.discriminator = discriminator;
  }
  getId(this) {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getToken() {
    return this.token;
  }

  getDiscriminator() {
    return this.discriminator;
  }

  async getGroups(): Promise<string[]> {
    const groupsIn: string[] = [];

    const allGroups = await getCollection().find({}).toArray();
    for (const i in allGroups) {
      const group = allGroups[i];
      const users = group.users;
      for (const b in users) {
        const id = users[b];
        if (id == currentUser.getId()) {
          groupsIn.push(group._id.toString());
        }
      }
    }
    return groupsIn;
  }
}

export function setCurrentUser(user: User) {
  currentUser = user;
}

export let currentUser = new User(undefined, undefined, undefined, undefined);
