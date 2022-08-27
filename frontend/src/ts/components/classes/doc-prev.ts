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
  constructor() {
    super();
    this.name = "doc-prev";
    this.html = "doc-prev.html";
    this.css = ["doc-prev.css"];
  }

  async run() {
    this.compId = this.element.attributes.getNamedItem("compId").value;
  }
}
