import { getGroups } from "../api/endpoints/groups";
import { store } from "../store";
import { PageDefault } from "../types/classes";
import { Group, GroupWithSettings } from "../types/FrontendTypes";

export const urls = ["/settings/*", "/settings"];

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

    await this.loadGroups(await this.getGroups());
  }

  async getGroups(): Promise<Group[]> {
    const results = await getGroups();
    console.log(results);
    return results["groups"];
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
