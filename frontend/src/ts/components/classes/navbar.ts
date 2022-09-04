import { currentPage } from "../../router/page-router";
import { auth, store } from "../../store";
import { DefaultComponent } from "../../types/classes";

import * as Snackbar from "../../../js/snackbar.min.js";
import { getUrl } from "../../api/endpoints/auth";

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
      $(".profile-outer").addClass("profile-logged-in");
    } else {
      $(".profile-name").on("click", async () => {
        await this.login();
      });

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

    $("#sign-out").on("click", () => {
      auth.name = "";
      auth.signedIn = false;
      auth.token = "";

      localStorage.clear();

      Snackbar.show({
        pos: "top-right",
        text: `Logging out.`,
        textColor: "#ecf0f1",
        actionTextColor: "#B00020",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });

    $("#update-profile").on("click", async () => {
      await this.login();
    });

    // makes it so if you scroll down far enought the navbar hides its self
    $(window).on("scroll", function () {
      $("#navbar").css("top", Math.min(0, 250 - $(this).scrollTop()));
    });

    let searchInputOn = false;

    $(".nav-doc-search").on("mouseover", () => {
      this.openNavSearch();
    });

    $(".nav-doc-search").on("mouseout", () => {
      if (!searchInputOn) {
        this.closeNavSearch();
      }
    });

    $(".nav-doc-input").focus(() => {
      searchInputOn = true;
      $(".nav-doc-input").css("display", "block");
    });

    $(".nav-doc-input").focusout(() => {
      searchInputOn = false;

      $(".nav-doc-input").css("display", "none");
      $(".nav-doc-input").val("");
      if (".nav-doc-search:hover".length != 0) {
        this.closeNavSearch();
      }
    });

    $(".nav-doc-search").on("keypress", function (e) {
      if (e.key === "Enter" && searchInputOn) {
        const query: string = $(".nav-doc-input").val().toString();
        console.info("Search");
        if (query.trim() == "") {
          Snackbar.show({
            pos: "top-right",
            text: `You can not search for nothing.`,
            textColor: "#ecf0f1",
            actionTextColor: "#B00020",
          });
        }
      }
    });
  }

  closeNavSearch() {
    $(".nav-doc-search").css("width", "3.5rem");
    $(".nav-doc-search").css("border-color", "var(--background-color-3)");
    $(".nav-doc-search")
      .find(".nav-doc-inner")
      .css("justify-content", "center");
    $(".nav-doc-input").css("display", "none");
  }

  openNavSearch() {
    $(".nav-doc-search").css("animation", "docSearchGrow 0.5s");
    $(".nav-doc-search").css("width", "12.25rem");
    $(".nav-doc-search").css("border-color", "var(--text-accent)");
    $(".nav-doc-search").find(".nav-doc-inner").css("justify-content", "left");
    $(".nav-doc-input").css("display", "block");
  }

  async login() {
    Snackbar.show({
      pos: "top-right",
      text: `Redirecting to discord auth page.`,
      textColor: "#ecf0f1",
      actionTextColor: "#B00020",
    });

    const url = await getUrl();

    if (url == "") {
      Snackbar.show({
        pos: "top-right",
        text: `There was a error trying to redirect you.`,
        textColor: "#ecf0f1",
        actionTextColor: "#B00020",
      });
      return;
    }
    window.location.href = url["url"];
  }
}
