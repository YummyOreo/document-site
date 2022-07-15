import { defaultConfig as config } from "../constants/config.js";

export const api = {
  url: config.devMode ? "http://localhost:9000/.netlify/functions/api" : "",
};

export async function GetRequest(
  BASE: string,
  url,
  data: { [name: string]: string } = {}
) {
  let parsedData = "?";

  for (const [key, value] of Object.entries(data)) {
    parsedData += `${key}=${value}&`;
  }

  parsedData = parsedData.slice(0, -1);

  const response = await fetch(`${api.url}${BASE}${url}${parsedData}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  console.log(response);
  return await response.json();
}
