import { PageDefault } from "../types/classes";

export const urls = ["/settings/*", "/settings"];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  constructor() {
    super();
    this.name = "Settings";
    this.url = urls;
    this.html = "settings.html";
    this.css = ["settings.css"];
  }

  async run() {
    super.run();
    const setting = window.location.pathname
      .replace("/settings/", "")
      .replace("/settings", "");
    console.log(setting);
  }
}
