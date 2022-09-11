export function changeUrl(url: string) {
  window.history.pushState(url, null, url);
}
