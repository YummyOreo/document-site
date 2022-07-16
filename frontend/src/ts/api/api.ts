import { defaultConfig as config } from "../constants/config.js";
import * as apiUtils from "./utils.js";

export const api = {
  url: config.devMode ? "http://localhost:9000/.netlify/functions/api" : "",
};

export async function GetRequest(
  BASE: string,
  url: string,
  data: { [name: string]: string } = {}
): Promise<any> {
  let parsedData = "?";

  Object.keys(data).forEach((key) => {
    parsedData += `${key}=${data[key]}&`;
  });

  parsedData = parsedData.slice(0, -1);

  if (api.url == "") {
    console.log("No URL found");
  }

  // make the url
  const URL = `${api.url}${BASE}${url}${parsedData}`;

  return await apiUtils.MakeRequest("GET", URL, "");
}

export async function PostRequest(
  BASE: string,
  url: string,
  data: { [name: string]: string } = {}
): Promise<any> {
  if (api.url == "") {
    console.log("No URL found");
  }

  const URL = `${api.url}${BASE}${url}`;

  return await apiUtils.MakeRequest("POST", URL, JSON.stringify(data));
}

export async function PutRequest(
  BASE: string,
  url: string,
  data: { [name: string]: string } = {}
): Promise<any> {
  if (api.url == "") {
    console.log("No URL found");
  }

  const URL = `${api.url}${BASE}${url}`;

  return await apiUtils.MakeRequest("PUT", URL, JSON.stringify(data));
}

export async function PatchRequest(
  BASE: string,
  url: string,
  data: { [name: string]: string } = {}
): Promise<any> {
  if (api.url == "") {
    console.log("No URL found");
  }

  const URL = `${api.url}${BASE}${url}`;

  return await apiUtils.MakeRequest("PATCH", URL, JSON.stringify(data));
}

export async function DeleteRequest(
  BASE: string,
  url: string,
  data: { [name: string]: string } = {}
): Promise<any> {
  if (api.url == "") {
    console.log("No URL found");
  }

  const URL = `${api.url}${BASE}${url}`;

  return await apiUtils.MakeRequest("DELETE", URL, JSON.stringify(data));
}
