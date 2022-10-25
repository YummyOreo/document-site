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
  shadowId: number;
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
      this.loadDefault();

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
      .find(".group-settings-button")
      .on("click", () => {
        this.showSettingsMenu();
      });

    $(".group-name").on("propertychange input", () => {
      this.group.name = $(".group-name").val().toString();
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

  loadDefault() {
    this.group = {
      name: undefined,
      color: "#b9bbbe",
      position: store["groups"].length,
    };
    this.shadowId = Object.keys(store["newGroups"]).length;
    store["newGroups"][this.shadowId] = this.group;
    store["groups"].push(this.group);
    console.log(store);
  }

  click() {
    $(this.element).find(".group-name").css("color", this.group.color);
  }

  unClick() {
    $(this.element).find(".group-name").css("color", "Unset");
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
      $(".color").css("color", this.group.color);
      $("#color").val(this.group.color.toLowerCase());

      // find way around this, it only finds the first one, maybe $
      $("#color").on("propertychange input", () => {
        const val = $("#color").val().toString();

        this.group.color = val;
        $(".color").css("color", val);
      });

      closeOnClick(popup);
    };

    makePopup(popup);
    showPopup(popup);
  }
}
