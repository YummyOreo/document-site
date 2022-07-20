import getHello from "../api/endpoints/hello.js";
import { loadComponents } from "../components/compentent-controller.js";
import PageDefault from "../types/classes.js";

export const URL = ["/", "/home", ""];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  constructor() {
    super();
    this.name = "Home";
    this.url = URL;
    this.html = "home.html";
  }

  async run() {
    super.run();

    loadComponents();

    console.log("teste");

    const data = await getHello();

    console.log(data);
  }
}
