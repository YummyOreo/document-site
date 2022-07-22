import { currentPage } from "../../router/page-router.js";
import { Component } from "../compenent.js";

export class NavbarCompenent extends Component {
  name: string;
  html: string;
  css: string[];
  constructor() {
    super();
    this.name = "navbar";
    this.html = "navbar.html";
    this.css = ["navbar.css"];
  }

  async run() {
    const disabledElements = document.getElementsByClassName(currentPage.name);
    for (const i in disabledElements) {
      if (i == "length") break;
      const disabledElement = disabledElements[i];
      disabledElement.classList.add("nav-disabled");
    }
  }
}
