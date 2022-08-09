import { loadedCss } from "../popup/popup-controller.js";
import * as folder from "../constants/folder.js";

export class PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  components: Component[];
  constructor(name: string = "") {}

  async run() {
    console.log(`Loaded page: ${this.name}`);
  }
}

export class PopupDefault {
  width: string;
  height: string;
  color: string;
  html: string;
  css: string;
  id: string;
  showFunc: Function;
  hideFunc: Function;
  makeFunc: Function;
  constructor(
    width: string,
    height: string,
    color: string,
    html: string,
    css: string
  ) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.html = html;
    this.css = css;
  }

  makePopup() {
    $(`#popup-${this.id}.popup-inner`).load(
      `${folder.htmlPopup}${this.html}`,
      () => {
        if (this.css != undefined && !loadedCss.includes(this.css)) {
          $("head").append(
            $('<link rel="stylesheet" type="text/css" />').attr(
              "href",
              `${folder.cssPopup}${this.css}`
            )
          );
          loadedCss.push(this.css);
        }
        if (this.makeFunc) this.makeFunc(this);
      }
    );
  }

  showPopup() {
    $(`#popup-${this.id}.popup-outer`).removeClass("scailOpacityDown");
    $(`#popup-${this.id}.popup-outer`).addClass("scailOpacityUp");
    $(`#popup-${this.id}.popup-outer`).css({
      opacity: 1,
      "pointer-events": "all",
    });

    if (this.showFunc) this.showFunc(this);
  }

  hidePopup() {
    $(`#popup-${this.id}.popup-outer`).removeClass("scailOpacityUp");
    $(`#popup-${this.id}.popup-outer`).addClass("scailOpacityDown");
    $(`#popup-${this.id}.popup-outer`).css({
      opacity: 0,
      "pointer-events": "none",
    });

    if (this.hideFunc) this.hideFunc(this);
  }
}

export class Component {
  name: string;
  html: string;
  css: string[];
  constructor() {}

  async run() {}
}
