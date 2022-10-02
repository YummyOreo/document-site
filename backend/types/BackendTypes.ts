export interface RateLimit {
  max: number;
  message?: string;
}

export type updateGroup = { [name: string]: string | [string] };
