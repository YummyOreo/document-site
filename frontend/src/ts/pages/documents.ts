import { getDocs } from "../api/endpoints/doc";
import { store } from "../store";
import { PageDefault } from "../types/classes";

import * as Snackbar from "../../js/snackbar.min.js";
import { getValDocuments, mergeSort } from "../util/sort";

export const urls = ["/documents*"];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  documents: any;
  docPrevs: HTMLElement[];
  constructor() {
    super();
    this.name = "Documents";
    this.url = urls;
    this.html = "documents.html";
    this.css = ["docs.css"];
    this.docPrevs = [];
  }

  async run() {
    super.run();

    $(".sort button").on("click", (e) => {
      if (e.target.classList.contains("clicked")) return;
      switch (e.target.textContent) {
        case "A - Z":
          store["documents"] = mergeSort(store["documents"], getValDocuments);
          break;
        case "Z - A":
          store["documents"] = mergeSort(
            store["documents"],
            getValDocuments
          ).reverse();
          break;
        case "Recent":
          store["documents"] = this.documents["documents"];
          break;
        default:
          store["documents"] = this.documents["documents"];
      }

      this.docPrevs.forEach((elm: any, index: number) => {
        elm.setAttribute("compId", store["documents"][index]["_id"]);
        elm.setAttribute("index", index.toString());
        elm.connectedCallback();
      });

      $(".clicked").removeClass("clicked");

      e.target.classList.add("clicked");
    });

    this.documents = await getDocs();

    store["documents"] = this.documents["documents"].reverse();

    store["documents"].forEach((val: any, index: any) => {
      const elm: any = document.createElement("custom-component");

      elm.setAttribute("name", "documentPrev");
      elm.setAttribute("compId", val["_id"]);
      elm.setAttribute("index", index.toString());

      this.docPrevs.push(elm);

      $(".documents").append(elm);
    });
  }
}
