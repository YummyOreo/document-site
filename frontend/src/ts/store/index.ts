import { DefaultAuth, User } from "../types/FrontendTypes";

export const store: any = {};
export const auth: DefaultAuth = {
  name: "",
  token: "",
  signedIn: false,
};

export const user: User = {
  name: undefined,
  id: undefined,
  discriminator: undefined,
  perms: undefined,
};
