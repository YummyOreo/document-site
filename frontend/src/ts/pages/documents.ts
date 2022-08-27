import { PageDefault } from "../types/classes";

export const urls = ["/documents*"];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  constructor() {
    super();
    this.name = "Documents";
    this.url = urls;
    this.html = "documents.html";
    this.css = ["docs.css"];
  }

  async run() {
    super.run();

    $(".sort button").on("click", (e) => {
      $(".clicked").removeClass("clicked");

      e.target.classList.add("clicked");
    });
  }
}
