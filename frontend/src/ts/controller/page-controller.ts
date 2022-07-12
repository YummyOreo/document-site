import DocumentsPage from "../pages/documents.js";
import ErrorPage from "../pages/error.js";
import HomePage from "../pages/home.js";

export default class PageController {
  pages: any[];
  error: ErrorPage;
  constructor() {
    this.pages = [new DocumentsPage(), new HomePage()];
    this.error = new ErrorPage();
  }

  displayPage() {
    var arrayLength = this.pages.length;
    for (var i = 0; i < arrayLength; i++) {
      const element = this.pages[i];
      if (element.url.includes(window.location.pathname)) {
        $(".main").load(`/static/pages/${element.html}`, async () => {
          $(document).prop("title", element.name);
          await this.runPage(element);
        });
        console.log("page");
        return;
      }
    }

    $(".main").load(`/static/pages/${this.error.html}`, async () => {
      $(document).prop("title", this.error.name);
      await this.runPage(this.error);
    });
  }

  async runPage(element: any) {
    await element.run();
  }
}
