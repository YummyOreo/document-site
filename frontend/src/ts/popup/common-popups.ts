import { PopupDefault } from "../types/classes";
import * as popupController from "./popup-controller";

export function closeOnClick(id: string, delPopup: boolean = true) {
  $(`#popup-${id}`).on("click", (event) => {
    if (!popupController.isOpen(id)) return;
    if (event.target.classList.contains("popup-outer")) {
      popupController.hidePopup(id);
      // let the animation play
      setTimeout(() => {
        if (delPopup) popupController.deletePopup(id);
      }, 300);
    }
  });
}

export function makeImagePopup(image: string = null): string {
  const popup = new PopupDefault(
    "90%",
    "90%",
    "var(--background-color-3)",
    "image.html",
    "image.css"
  );
  popup.makeFunc = (popup: PopupDefault) => {
    closeOnClick(popup.id);

    $(`#popup-${id} img`)
      .on("load", () => {
        $(`#popup-${id} span`).remove();
      })
      .on("error", (e) => {
        $(`#popup-${id} span`)[0].innerText = "Image failed to load";
        $(`#popup-${id} img`).remove();
      })
      .attr("src", image);
  };
  const id = popupController.makePopup(popup);

  return id;
}
