import { FooterCompenent } from "../components/classes/footer";
import { NavbarCompenent } from "../components/classes/navbar";
import { Component, PageDefault } from "../types/classes";

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
