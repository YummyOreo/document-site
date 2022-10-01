import { defaultConfig as config } from "../constants/config";

export const api = {
  url: config.devMode ? "http://localhost:9000/.netlify/functions/api" : "",
};

export async function MakeRequest(
  TYPE: string,
  URL: string,
  BODY?: any,
  AUTH?: string,
  PARAMS: { [name: string]: string } = {},
  CONTENT_TYPE: string = "tex/plain"
): Promise<any> {
  const param = new URLSearchParams(PARAMS);

  const headers: any = {
    "Content-Type": CONTENT_TYPE,
    Accept: "application/json",
  };

  if (AUTH) {
    headers["Authorization"] = `Bearer ${AUTH}`;
  }

  if (param) {
    URL = `${URL}?${param.toString()}`;
  }

  const response = await fetch(URL, {
    method: TYPE,
    credentials: "same-origin",
    headers,
    body: BODY,
  });

  return await response.json();
}
