import { PageDefault } from "../types/classes";

export const urls = ["/search"];

export class Page extends PageDefault {
  name: string;
  html: string;
  css: string[];
  discordAuth: boolean;
  constructor() {
    super();
    this.name = "Search";
    this.html = "search.html";
    this.url = urls;
  }

  async run() {
    const urlParams = new URLSearchParams(window.location.search);

    const query = urlParams.get("q");
    console.log(query);
  }
}
