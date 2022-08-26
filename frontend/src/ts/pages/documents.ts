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
  }

  async run() {
    super.run();
  }
}
