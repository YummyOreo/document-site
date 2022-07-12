import DocumentsPage from "../pages/documents.js";
import ErrorPage from "../pages/error.js";
import HomePage from "../pages/home.js";
import Page from "../types/classes.js";

export default class PageRouter {
  pages: Page[];
  error: ErrorPage;
  constructor() {
    this.pages = [new DocumentsPage(), new HomePage()];
    this.error = new ErrorPage();
  }

  async getPage() {
    for (const page in this.pages) {
      if (this.pages[page].url.includes(window.location.pathname)) {
        await this.displayPage(this.pages[page]);
        return;
      }
    }

    this.displayPage(this.error);
  }

  async runPage(page: any) {
    await page.run();
  }

  async displayPage(page) {
    $(".main").load(`/static/pages/${page.html}`, async () => {
      $(document).prop("title", page.name);
      await this.runPage(page);
    });
  }
}
