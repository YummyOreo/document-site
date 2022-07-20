import getHello from "../api/endpoints/hello.js";
import { ExamlpeCompenent } from "../components/classes/example.js";
import { Component } from "../components/compenent.js";
import PageDefault from "../types/classes.js";

export const URL = ["/", "/home", ""];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  components: Component[];
  constructor() {
    super();
    this.name = "Home";
    this.url = URL;
    this.html = "home.html";
    this.components = [new ExamlpeCompenent()];
  }

  async run() {
    super.run();

    console.log("teste");

    const data = await getHello();

    console.log(data);
  }
}
