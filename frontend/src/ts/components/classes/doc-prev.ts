import { DefaultComponent } from "../../types/classes";

export class DocumentPrevComponent extends DefaultComponent {
  name: string;
  html: string;
  css: string[];
  constructor() {
    super();
    this.name = "doc-prev";
    this.html = "doc-prev.html";
    this.css = ["doc-prev.css"];
  }

  async run() {}
}
