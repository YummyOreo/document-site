import { getGroups, makeGroup } from "../api/endpoints/groups";
import { store } from "../store";
import { PageDefault } from "../types/classes";
import { Group } from "../types/FrontendTypes";

export const urls = ["/settings/*", "/settings"];

import * as Snackbar from "../../js/snackbar.min.js";
export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  constructor() {
    super();
    this.name = "Settings";
    this.url = urls;
    this.html = "settings.html";
    this.css = ["settings.css"];
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
      const elm: Element = document.createElement("custom-component");

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

    const groups = await this.getGroups();
    if (groups["error"]) {
      if (groups["status"] == 401) {
        Snackbar.show({
          pos: "top-right",
          text: "You do not have access to this page.",
          textColor: "var(--text-white)",
          actionTextColor: "var(--text-error)",
        });
      } else {
        Snackbar.show({
          pos: "top-right",
          text: groups["error"],
          textColor: "var(--text-white)",
          actionTextColor: "var(--text-error)",
        });
      }
    } else {
      await this.loadGroups(groups["groups"]);
    }
  }

  async getGroups(): Promise<any> {
    const results = await getGroups();
    return results;
  }

  async loadGroups(groups: Group[]) {
    store["groups"] = [];
    for (const i in groups) {
      const group: Group = groups[i];

      const elm: Element = document.createElement("custom-component");

      elm.setAttribute("name", "groupSetting");
      elm.setAttribute("compId", group._id);

      store["groups"].push({
        group,
        element: elm,
      });
      $(".groups").append(elm);
    }
  }
}
