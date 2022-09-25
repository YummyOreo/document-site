import { DefaultComponent } from "../../types/classes";

export class GroupSettingComponent extends DefaultComponent {
  name: string;
  html: string;
  css: string[];

  compId: string;
  index: number;

  title: string;
  author: string;
  prev: string;

  roles: string[];
  doc: any;
  constructor() {
    super();
    this.name = "groupSetting";
    this.html = "group-setting.html";
    this.css = ["group-setting.css"];
  }

  async run() {}
}
