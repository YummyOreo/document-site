import { PopupDefault } from "../types/classes";

export const popups: { [name: string]: PopupDefault } = {};

export let currentOpen: string[] = [];

export const loadedCss: string[] = [];

export function makePopup(popup: PopupDefault): string {
  const lastId = parseInt(Object.keys(popups)[Object.keys(popups).length - 1]);

  let currentId = (lastId + 1).toString();
  if (currentId == "NaN") {
    currentId = "0";
  }

  popups[currentId] = popup;

  const defaultPopup = `<div class="popup-outer" id="popup-${currentId}"><div class="popup-inner" id="popup-${currentId}"></div></div>`;

  $(".main").append(defaultPopup);

  popup.assignId(currentId);
  popup.makePopup();
  $(`#popup-${popup.id}.popup-inner`).css({
    "background-color": popup.color,
    width: popup.sizeWidth,
    height: popup.sizeHeight,
  });
  return currentId;
}

export function showPopup(id: string) {
  if (currentOpen.includes(id)) return;
  $("body").addClass("stop-scroll");
  popups[id].showPopup();
  currentOpen.push(id);
}

export function hidePopup(id: string) {
  if (!currentOpen.includes(id)) return;

  $("body").removeClass("stop-scroll");
  popups[id].hidePopup();
  currentOpen = currentOpen.filter((data) => data != id);
}

export function deletePopup(id: string) {
  delete popups[id];
  $(`#popup-${id}.popup-outer`).empty();
  $(`#popup-${id}.popup-outer`).remove();

  if (!currentOpen.includes(id)) return;

  currentOpen = currentOpen.filter((data) => data != id);
}

// closes the last opened popup
export function closeLastOpened() {
  const id = currentOpen[currentOpen.length - 1];
  hidePopup(id);
}

export function deleteLastOpened() {
  const id = currentOpen[currentOpen.length - 1];
  hidePopup(id);
  deletePopup(id);
}

export function isOpen(id: string) {
  return currentOpen.includes(id);
}
