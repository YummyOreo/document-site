import {
  DocumentsPage,
  HomePage,
  MakeDocumentPage,
  ViewDocumentPage,
  AuthPage,
  SearchPage,
  SettingsPage,
} from "../pages/";
import ErrorPage from "../pages/error";
import { PageDefault } from "../types/classes";
import * as folder from "../constants/folder";

const pages: any[] = [
  DocumentsPage,
  HomePage,
  MakeDocumentPage,
  ViewDocumentPage,
  SearchPage,
  AuthPage,
  SettingsPage,
];

export let currentPage: PageDefault;

export default async function getPage(): Promise<void> {
  for (const page in pages) {
    if (comparUrl(pages[page].urls)) {
      currentPage = new pages[page].Page();
      break;
    }
  }

  currentPage = currentPage ? currentPage : new ErrorPage();

  await displayPage(currentPage);
}

async function displayPage(page: PageDefault) {
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

  $(".main").load(`${folder.htmlPage}${page.html}`, async () => {
    $(document).prop("title", page.name);
    await runPage(page);
  });
}

async function runPage(page: PageDefault) {
  await page.run();
}

function comparUrl(targetUrl: string[]): Boolean {
  const currentUrl = window.location.pathname;

  for (const i in targetUrl) {
    const url = targetUrl[i];

    if (currentUrl == url) return true;

    if (url.endsWith("*")) {
      if (currentUrl.startsWith(url.slice(0, -1))) return true;
    }
  }

  return false;
}
