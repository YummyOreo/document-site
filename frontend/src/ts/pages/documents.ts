import { FooterCompenent } from "../components/classes/footer";
import { NavbarCompenent } from "../components/classes/navbar";
import { ComponentDefault, PageDefault } from "../types/classes";

export const URL = ["/documents"];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  components: ComponentDefault[];
  constructor() {
    super();
    this.name = "Documents";
    this.url = URL;
    this.html = "documents.html";
    this.components = [new NavbarCompenent(), new FooterCompenent()];
  }

  async run() {
    super.run();
  }
}
