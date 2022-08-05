import { PopupDefault } from "../types/classes.js";
import {
  isOpen,
  deletePopup,
  hidePopup,
  makePopup,
} from "./popup-controller.js";

export function clickClose(id: string, delPopup: boolean = true) {
  $(`#popup-${id}`).on("click", (event) => {
    if (!isOpen(id)) return;
    if (event.target.classList.contains("popup-outer")) {
      hidePopup(id);
      if (delPopup) deletePopup(id);
    }
  });
}

export function makeImagePopup(image: string = null): string {
  const popup = new PopupDefault(
    "90%",
    "90%",
    "var(--background-color-3)",
    "image.html",
    null
  );
  popup.assignMake((popup) => clickClose(popup.id));
  const id = makePopup(popup);
  return id;
}
