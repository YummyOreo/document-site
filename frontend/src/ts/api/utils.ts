import { defaultConfig as config } from "../constants/config";

export const api = {
  url: config.devMode ? "http://localhost:9000/.netlify/functions/api" : "",
};

export async function MakeRequest(
  TYPE: string,
  URL: string,
  BODY: any = undefined,
  PARAMS: { [name: string]: string } = {},
  HEADERS: { [name: string]: string } = {},
  BODY_TYPE: string = "text/plain"
): Promise<any> {
  const param = new URLSearchParams(PARAMS);

  const headers = Object.assign(
    {},
    {
      "Content-Type": BODY_TYPE,
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
