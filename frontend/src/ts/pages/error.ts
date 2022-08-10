import { FooterCompenent } from "../components/classes/footer.js";
import { NavbarCompenent } from "../components/classes/navbar.js";
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
    this.components = [new NavbarCompenent(), new FooterCompenent()];
  }

  async run() {}
}
