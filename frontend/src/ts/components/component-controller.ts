import { DefaultComponent } from "../types/classes";
import { FooterCompenent, NavbarCompenent } from "./classes/";
import * as folder from "../constants/folder";

export const loadedCss: string[] = [];

export const allComponents: { [name: string]: typeof DefaultComponent } = {
  footer: FooterCompenent,
  navbar: NavbarCompenent,
};

export const loadedComponents: { [name: string]: DefaultComponent } = {};

export class component extends HTMLElement {
  componentName: string;
  componentClass: import("d:/Desktop 2/document site/frontend/src/ts/types/classes").DefaultComponent;
  constructor() {
    super();
    this.componentName = this.attributes.getNamedItem("name").value;
    this.componentClass = new allComponents[this.componentName]();

    this.id = this.componentName;

    this.loadComponent(this.componentClass);
  }

  loadComponent(component: DefaultComponent) {
    $(`#${this.id}`).load(`${folder.htmlComponents}${component.html}`, () => {
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
}
