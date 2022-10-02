import { UserDefault } from "../../../types/BackendTypes";

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

  getGroups() {}
}

export function setCurrentUser(user: User) {
  currentUser = user;
}

export let currentUser = new User(undefined, undefined, undefined, undefined);
