export default class HomePage {
  name: string;
  url: string[];
  html: string;
  css: string;
  constructor() {
    this.name = "Home";
    this.url = ["/", "/home", ""];
    this.html = "home.html";
    this.css = "";
  }

  async run() {
    console.log("THIS IS HOME");
  }
}
