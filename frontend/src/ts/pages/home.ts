import Page from "../types/classes.js";

export default class HomePage extends Page {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  constructor() {
    super();
    this.name = "Home";
    this.url = ["/", "/home", ""];
    this.html = "home.html";
    this.css = ["home.css"];
  }

  async run() {
    super.run();
  }
}
