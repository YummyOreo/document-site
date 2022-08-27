import { store } from "../../store";
import { DefaultComponent } from "../../types/classes";

export class DocumentPrevComponent extends DefaultComponent {
  name: string;
  html: string;
  css: string[];

  compId: string;

  title: string;
  author: string;
  prev: string;

  roles: string[];
  doc: any;
  constructor() {
    super();
    this.name = "doc-prev";
    this.html = "doc-prev.html";
    this.css = ["doc-prev.css"];
  }

  async run() {
    this.compId = this.element.attributes.getNamedItem("compId").value;
    this.getDoc();
  }

  async getDoc() {
    store["documents"].forEach((e: any) => {
      if (e["_id"] == this.compId) {
        this.doc = e;
      }
    });

    $(".doc-title").text(this.doc["title"]);
    $(".doc-prev p").text(this.doc["body"]);
  }
}
