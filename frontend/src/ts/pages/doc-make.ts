import { closeOnClick } from "../popup/common-popups";
import { PageDefault, PopupDefault } from "../types/classes";
import * as popupController from "../popup/popup-controller";
import { makeDoc } from "../api/endpoints/doc";

import * as Snackbar from "../../js/snackbar.min.js";

export const urls = ["/make"];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  defaultComponents: string[];

  title: string;
  body: string;
  roles: string[];
  constructor() {
    super();
    this.name = "Make Document";
    this.url = urls;
    this.html = "make.html";
    this.defaultComponents = ["navbar", "footer"];
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
          textColor: "#ecf0f1",
          actionTextColor: "#B00020",
        });
        return;
      }
      if (this.body.length > 20000) {
        Snackbar.show({
          pos: "top-right",
          text: `Your document is too long. Please reduce your document by: ${
            this.body.length - 20000
          } characters`,
          textColor: "#ecf0f1",
          actionTextColor: "#B00020",
        });
        return;
      }
      if (this.title.length > 40) {
        Snackbar.show({
          pos: "top-right",
          text: `Your title is too long. Please reduce your title by: ${
            this.title.length - 40
          } characters`,
          textColor: "#ecf0f1",
          actionTextColor: "#B00020",
        });
        return;
      }

      const id = await makeDoc(this.body, this.title);

      if (!id["id"]) {
        Snackbar.show({
          pos: "top-right",
          text: id["error"],
          textColor: "#ecf0f1",
          actionTextColor: "#B00020",
        });
        return;
      }

      window.location.href = `/view?id=${id["id"]}`;
    });

    await this.makeNamePopup();
  }

  async makeNamePopup() {
    const popup = new PopupDefault(
      "50%",
      "80%",
      "var(--background-color-3)",
      "docName.html",
      "docName.css"
    );
    popup.makeFunc = (popup: PopupDefault) => {
      closeOnClick(popup.id);

      $("#doc-input-title").val(this.title);

      $(".doc-name-submit").on("click", () => {
        popupController.closePopup(popup.id);
      });

      $(".doc-name-popup").on("keypress", function (e) {
        if (e.key === "Enter") {
          popupController.closePopup(popup.id);
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

    const id = popupController.makePopup(popup);
    popupController.showPopup(id);

    return id;
  }
}
