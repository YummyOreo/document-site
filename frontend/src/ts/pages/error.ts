import Page from "../types/classes.js";

export default class ErrorPage extends Page {
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
