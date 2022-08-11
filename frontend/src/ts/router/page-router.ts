import { loadComponents } from "../components/component-controller";
import * as DocumentsPage from "../pages/documents";
import ErrorPage from "../pages/error";
import * as HomePage from "../pages/home";
import { PageDefault } from "../types/classes";
import * as folder from "../constants/folder";

const pages: any[] = [DocumentsPage, HomePage];

export let currentPage: PageDefault;

export default async function getPage(): Promise<void> {
  for (const page in pages) {
    if (pages[page].URL.includes(window.location.pathname)) {
      currentPage = new pages[page].Page();
      break;
    }
  }

  currentPage = currentPage ? currentPage : new ErrorPage();

  await displayPage(currentPage);
}

async function displayPage(page: PageDefault) {
  $(".main").load(`${folder.htmlPage}${page.html}`, async () => {
    $(document).prop("title", page.name);
    if (page.css != undefined) {
      page.css.forEach((css) => {
        $("head").append(
          $('<link rel="stylesheet" type="text/css" />').attr(
            "href",
            `${folder.cssPage}${css}`
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
