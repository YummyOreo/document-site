import { getDocs } from "../api/endpoints/doc";
import { store } from "../store";
import { PageDefault } from "../types/classes";
import { searchDocs } from "../util/search";

export const urls = ["/search"];

export class Page extends PageDefault {
  name: string;
  html: string;
  css: string[];
  discordAuth: boolean;
  documents: any;
  constructor() {
    super();
    this.name = "Search";
    this.html = "search.html";
    this.css = ["search.css"];
    this.url = urls;
  }

  async run() {
    const urlParams = new URLSearchParams(window.location.search);

    const query = urlParams.get("q");

    this.documents = await getDocs();

    store["documents"] = this.documents["documents"];

    store["documents"] = searchDocs(query).reverse();

    store["documents"].forEach((val: any, index: any) => {
      const elm: any = document.createElement("custom-component");

      elm.setAttribute("name", "documentPrev");
      elm.setAttribute("compId", val["_id"]);
      elm.setAttribute("index", index.toString());

      $(".documents").append(elm);
    });
  }
}
