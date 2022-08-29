import { PageDefault } from "../types/classes";

export const urls = ["/auth"];

export class Page extends PageDefault {
  name: string;
  html: string;
  css: string[];
  discordAuth: boolean;
  constructor() {
    super();
    this.name = "Authenticating";
    this.html = "auth.html";
    this.url = urls;
  }

  async run() {
    const urlParams = new URLSearchParams(window.location.search);

    const token = urlParams.get("token");
    const name = urlParams.get("name");

    localStorage.clear();
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    setTimeout(() => {
      $("h1").html("Redirecting...");
    }, 500);

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }
}
