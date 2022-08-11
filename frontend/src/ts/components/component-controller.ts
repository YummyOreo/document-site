import * as folder from "../constants/folder";
import { currentPage } from "../router/page-router";
import { Component } from "../types/classes";

export let componentNames: string[] = [];
export const loadedCss: string[] = [];

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
  $(`#${element.id}`).load(`${folder.htmlComponents}${component.html}`, () => {
    if (component.css != undefined) {
      component.css.forEach((css) => {
        if (!loadedCss.includes(css)) {
          $("head").append(
            $('<link rel="stylesheet" type="text/css" />').attr(
              "href",
              `${folder.cssComponents}${css}`
            )
          );
          loadedCss.push(css);
        }
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
  $(`#${currentPage.components[index].name}`).remove();
  currentPage.components = currentPage.components.filter(
    (data) => data.name != name
  );
  componentNames = componentNames.filter((data) => data != name);
}
