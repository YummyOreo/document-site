import Page from "../types/classes";

export default class ErrorPage extends Page {
  name: string;
  url: string[];
  html: string;
  css: string;
  discordAuth: boolean;
  constructor() {
    super();
    this.name = "Error";
    this.url = [""];
    this.html = "error.html";
  }

  async run() {
    console.log("ERROR");
  }
}
