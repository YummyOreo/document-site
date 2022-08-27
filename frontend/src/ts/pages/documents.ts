import { getAll } from "../api/endpoints/doc";
import { store } from "../store";
import { PageDefault } from "../types/classes";

export const urls = ["/documents*"];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  documents: any;
  constructor() {
    super();
    this.name = "Documents";
    this.url = urls;
    this.html = "documents.html";
    this.css = ["docs.css"];
  }

  async run() {
    super.run();

    $(".sort button").on("click", (e) => {
      $(".clicked").removeClass("clicked");

      e.target.classList.add("clicked");
    });

    this.documents = await getAll();
    store["documents"] = this.documents["documents"];

    const elm: any = document.createElement("custom-adapt-component");

    elm.setAttribute("name", "documentPrev");
    elm.setAttribute("compId", "6306bca9c82c57f7209361bc");
    elm.load();

    $(".documents").append(elm);
  }
}
