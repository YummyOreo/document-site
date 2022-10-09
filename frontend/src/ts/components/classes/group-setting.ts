import { store } from "../../store";
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

  async run() {
    $(this.element).on("click", () => {
      if (store["groupClicked"] != undefined) {
        store["groupClicked"].unClick();
      }

      if (store["groupClicked"] == this) {
        store["groupClicked"] = undefined;
        return;
      }
      this.click();
      store["groupClicked"] = this;
    });
  }

  click() {
    $(this.element).find(".group").removeClass("group-unclicked");
    $(this.element).find(".group").addClass("group-clicked");
  }

  unClick() {
    $(this.element).find(".group").removeClass("group-clicked");
    $(this.element).find(".group").addClass("group-unclicked");
    setTimeout(() => {
      $(this.element).find(".group").removeClass("group-uncliked");
    }, 1000);
  }
}
