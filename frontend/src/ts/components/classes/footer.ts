import { DefaultComponent } from "../../types/classes";

export class FooterCompenent extends DefaultComponent {
  name: string;
  html: string;
  css: string[];
  constructor() {
    super();
    this.name = "footer";
    this.html = "footer.html";
    this.css = ["footer.css"];
  }

  async run() {}
}
