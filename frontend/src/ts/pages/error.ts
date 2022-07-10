export default class ErrorPage {
  name: string;
  url: string[];
  html: string;
  css: string;
  constructor() {
    this.name = "Error";
    this.url = [""];
    this.html = "error.html";
    this.css = "";
  }

  async run() {
    console.log("ERROR");
  }
}
