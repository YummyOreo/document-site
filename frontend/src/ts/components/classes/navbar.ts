import { currentPage } from "../../router/page-router";
import { auth, store } from "../../store";
import { DefaultComponent } from "../../types/classes";

import * as Snackbar from "../../../js/snackbar.min.js";
import { getUrl } from "../../api/endpoints/auth";

export class NavbarComponent extends DefaultComponent {
  name: string;
  html: string;
  css: string[];
  searchInputOn: boolean;
  constructor() {
    super();
    this.name = "navbar";
    this.html = "navbar.html";
    this.css = ["navbar.css"];
    this.searchInputOn = false;
  }

  async run() {
    this.disableNavLinks();

    this.handleAuth();

    this.handleSearchBar();

    // makes it so if you scroll down far enough the navbar hides its self
    $(window).on("scroll", () => {
      $("#navbar").css("top", Math.min(0, 250 - $(this).scrollTop()));
    });
  }

  disableNavLinks() {
    const disabledElements = document.getElementsByClassName(currentPage.name);
    for (const i in disabledElements) {
      if (i == "length") break;
      const disabledElement = disabledElements[i];

      disabledElement.classList.add("nav-disabled");
      disabledElement.removeAttribute("href");
    }
  }

  async login() {
    const url = await getUrl();

    if (url == "") {
      Snackbar.show({
        pos: "top-right",
        text: `There was a error trying to redirect you.`,
        textColor: "var(--text-white)",
        actionTextColor: "var(--text-error)",
      });
      return;
    }
    localStorage.setItem("last", window.location.href);
    window.location.href = url["url"];
  }

  closeSearchInput() {
    $(".nav-doc-search").css({
      width: "3.5rem",
      "border-color": "var(--background-color-3)",
    });

    $(".nav-doc-search")
      .find(".nav-doc-inner")
      .css("justify-content", "center");

    $(".nav-doc-input").css("display", "none");
  }

  openSearchInput() {
    $(".nav-doc-search").css({
      animation: "docSearchGrow 0.5s",
      width: "12.25rem",
      "border-color": "var(--text-accent)",
      display: "block",
    });

    $(".nav-doc-search").find(".nav-doc-inner").css("justify-content", "left");

    $(".nav-doc-input").css("display", "block");
  }

  handleDocSignedOut() {
    $(".nav-doc .sign-out-remove").removeAttr("href");

    $(".nav-doc-make").on("click", () => {
      Snackbar.show({
        pos: "top-right",
        text: `You have to login to make a document.`,
        textColor: "var(--text-white)",
        actionTextColor: "var(--text-error)",
      });
      return;
    });
  }

  handleProfileSignedIn() {
    $(".profile-name").text(auth.name);

    $(".profile-outer").addClass("profile-logged-in");

    $("#sign-out").on("click", () => {
      auth.name = "";
      auth.signedIn = false;
      auth.token = "";

      localStorage.clear();

      Snackbar.show({
        pos: "top-right",
        text: `Logging out.`,
        textColor: "var(--text-white)",
        actionTextColor: "var(--text-success)",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });

    $("#update-profile").on("click", async () => {
      await this.login();
    });
  }

  handleAuth() {
    if (auth.signedIn) {
      this.handleProfileSignedIn();
    } else {
      $(".profile-name").on("click", async () => {
        await this.login();
      });

      this.handleDocSignedOut();
    }
  }

  handleSearchBar() {
    $(".nav-doc-search").on("mouseover", () => {
      this.openSearchInput();
    });

    $(".nav-doc-search").on("mouseout", () => {
      if (!this.searchInputOn) {
        this.closeSearchInput();
      }
    });

    this.handleSearchInput();
  }

  handleSearchInput() {
    $(".nav-doc-input").focus(() => {
      this.searchInputOn = true;
      $(".nav-doc-input").css("display", "block");
    });

    $(".nav-doc-input").focusout(() => {
      this.searchInputOn = false;

      $(".nav-doc-input").css("display", "none");

      $(".nav-doc-input").val("");

      if (".nav-doc-search:hover".length != 0) {
        this.closeSearchInput();
      }
    });

    $(".nav-doc-search").on("keypress", this.handleSearchEnter);
  }

  handleSearchEnter(e: any) {
    if (e.key === "Enter") {
      if (!auth.signedIn) {
        return Snackbar.show({
          pos: "top-right",
          text: `You can not search if you are not logged in.`,
          textColor: "var(--text-white)",
          actionTextColor: "var(--text-error)",
        });
      }

      // redirects to the search page
      const query: string = $(".nav-doc-input").val().toString();
      if (query.trim() == "") {
        return Snackbar.show({
          pos: "top-right",
          text: "You can not search for nothing.",
          textColor: "var(--text-white)",
          actionTextColor: "var(--text-error)",
        });
      }
      // if we dont do this, then if you do & it will act as a new param
      const cleanQuery = query.replace("&", "%26");
      window.location.href = `/search?q=${cleanQuery}`;
    }
  }
}
