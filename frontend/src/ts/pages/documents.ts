export default class DocumentsPage {
  name: string;
  url: string[];
  html: string;
  css: string;
  constructor() {
    this.name = "Documents";
    this.url = ["/documents"];
    this.html = "documents.html";
    this.css = "";
  }

  async run() {
    console.log("hello");
  }
}
