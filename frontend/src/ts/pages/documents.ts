import { Component } from "../components/compenent.js";
import PageDefault from "../types/classes.js";

export const URL = ["/documents"];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  components: Component[];
  constructor() {
    super();
    this.name = "Documents";
    this.url = URL;
    this.html = "documents.html";
  }

  async run() {
    super.run();
  }
}
