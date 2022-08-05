import { NavbarCompenent } from "../components/classes/navbar.js";
import {
  componentNames,
  deleteComponentByName,
} from "../components/component-controller.js";
import { clickClose, makeImagePopup } from "../popup/common-popups.js";
import { makePopup, showPopup } from "../popup/popup-controller.js";
import { currentPage } from "../router/page-router.js";
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
    const id = makeImagePopup();
    showPopup(id);
  }
}
