import { currentPage } from "../../router/page-router";
import { auth } from "../../store";
import { DefaultComponent } from "../../types/classes";

import * as Snackbar from "../../../js/snackbar.min.js";

export class NavbarCompenent extends DefaultComponent {
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

    if (auth.signedIn) {
      $(".profile-name").text(auth.name);
    }

    $(".profile-name").on("click", (e) => {
      if (auth.signedIn) {
        // dropdown
        return;
      }
      // redirect to discord auth
    });

    // makes it so if you scroll down far enought the navbar hides its self
    $(window).on("scroll", function () {
      $("#navbar").css("top", Math.min(0, 250 - $(this).scrollTop()));
    });

    if (auth.token == "" || auth.token == undefined) {
      $(".nav-doc a").removeAttr("href");

      $(".nav-doc-make").on("click", () => {
        Snackbar.show({
          pos: "top-right",
          text: `You have to login to make a document.`,
          textColor: "#ecf0f1",
          actionTextColor: "#B00020",
        });
        return;
      });
    }
  }
}
