import { NavbarCompenent } from "../components/classes/navbar.js";
import { makePopup } from "../popup/popup-controller.js";
import { Component, PageDefault, PopupDefault } from "../types/classes.js";

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
    this.components = [new NavbarCompenent()];
    this.css = ["home.css"];
  }

  async run() {
    super.run();
  }
}
