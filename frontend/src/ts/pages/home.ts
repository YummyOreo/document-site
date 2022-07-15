import getHello from "../api/endpoints/hello.js";
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
  }

  async run() {
    super.run();
    console.log("teste");

    const data = await getHello();

    console.log(data);
  }
}
