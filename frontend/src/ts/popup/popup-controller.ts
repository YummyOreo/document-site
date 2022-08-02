import { PopupDefault } from "../types/classes";

export const popups: { [name: string]: PopupDefault } = {};

export const loadedCss: string[] = [];

export function makePopup(popup: PopupDefault): string {
  const lastKey = parseInt(Object.keys(popups)[Object.keys(popups).length - 1]);

  let currentNum = (lastKey + 1).toString();
  if (currentNum == "NaN") {
    currentNum = "0";
  }

  popups[currentNum] = popup;

  const defaultPopup = `<div class="popup-outer" id="popup-${currentNum}"><div class="popup-inner" id="popup-${currentNum}"></div></div>`;

  $(".main").append(defaultPopup);

  popup.assignNumber(currentNum);
  popup.makePopup();
  $(`#popup-${popup.num}.popup-inner`).css({
    "background-color": popup.color,
    width: popup.sizeWidth,
    height: popup.sizeHeight,
  });
  return currentNum;
}

export function showPopup(index: string) {
  $("body").addClass("stop-scroll");
  popups[index].showPopup();
}

export function hidePopup(index: string) {
  $("body").removeClass("stop-scroll");
  popups[index].hidePopup();
}

export function deletePopup(index: string) {
  delete popups[index];
  $(`#popup-${index}.popup-outer`).empty();
  $(`#popup-${index}.popup-outer`).remove();
}
