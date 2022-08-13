import { PageDefault } from "../types/classes";

export default class ErrorPage extends PageDefault {
  name: string;
  html: string;
  css: string[];
  discordAuth: boolean;
  defaultComponents: string[];
  constructor() {
    super();
    this.name = "Error";
    this.html = "error.html";
    this.defaultComponents = ["navbar", "footer"];
  }

  async run() {}
}
