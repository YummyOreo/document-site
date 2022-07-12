import Page from "../types/classes";

export default class DocumentsPage extends Page {
  name: string;
  url: string[];
  html: string;
  css: string;
  constructor() {
    super();
    this.name = "Documents";
    this.url = ["/documents"];
    this.html = "documents.html";
    this.css = "";
  }

  async run() {
    console.log("hello");
  }
}
