import { closeOnClick, makeAccessDeniedPopup } from "../popup/common-popups";
import { PageDefault, PopupDefault } from "../types/classes";
import * as popupController from "../popup/popup-controller";
import { makeDoc } from "../api/endpoints/doc";

import * as Snackbar from "../../js/snackbar.min.js";
import * as md from "../../js/md";

export const urls = ["/make"];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;

  title: string;
  body: string;
  roles: string[];
  constructor() {
    super();
    this.name = "Make Document";
    this.url = urls;
    this.html = "make.html";
    this.css = ["make.css"];

    this.title = "";
    this.body = "";
    this.roles = [];
  }

  async run() {
    super.run();

    $("#doc-title").text("Unamed");

    $("#body").on("blur", (e) => {
      this.body = $(e.target).val().toString();
    });

    $("#doc-title").on("click", async () => {
      await this.makeNamePopup();
    });

    $("#submit").on("click", async () => {
      if (this.title == "" || this.title == "Unamed") {
        Snackbar.show({
          pos: "top-right",
          text: "Plase provide a title",
          textColor: "var(--text-white)",
          actionTextColor: "var(--text-error)",
        });
        return;
      }
      if (this.body.length > 20000) {
        Snackbar.show({
          pos: "top-right",
          text: `Your document is too long. Please reduce your document by: ${
            this.body.length - 20000
          } characters`,
          textColor: "var(--text-white)",
          actionTextColor: "var(--text-error)",
        });
        return;
      }
      if (this.title.length > 40) {
        Snackbar.show({
          pos: "top-right",
          text: `Your title is too long. Please reduce your title by: ${
            this.title.length - 40
          } characters`,
          textColor: "var(--text-white)",
          actionTextColor: "var(--text-error)",
        });
        return;
      }

      const id = await makeDoc(this.body, this.title);

      if (id["error"]) {
        if (id["status"] == 401) {
          popupController.showPopup(
            makeAccessDeniedPopup("You do not have access to make documents!")
          );
          return;
        }
        Snackbar.show({
          pos: "top-right",
          text: id["error"],
          textColor: "var(--text-white)",
          actionTextColor: "var(--text-error)",
        });
        return;
      }

      window.location.href = `/view?id=${id["id"]}`;
    });

    await this.makeNamePopup();

    $("#prev").on("click", async () => {
      await this.makePrevPopup();
    });
  }

  async makeNamePopup() {
    const popup = new PopupDefault(
      "50%",
      "80%",
      "var(--background-color-3)",
      "doc-name-popup",
      "docName.css"
    );
    popup.makeFunc = (popup: PopupDefault) => {
      closeOnClick(popup);

      $("#doc-input-title").val(this.title);

      $(".doc-name-submit").on("click", () => {
        popupController.closePopup(popup);
      });

      $(".doc-name-popup").on("keypress", function (e) {
        if (e.key === "Enter") {
          popupController.closePopup(popup);
        }
      });
    };

    popup.hideFunc = () => {
      const elm = $("#doc-input-title");
      if (elm.val() == "") {
        this.title = "Unamed";
      } else {
        this.title = elm.val().toString();
      }

      $("#doc-title").text(this.title);
    };

    popupController.makePopup(popup);
    popupController.showPopup(popup);
  }

  async makePrevPopup() {
    const popup = new PopupDefault(
      "50%",
      "80%",
      "var(--background-color-2)",
      "doc-prev",
      undefined
    );
    popup.makeFunc = (popup: PopupDefault) => {
      closeOnClick(popup);

      $(".body-prev").html(md.parse(this.body));
    };

    popupController.makePopup(popup);
    popupController.showPopup(popup);
  }
}
