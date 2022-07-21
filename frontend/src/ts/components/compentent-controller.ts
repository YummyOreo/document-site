import { currentPage } from "../router/page-router.js";
import { Component } from "./compenent.js";

export const componentNames: string[] = [];

export async function loadComponents() {
  if (currentPage.components == undefined) return;

  const components = currentPage.components;
  for (const i in components) {
    const component = components[i];
    const element = document.getElementById(component.name);
    if (element == undefined) continue;
    if (!element.classList.contains("component")) continue;
    loadComponent(component, element);
  }
}

export async function loadComponent(component: Component, element: Element) {
  componentNames.push(component.name);
  $(`#${element.id}`).load(`/static/html/components/${component.html}`, () => {
    if (component.css != undefined) {
      component.css.forEach((css) => {
        $("head").append(
          $('<link rel="stylesheet" type="text/css" />').attr(
            "href",
            `/src/css/components/${css}`
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

export function deleteComponentByName(name: string) {
  const index = componentNames.indexOf(name);
  $(`#${currentPage.components[index]}`).empty();
  $(`#${currentPage.components[index]}`).remove();
  delete currentPage.components[index];
  delete componentNames[index];
}
