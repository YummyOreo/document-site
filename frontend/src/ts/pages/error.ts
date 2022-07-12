import Page from "../types/classes";

export default class ErrorPage extends Page {
  name: string;
  url: string[];
  html: string;
  css: string;
  constructor() {
    super();
    this.name = "Error";
    this.url = [""];
    this.html = "error.html";
    this.css = "";
  }

  async run() {
    console.log("ERROR");
  }
}
