import { currentPage } from "../router/page-router.js";
import { Component } from "./compenent.js";

export async function loadComponents() {
  if (currentPage.components == undefined) return;

  const components = currentPage.components;
  for (const i in components) {
    console.log(components[i]);
    const element = document.getElementById(components[i].name);
    if (element == undefined) continue;
    loadComponent(components[i], element);
  }
}

export async function loadComponent(component: Component, element: Element) {
  $(`#${element.id}`).load(`/static/html/components/${component.html}`, () => {
    if (component.css != undefined) {
      component.css.forEach((css) => {
        $("head").append(
          $('<link rel="stylesheet" type="text/css" />').attr(
            "href",
            `/src/css/${css}`
          )
        );
      });
    }
    console.log("loaded");

    component.run();
  });
}
