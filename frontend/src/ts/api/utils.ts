import { defaultConfig as config } from "../constants/config";

export const api = {
  url: config.devMode ? "http://localhost:9000/.netlify/functions/api" : "",
};

export async function MakeRequest(
  TYPE: string,
  URL: string,
  BODY: string = "",
  PARAMS: { [name: string]: string } = {},
  HEADERS: { [name: string]: string } = {}
): Promise<any> {
  const param = new URLSearchParams(PARAMS);

  const headers = Object.assign(
    {},
    {
      "Content-Type": "text/plain",
      Accept: "application/json",
    },
    HEADERS
  );

  const response = await fetch(`${URL}?${param.toString()}`, {
    method: TYPE,
    credentials: "same-origin",
    headers,
    body: BODY,
  });

  return await response.json();
}
