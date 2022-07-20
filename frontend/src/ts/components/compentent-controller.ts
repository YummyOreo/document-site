import { currentPage } from "../router/page-router.js";
import { Component } from "./compenent.js";

export async function loadComponents() {
  if (currentPage.components == undefined) return;

  const components = currentPage.components;
  for (const i in components) {
    const element = document.getElementById(components[i].name);
    if (element == undefined) continue;
    if (element.classList.contains("component")) continue;
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
    component.run();
  });
}
