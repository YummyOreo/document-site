import { store } from "../../store";
import { DefaultComponent } from "../../types/classes";

export class DocumentPrevComponent extends DefaultComponent {
  name: string;
  html: string;
  css: string[];

  compId: string;
  index: number;

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
    this.index = parseInt(this.element.attributes.getNamedItem("index").value);
    this.getDoc();
  }

  async getDoc() {
    this.doc = store["documents"][this.index];

    $(this.element).find(".doc-title").text(this.doc["title"]);
    $(this.element).find(".doc-text").text(this.doc["body"]);
  }
}
