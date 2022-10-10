import { store } from "../../store";
import { DefaultComponent } from "../../types/classes";
import { Group } from "../../types/FrontendTypes";

export class GroupSettingComponent extends DefaultComponent {
  name: string;
  html: string;
  css: string[];

  group: Group;
  id: string;
  constructor() {
    super();
    this.name = "groupSetting";
    this.html = "group-setting.html";
    this.css = ["group-setting.css"];
  }

  async run() {
    this.getId();

    // detects if the group is new
    if (this.id == undefined) {
      this.click();
      store["groupClicked"] = this;
    } else {
      this.loadInfo();
    }

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

  getId() {
    try {
      this.id = this.element.attributes.getNamedItem("compId").value;
    } catch {}
  }

  loadInfo() {
    store["groups"].forEach((e: any) => {
      if (e.group._id == this.id) {
        this.group = e.group;
      }
    });

    if (this.group) {
      $(this.element).find(".group-name").val(this.group.name);
    }
  }

  click() {
    $(this.element).find(".group").addClass("group-clicked");
    $(this.element).find(".group").removeClass("group-hover");
  }

  unClick() {
    $(this.element).find(".group").removeClass("group-clicked");
    $(this.element).find(".group").addClass("group-hover");
  }
}
