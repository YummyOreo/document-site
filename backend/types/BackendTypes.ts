export interface RateLimit {
  max: number;
  message?: string;
}

export interface UserDefault {
  token: string;
  name: string;
  id: string;
  discriminator: string;
}

export type updateGroup = { [name: string]: string | string[] | any };
