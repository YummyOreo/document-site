import { closeOnClick } from "../../popup/common-popups";
import { makePopup, showPopup } from "../../popup/popup-controller";
import { store } from "../../store";
import { DefaultComponent, PopupDefault } from "../../types/classes";
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

    $(this.element)
      .find(".group-settings")
      .on("click", () => {
        this.showSettingsMenu();
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
    $(this.element).find(".group-name").addClass("group-clicked");
  }

  unClick() {
    $(this.element).find(".group-name").removeClass("group-clicked");
  }

  showSettingsMenu() {
    const popup = new PopupDefault(
      "50%",
      "80%",
      "var(--background-color-3)",
      "group-settings",
      "group-settings.css"
    );

    popup.makeFunc = (popup: PopupDefault) => {
      closeOnClick(popup);
    };

    makePopup(popup);
    showPopup(popup);
  }
}
