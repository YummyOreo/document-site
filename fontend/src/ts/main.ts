"use strict";
import $ = require("jquery");

import * as pageController from "./controller/page-controller";

//import { sayHello } from "./greet";
function showHello() {
  pageController.getPage();
}
showHello();
