export class Page {
  path: Array<string>;
  name: string;
  html: string;
  constructor() {
    this.path = ["?test"];
    this.name = "Test";
    this.html = "test.html";
  }

  start() {
    $(".greeting1").text("hello");
    $(document).attr("title", this.name);
  }
}
