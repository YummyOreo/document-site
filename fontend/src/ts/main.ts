"use strict";
import $ = require("jquery");
//import { sayHello } from "./greet";
function showHello() {
  $(`.greeting`).load("page.html", function() {
    $(".greeting1").text("hello");
  });
}
showHello();
