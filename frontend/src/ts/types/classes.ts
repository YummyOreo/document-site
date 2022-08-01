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
  sizeX: number;
  sizeY: number;
  color: string;
  html: string;
  css: string;
  num: string;
  show: Function;
  hide: Function;
  constructor(
    sizeX: number,
    sizeY: number,
    color: string,
    html: string,
    css: string
  ) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.color = color;
    this.html = html;
    this.css = css;
  }

  assignNumber(num: string) {
    this.num = num;
  }

  assignShow(func: Function) {
    this.show = func;
  }

  assignHide(func: Function) {
    this.hide = func;
  }

  makePopup() {
    $(`#popup-${this.num}.popup-inner`).load(
      `/static/html/popups/${this.html}`,
      () => {
        if (this.css != undefined) {
          $("head").append(
            $('<link rel="stylesheet" type="text/css" />').attr(
              "href",
              `/src/css/popups/${this.css}`
            )
          );
        }
      }
    );
  }

  showPopup() {
    $(`#popup-${this.num}.popup-outer`).css({
      opacity: "100",
      "pointer-events": "all",
    });
    this.show();
  }

  hidePopup() {
    $(`#popup-${this.num}.popup-outer`).css({
      opacity: "0",
      "pointer-events": "none",
    });
    this.hide();
  }
}

export class Component {
  name: string;
  html: string;
  css: string[];
  constructor() {}

  async run() {}
}
