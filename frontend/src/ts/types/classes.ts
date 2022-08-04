import { loadedCss } from "../popup/popup-controller.js";

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
  sizeWidth: string;
  sizeHeight: string;
  color: string;
  html: string;
  css: string;
  id: string;
  show: Function;
  hide: Function;
  constructor(
    sizeWidth: string,
    sizeHeight: string,
    color: string,
    html: string,
    css: string
  ) {
    this.sizeWidth = sizeWidth;
    this.sizeHeight = sizeHeight;
    this.color = color;
    this.html = html;
    this.css = css;
  }

  assignId(id: string) {
    this.id = id;
  }

  assignShow(func: Function) {
    this.show = func;
  }

  assignHide(func: Function) {
    this.hide = func;
  }

  makePopup() {
    $(`#popup-${this.id}.popup-inner`).load(
      `/static/html/popups/${this.html}`,
      () => {
        if (this.css != undefined && !loadedCss.includes(this.css)) {
          $("head").append(
            $('<link rel="stylesheet" type="text/css" />').attr(
              "href",
              `/src/css/popups/${this.css}`
            )
          );
          loadedCss.push(this.css);
        }
      }
    );
  }

  showPopup() {
    $(`#popup-${this.id}.popup-outer`).css({
      opacity: "100",
      "pointer-events": "all",
    });
    if (this.show) {
      this.show(this);
    }
  }

  hidePopup() {
    $(`#popup-${this.id}.popup-outer`).css({
      opacity: "0",
      "pointer-events": "none",
    });
    if (this.hide) {
      this.hide(this);
    }
  }
}

export class Component {
  name: string;
  html: string;
  css: string[];
  constructor() {}

  async run() {}
}
