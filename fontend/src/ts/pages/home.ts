export class Page {
  path: Array<string>;
  name: string;
  html: string;
  constructor() {
    this.path = [""];
    this.name = "Home";
    this.html = "home.html";
  }

  start() {
    $(".greeting1").text("hello");
    $(document).attr("title", this.name);
  }
}
