import { ExamlpeCompenent } from "./classes/example.js";
import { Compenent } from "./compenent.js";

export const COMPONENTS = { example: ExamlpeCompenent };

export async function loadComponents() {
  const classes: HTMLCollectionOf<Element> =
    document.getElementsByClassName("component");
  for (const i in classes) {
    if (i == "length") break;
    const element_id: string = classes[i].id;
    const element: Element = classes[i];
    if (COMPONENTS[element_id] !== undefined) {
      const component = new COMPONENTS[element_id]();
      loadComponent(component, element);
    }
  }
}

export async function loadComponent(component: Compenent, element: Element) {
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
