import { Component, PageDefault } from "../types/classes.js";

export default class ErrorPage extends PageDefault {
  name: string;
  html: string;
  css: string[];
  discordAuth: boolean;
  components: Component[];
  constructor() {
    super();
    this.name = "Error";
    this.html = "error.html";
  }

  async run() {}
}
