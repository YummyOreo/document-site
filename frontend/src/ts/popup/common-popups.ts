import { PopupDefault } from "../types/classes";
import * as popupController from "./popup-controller";

export function closeOnClick(popup: PopupDefault, delPopup: boolean = true) {
  $(`#popup-${popup.id}`).on("click", (event) => {
    if (!popupController.isOpen(popup)) return;
    if (event.target.classList.contains("popup-outer")) {
      popupController.hidePopup(popup);
      // let the animation play
      setTimeout(() => {
        if (delPopup) popupController.deletePopup(popup);
      }, 300);
    }
  });
}

export function makeImagePopup(image: string = null): PopupDefault {
  const popup = new PopupDefault(
    "90%",
    "90%",
    "var(--background-color-3)",
    "image.html",
    "image.css"
  );
  popup.makeFunc = (popup: PopupDefault) => {
    closeOnClick(popup);

    $(`#popup-${popup.id} img`)
      .on("load", () => {
        $(`#popup-${popup.id} span`).remove();
      })
      .on("error", (e) => {
        $(`#popup-${popup.id} span`)[0].innerText = "Image failed to load";
        $(`#popup-${popup.id} img`).remove();
      })
      .attr("src", image);
  };
  popupController.makePopup(popup);

  return popup;
}
