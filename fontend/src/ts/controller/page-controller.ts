import $ = require("jquery");

import * as home from "../pages/home";
import * as test from "../pages/test";

export function getPage() {
  const pages = [];

  pages.push(new home.Page());
  pages.push(new test.Page());

  pages.forEach((item, index) => {
    console.log(window.location.search);
    if (item.path.includes(window.location.search)) {
      $(".greeting").load(item.html, function () {
        item.start();
      });
    }
  });
}
