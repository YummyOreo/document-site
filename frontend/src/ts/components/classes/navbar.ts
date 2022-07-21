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
    const disabledElement = document.getElementById(currentPage.name);
    disabledElement.style.color = "var(--text-white-dark)";
    disabledElement.style.pointerEvents = "none";
  }
}
