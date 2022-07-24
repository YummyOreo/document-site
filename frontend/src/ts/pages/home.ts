import getHello from "../api/endpoints/hello.js";
import { NavbarCompenent } from "../components/classes/navbar.js";
import { Component } from "../components/compenent.js";
import {
  deleteComponentByName,
  getComponentByName,
} from "../components/compentent-controller.js";
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
    this.components = [new NavbarCompenent()];
    this.css = ["home.css"];
  }

  async run() {
    super.run();
  }
}
