import { PopupDefault } from "../types/classes";

export let popups: PopupDefault[] = [];

export let currentOpen: PopupDefault[] = [];

export const loadedCss: string[] = [];

export function makePopup(popup: PopupDefault): PopupDefault {
  const lastId = parseInt(Object.keys(popups)[Object.keys(popups).length - 1]);

  let currentId = (lastId + 1).toString();
  if (currentId == "NaN") {
    currentId = "0";
  }

  popups.push(popup);

  const baseHtml = `<div class="popup-outer" id="popup-${currentId}"><div class="popup-inner" id="popup-${currentId}"></div></div>`;

  $(".main").append(baseHtml);

  popup.id = currentId;
  popup.makePopup();

  $(`#popup-${popup.id}.popup-inner`).css({
    "background-color": popup.color,
    width: popup.width,
    height: popup.height,
  });

  return popup;
}

export function showPopup(popup: PopupDefault) {
  if (isOpen(popup)) return;
  $("body").addClass("stop-scroll");
  popup.showPopup();
  currentOpen.push(popup);
}

export function hidePopup(popup: PopupDefault) {
  if (!isOpen(popup)) return;

  $("body").removeClass("stop-scroll");
  popup.hidePopup();
  currentOpen = currentOpen.filter((data) => data != popup);
}

export function deletePopup(popup: PopupDefault) {
  popups = popups.filter((data) => data != popup);
  $(`#popup-${popup.id}.popup-outer`).empty();
  $(`#popup-${popup.id}.popup-outer`).remove();

  if (!isOpen(popup)) return;

  currentOpen = currentOpen.filter((data) => data != popup);
}

export function closePopup(popup: PopupDefault) {
  if (!isOpen(popup)) return;

  hidePopup(popup);

  setTimeout(() => {
    deletePopup(popup);
  }, 300);
}

export function isOpen(popup: PopupDefault) {
  return currentOpen.includes(popup);
}
