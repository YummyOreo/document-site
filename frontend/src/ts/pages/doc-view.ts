import { PageDefault } from "../types/classes";
import { getDoc } from "../api/endpoints/doc";

import * as Snackbar from "../../js/snackbar.min.js";
import * as md from "../../js/md";
import { showPopup } from "../popup/popup-controller";
import { makeAccessDeniedPopup } from "../popup/common-popups";

export const urls = ["/view"];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  id: string;
  constructor() {
    super();
    this.name = "Viewing Document";
    this.url = urls;
    this.html = "view.html";
    this.css = ["view.css"];
  }

  async run() {
    super.run();
    var urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("id") || urlParams.get("id") == "") {
      Snackbar.show({
        pos: "top-right",
        text: "Plase provide a id. If you don't know how to do this, ask the developer",
        textColor: "var(--text-white)",
        actionTextColor: "var(--text-error)",
      });
      return;
    }

    this.id = urlParams.get("id");

    const doc: { body: string; title: string } | any = await getDoc(this.id);

    if (doc["error"]) {
      console.log(doc["status"]);

      if (doc["status"] == 401) {
        return showPopup(makeAccessDeniedPopup());
      }
      Snackbar.show({
        pos: "top-right",
        text: doc["error"],
        textColor: "var(--text-white)",
        actionTextColor: "var(--text-error)",
      });
      return;
    }

    $(".body").html(md.parse(doc["body"]));
    $(".title").text(doc["title"]);
  }
}
