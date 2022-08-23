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
      console.log(this.body);
    });

    $("#doc-title").on("click", async () => {
      const namePopupId = await this.makeNamePopup();
      popupController.showPopup(namePopupId);
    });

    const namePopupId = await this.makeNamePopup();
    popupController.showPopup(namePopupId);
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

      if (this.title != "") {
        const elm: any = document.getElementById("doc-input-title");
        elm.value = this.title;
      }

      $(".doc-name-submit").on("click", () => {
        popupController.hidePopup(popup.id);

        setTimeout(() => {
          popupController.deletePopup(popup.id);
        }, 300);
      });

      $(".doc-name-popup").on("keypress", function (e) {
        if (e.which == 13) {
          popupController.hidePopup(popup.id);

          setTimeout(() => {
            popupController.deletePopup(popup.id);
          }, 300);
        }
      });
    };

    popup.hideFunc = (popup: any) => {
      if (this.title == "") {
        this.title = "Unamed";
      } else {
        const elm: any = document.getElementById("doc-input-title");
        this.title = elm.value;
      }

      $("#doc-title").text(this.title);
      console.log(this.title);
    };

    const id = popupController.makePopup(popup);

    return id;
  }
}
