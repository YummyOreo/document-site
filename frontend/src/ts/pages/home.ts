import Page from "../types/classes";

export default class HomePage extends Page {
  name: string;
  url: string[];
  html: string;
  css: string;
  discordAuth: boolean;
  constructor() {
    super();
    this.name = "Home";
    this.url = ["/", "/home", ""];
    this.html = "home.html";
  }

  async run() {
    console.log("THIS IS HOME");
  }
}
