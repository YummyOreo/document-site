import { DefaultComponent } from "../types/classes";
import {
  DocumentPrevComponent,
  FooterCompenent,
  GroupSettingComponent,
  NavbarCompenent,
} from "./classes/";
import * as folder from "../constants/folder";

export const loadedCss: string[] = [];

export const allComponents: { [name: string]: typeof DefaultComponent } = {
  footer: FooterCompenent,
  navbar: NavbarCompenent,
  documentPrev: DocumentPrevComponent,
  groupSetting: GroupSettingComponent,
};

export class component extends HTMLElement {
  componentName: string;
  componentClass: import("d:/Desktop 2/document site/frontend/src/ts/types/classes").DefaultComponent;
  num: number;
  constructor() {
    super();
  }

  connectedCallback() {
    this.componentName = this.attributes.getNamedItem("name").value;
    this.componentClass = new allComponents[this.componentName]();
    this.componentClass.element = this;

    this.loadComponent(this.componentClass);
  }

  loadComponent(component: DefaultComponent) {
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

    $(this).load(`${folder.htmlComponents}${component.html}`, () => {
      component.run();
    });
  }
}
