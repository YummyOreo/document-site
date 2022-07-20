import { loadComponents } from "../components/compentent-controller.js";
import * as DocumentsPage from "../pages/documents.js";
import ErrorPage from "../pages/error.js";
import * as HomePage from "../pages/home.js";
import PageDefault from "../types/classes.js";

const pages: any[] = [DocumentsPage, HomePage];
const error: ErrorPage = new ErrorPage();

export let currentPage: PageDefault;

export default async function getPage(): Promise<void> {
  for (const page in pages) {
    if (pages[page].URL.includes(window.location.pathname)) {
      currentPage = new pages[page].Page();
      await displayPage(currentPage);
      return;
    }
  }

  displayPage(error);
}

async function displayPage(page: PageDefault) {
  $(".main").load(`/static/pages/${page.html}`, async () => {
    $(document).prop("title", page.name);
    if (page.css != undefined) {
      page.css.forEach((css) => {
        $("head").append(
          $('<link rel="stylesheet" type="text/css" />').attr(
            "href",
            `/src/css/${css}`
          )
        );
      });
    }
    await loadComponents();
    await runPage(page);
  });
}

async function runPage(page: PageDefault) {
  await page.run();
}
