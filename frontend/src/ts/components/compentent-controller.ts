import { currentPage } from "../router/page-router.js";
import { Component } from "../types/classes.js";

export let componentNames: string[] = [];

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
  if (!currentPage.components.includes(component))
    currentPage.components.push(component);
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
  $(`#${currentPage.components[index].name}`).empty();
  currentPage.components = currentPage.components.slice(index, index);
  componentNames = componentNames.slice(index, index);
}
