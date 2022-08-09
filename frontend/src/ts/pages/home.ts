import { FooterCompenent } from "../components/classes/footer.js";
import { NavbarCompenent } from "../components/classes/navbar.js";
import { makeImagePopup } from "../popup/common-popups.js";
import { showPopup } from "../popup/popup-controller.js";
import { Component, PageDefault } from "../types/classes.js";
import * as folder from "../constants/folder.js";

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
    this.components = [new NavbarCompenent(), new FooterCompenent()];
    this.css = ["home.css"];
  }

  async run() {
    super.run();
    $(".preview-img").on("click", () => {
      const image = `${folder.assets}home/png/Preview.png`;

      const id = makeImagePopup(image);
      showPopup(id);
    });
  }
}
