import { loadedCss } from "../popup/popup-controller";
import * as folder from "../constants/folder";

export class PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  constructor() {}

  async run() {
    console.log(`Loaded page: ${this.name}`);
  }
}

export class PopupDefault {
  width: string;
  height: string;
  color: string;
  className: string;
  css: string;
  id: string;
  showFunc: Function;
  hideFunc: Function;
  makeFunc: Function;
  constructor(
    width: string,
    height: string,
    color: string,
    className: string,
    css: string
  ) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.className = className;
    this.css = css;
  }

  makePopup(): PopupDefault {
    $(`#popup-${this.id}.popup-inner`).load(
      `${folder.htmlPopup}popup.html .${this.className}`,
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
    return this;
  }

  showPopup() {
    this.toggleCss();

    if (this.showFunc) this.showFunc(this);
  }

  hidePopup() {
    this.toggleCss();

    if (this.hideFunc) this.hideFunc(this);
  }

  toggleCss() {
    if ($(`#popup-${this.id}.popup-outer`).css("opacity") == "0") {
      $(`#popup-${this.id}.popup-outer`).removeClass("scailOpacityDown");
      $(`#popup-${this.id}.popup-outer`).addClass("scailOpacityUp");
      $(`#popup-${this.id}.popup-outer`).css({
        opacity: 1,
        "pointer-events": "all",
      });
      return;
    }
    $(`#popup-${this.id}.popup-outer`).removeClass("scailOpacityUp");
    $(`#popup-${this.id}.popup-outer`).addClass("scailOpacityDown");
    $(`#popup-${this.id}.popup-outer`).css({
      opacity: 0,
      "pointer-events": "none",
    });
  }
}

export class DefaultComponent {
  name: string;
  html: string;
  css: string[];
  element: HTMLElement;
  constructor() {}

  async run() {}
}
