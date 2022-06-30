"use strict";
import $ = require("jquery");
import { Page } from "../constants/page";

import * as documentsPage from "../pages/documents";
import * as homePage from "../pages/home";

const pages: Page[] = [];

pages.push(new documentsPage.page());
pages.push(new homePage.page());

export function getPage() {

  pages.forEach((item, index) => {
    if (item.path.includes(window.location.pathname)) {
      item.start();
    }
  });
}
