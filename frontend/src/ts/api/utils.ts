import { defaultConfig as config } from "../constants/config";

export const api = {
  url: config.devMode ? "http://localhost:9000/.netlify/functions/api" : "",
};

export async function MakeRequest(
  TYPE: string,
  URL: string,
  BODY?: any,
  AUTH?: string,
  PARAMS: { [name: string]: string } = {}
): Promise<any> {
  const param = new URLSearchParams(PARAMS);

  const headers: any = {
    "Content-Type": "text/plain",
    Accept: "application/json",
  };

  if (AUTH) {
    headers["Authorization"] = `Bearer ${AUTH}`;
  }

  const response = await fetch(`${URL}?${param.toString()}`, {
    method: TYPE,
    credentials: "same-origin",
    headers,
    body: BODY,
  });

  return await response.json();
}
