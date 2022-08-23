import { PageDefault } from "../types/classes";

export const urls = ["/make"];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  defaultComponents: string[];

  title: string;
  body: string;
  roles: string[];
  constructor() {
    super();
    this.name = "Make Document";
    this.url = urls;
    this.html = "make.html";
    this.defaultComponents = ["navbar", "footer"];
    this.css = ["make.css"];

    this.title = "";
    this.body = "";
    this.roles = [];
  }

  async run() {
    super.run();

    $("#body").on("blur", (e) => {
      const target: HTMLTextAreaElement | any = e.target;
      this.body = target.value;
    });
  }
}
