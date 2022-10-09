import { store } from "../store";
import { PageDefault } from "../types/classes";
import { GroupWithSettings } from "../types/FrontendTypes";

export const urls = ["/settings/*", "/settings"];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;

  groups: GroupWithSettings[];
  constructor() {
    super();
    this.name = "Settings";
    this.url = urls;
    this.html = "settings.html";
    this.css = ["settings.css"];

    this.groups = [];
  }

  async run() {
    super.run();
    const setting = window.location.pathname
      .replace("/settings/", "")
      .replace("/settings", "");
    console.log(setting);

    $(".panel button").on("click", (e: any) => {
      $(e.target).find("object").css("rotate", 360);
    });

    this.groupSettings();
  }

  async groupSettings() {
    $(".add-group").on("click", () => {
      const elm: any = document.createElement("custom-component");

      elm.setAttribute("name", "groupSetting");

      $(".groups").append(elm);

      setTimeout(() => {
        $(elm).find(".group-name").trigger("focus");
      }, 500);
    });

    $("body").on("click", (e) => {
      if (e.target.id == "wapper") {
        if (store["groupClicked"]) {
          store["groupClicked"].unClick();
          store["groupClicked"] = undefined;
        }
      }
    });
  }

  async getGroups() {}
}
