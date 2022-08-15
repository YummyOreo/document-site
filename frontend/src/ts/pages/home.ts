import { makeImagePopup } from "../popup/common-popups";
import { showPopup } from "../popup/popup-controller";
import { PageDefault } from "../types/classes";
import * as folder from "../constants/folder";

export const urls = ["/", "/home", ""];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  defaultComponents: string[];
  constructor() {
    super();
    this.name = "Home";
    this.url = urls;
    this.html = "home.html";
    this.defaultComponents = ["navbar", "footer"];
    this.css = ["home.css"];
  }

  async run() {
    super.run();

    $(".preview-img").on("click", () => {
      const image = `${folder.assets}home/png/Preview.png`;

      const id = makeImagePopup(image);
      showPopup(id);
    });
  }
}
