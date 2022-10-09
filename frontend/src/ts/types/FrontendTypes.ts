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

export interface Doc {
  title: string;
  body: string;
  author: {
    name: string;
    id: string;
  };
}
