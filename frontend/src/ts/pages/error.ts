import { Component } from "../components/compenent.js";
import Page from "../types/classes.js";

export default class ErrorPage extends Page {
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
