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
  docPrevs: any;
  constructor() {
    super();
    this.name = "Search";
    this.html = "search.html";
    this.css = ["search.css"];
    this.url = urls;
    this.docPrevs = [];
  }

  async run() {
    const urlParams = new URLSearchParams(window.location.search);

    const query = urlParams.get("q");

    await this.sort(query);

    $("#search-box").on("keypress", (e) => {
      if (e.key === "Enter") {
        const query = $("#search-box").val().toString();

        store["documents"] = searchDocs(query).reverse();

        this.docPrevs.forEach((elm: any, index: number) => {
          elm.setAttribute("compId", store["documents"][index]["_id"]);
          elm.setAttribute("index", index.toString());
          elm.connectedCallback();
        });
      }
    });
  }

  async sort(query: string) {
    const documents = await getDocs();

    store["documents"] = documents["documents"];

    store["documents"] = searchDocs(query).reverse();

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
