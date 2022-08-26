import { PageDefault } from "../types/classes";

export default class ErrorPage extends PageDefault {
  name: string;
  html: string;
  css: string[];
  discordAuth: boolean;
  constructor() {
    super();
    this.name = "Error";
    this.html = "error.html";
  }

  async run() {}
}
