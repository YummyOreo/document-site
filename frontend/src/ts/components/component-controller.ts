import * as folder from "../constants/folder";
import { currentPage } from "../router/page-router";
import { DefaultComponent } from "../types/classes";
import { FooterCompenent } from "./classes/footer";
import { NavbarCompenent } from "./classes/navbar";

export const loadedCss: string[] = [];

export const allComponents: { [name: string]: any } = {
  footer: FooterCompenent,
  navbar: NavbarCompenent,
};

export const loadedComponents: { [name: string]: DefaultComponent } = {};

export async function loadDefaultComponents() {
  if (currentPage.defaultComponents == undefined) return;

  const components = currentPage.defaultComponents;
  for (const i in components) {
    const name = components[i];

    loadedComponents[name] = new allComponents[name]();
  }

  loadComponentns();
}

export async function loadComponentns() {
  for (const componentName in loadedComponents) {
    const component = loadedComponents[componentName];

    const element = document.getElementById(component.name);

    if (element == undefined) {
      console.error("Component does not have a div.");
      deleteComponentByName(componentName);
      continue;
    }
    if (!element.classList.contains("component")) {
      console.error("Component's div does not have the class component");
      deleteComponentByName(componentName);
      continue;
    }

    loadComponent(component, element);
  }
}

export async function loadComponent(
  component: DefaultComponent,
  element: Element
) {
  if (!(component.name in loadedComponents)) {
    loadedComponents[component.name] = component;
  }

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

export function deleteComponentByName(name: string) {
  $(`#${name}`).empty();
  $(`#${name}`).remove();

  delete loadedComponents[name];
}
