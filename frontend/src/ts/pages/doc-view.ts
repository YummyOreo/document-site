import { PageDefault } from "../types/classes";

import * as Snackbar from "../../js/snackbar.min.js";

import * as md from "../parser/md";

export const urls = ["/view"];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  defaultComponents: string[];
  id: string;
  constructor() {
    super();
    this.name = "Viewing Document";
    this.url = urls;
    this.html = "view.html";
    this.defaultComponents = ["navbar", "footer"];
    this.css = ["view.css"];
  }

  async run() {
    super.run();
    var urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("id") || urlParams.get("id") == "") {
      Snackbar.show({
        pos: "top-right",
        text: "Plase provide a id. If you don't know how to do this, ask the developer",
        textColor: "#ecf0f1",
        actionTextColor: "#B00020",
      });
      return;
    }

    this.id = urlParams.get("id");
    console.log(this.id);

    $(".body").html(
      md.parse("# Marked in the browser\n\nRendered by **marked**.")
    );
  }
}
