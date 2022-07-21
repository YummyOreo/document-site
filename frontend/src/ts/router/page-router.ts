import { loadComponents } from "../components/compentent-controller.js";
import * as DocumentsPage from "../pages/documents.js";
import ErrorPage from "../pages/error.js";
import * as HomePage from "../pages/home.js";
import PageDefault from "../types/classes.js";

const pages: any[] = [DocumentsPage, HomePage];
const error = ErrorPage;

export let currentPage: PageDefault;

export default async function getPage(): Promise<void> {
  for (const page in pages) {
    if (pages[page].URL.includes(window.location.pathname)) {
      currentPage = new pages[page].Page();
      await displayPage(currentPage);
      return;
    }
  }

  currentPage = new ErrorPage();

  displayPage(currentPage);
}

async function displayPage(page: PageDefault) {
  console.log(page.html);

  $(".main").load(`/static/pages/${page.html}`, async () => {
    $(document).prop("title", page.name);
    if (page.css != undefined) {
      page.css.forEach((css) => {
        $("head").append(
          $('<link rel="stylesheet" type="text/css" />').attr(
            "href",
            `/src/css/pages/${css}`
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
