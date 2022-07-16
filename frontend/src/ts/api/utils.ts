export async function MakeRequest(
  TYPE: string,
  URL: string,
  BODY: string = ""
): Promise<any> {
  const response = await fetch(URL, {
    method: TYPE,
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: BODY == "" ? undefined : BODY,
  });
  return await response.json();
}
