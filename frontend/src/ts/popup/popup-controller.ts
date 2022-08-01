import { PopupDefault } from "../types/classes";

export const popups: { [name: string]: PopupDefault } = {};

export function makePopup(popup: PopupDefault): string {
  const lastKey = parseInt(Object.keys(popups)[Object.keys(popups).length - 1]);

  const currentNum = lastKey == NaN ? (lastKey + 1).toString() : "0";

  popups[currentNum] = popup;

  const defaultPopup = `<div class="popup-outer" id="popup-${currentNum}"><div class="popup-inner" id="popup-${currentNum}"></div></div>`;

  $(".main").append(defaultPopup);

  popup.assignNumber(currentNum);
  popup.makePopup();
  return currentNum;
}

export function showPopup(index: string) {
  popups[index].showPopup();
}

export function hidePopup(index: string) {
  popups[index].hidePopup();
}

export function deletePopup(index: string) {
  delete popups[index];
  $(`#popup-${index}.popup-outer`).empty();
  $(`#popup-${index}.popup-outer`).remove();
}
