import { currentPage } from "../router/page-router.js";
import { Component } from "./compenent.js";

export const componentNames: string[] = [];

export async function loadComponents() {
  if (currentPage.components == undefined) return;

  const components = currentPage.components;
  for (const i in components) {
    const element = document.getElementById(components[i].name);
    if (element == undefined) continue;
    if (element.classList.contains("component")) continue;
    componentNames.push(components[i].name);
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

export function getComponentByName(name: string): Component {
  const index = componentNames.indexOf(name);
  return currentPage.components[index];
}
