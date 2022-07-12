import DocumentsPage from "../pages/documents.js";
import ErrorPage from "../pages/error.js";
import HomePage from "../pages/home.js";
import Page from "../types/classes.js";

const pages: Page[] = [new DocumentsPage(), new HomePage()];
const error: ErrorPage = new ErrorPage();

export default async function getPage(): Promise<void> {
  for (const page in pages) {
    if (pages[page].url.includes(window.location.pathname)) {
      await displayPage(pages[page]);
      return;
    }
  }

  displayPage(error);
}

async function displayPage(page) {
  $(".main").load(`/static/pages/${page.html}`, async () => {
    $(document).prop("title", page.name);
    await runPage(page);
  });
}

async function runPage(page: any) {
  await page.run();
}
