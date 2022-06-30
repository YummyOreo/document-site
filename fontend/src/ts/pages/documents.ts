import { Page } from "../constants/page";

export class page extends Page {
  constructor() {
    super("Documents", ["/documents.html", "/documents"]);
  }

  start() {
    super.start();
    
  }
}
