export interface DefaultAuth {
  name: string;
  token: string;
  signedIn: boolean;
}

export interface User {
  name: string;
  discriminator: string;
  id: string;
  perms: { [name: string]: any };
}
