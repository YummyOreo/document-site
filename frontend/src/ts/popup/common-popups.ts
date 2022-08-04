import { checkIsOpen, deletePopup, hidePopup } from "./popup-controller.js";

export function clickClose(id: string, delPopup: boolean = true) {
  $(`#popup-${id}`).on("click", (event) => {
    if (!checkIsOpen(id)) return;
    if (event.target.classList.contains("popup-outer")) {
      hidePopup(id);
      if (delPopup) deletePopup(id);
    }
  });
}

export function makeImagePopup(image: string): string {
  return "";
}
