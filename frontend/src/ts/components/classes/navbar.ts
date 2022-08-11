import { currentPage } from "../../router/page-router";
import { Component } from "../../types/classes";

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
      disabledElement.removeAttribute("href");
    }

    // makes it so if you scroll down far enought the navbar hides its self
    $(window).on("scroll", function () {
      $("#navbar").css("top", Math.min(0, 250 - $(this).scrollTop()));
    });
  }
}
