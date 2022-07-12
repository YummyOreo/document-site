import Page from "../types/classes.js";

export default class DocumentsPage extends Page {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  constructor() {
    super();
    this.name = "Documents";
    this.url = ["/documents"];
    this.html = "documents.html";
  }

  async run() {
    super.run();
  }
}
