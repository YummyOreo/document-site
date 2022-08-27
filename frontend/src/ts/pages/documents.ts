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
    store["documents"] = this.documents["documents"].reverse();

    store["documents"].forEach((val: any, index: any) => {
      console.log(index);

      const elm: any = document.createElement("custom-adapt-component");

      elm.setAttribute("name", "documentPrev");
      elm.setAttribute("compId", val["_id"]);
      elm.setAttribute("index", index.toString());
      elm.load();

      $(".documents").append(elm);
    });
  }
}
