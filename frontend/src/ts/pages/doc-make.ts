import { closeOnClick } from "../popup/common-popups";
import { PageDefault, PopupDefault } from "../types/classes";
import * as popupController from "../popup/popup-controller";

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

      const elm: any = document.getElementById("doc-input-title");
      elm.value = this.title;

      $(".doc-name-submit").on("click", () => {
        popupController.closePopup(popup.id);
      });

      $(".doc-name-popup").on("keypress", function (e) {
        if (e.which == 13) {
          popupController.closePopup(popup.id);
        }
      });
    };

    popup.hideFunc = (popup: any) => {
      const elm: any = document.getElementById("doc-input-title");
      if (elm.value == "") {
        this.title = "Unamed";
      } else {
        this.title = elm.value;
      }

      $("#doc-title").text(this.title);
      console.log(this.title);
    };

    const id = popupController.makePopup(popup);
    popupController.showPopup(id);

    return id;
  }
}
