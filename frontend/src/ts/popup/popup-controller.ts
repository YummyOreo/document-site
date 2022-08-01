import { PopupDefault } from "../types/classes";

const popups: { [name: string]: PopupDefault } = {};

export async function makePopup(popup: PopupDefault): Promise<string> {
  const lastKey = parseInt(Object.keys(popups)[Object.keys(popups).length - 1]);

  const currentNum = lastKey == NaN ? (lastKey + 1).toString() : "0";

  popups[currentNum] = popup;

  const defaultPopup = `<div class="popup-outer" id="popup-${currentNum}"><div class="popup-inner" id="popup-${currentNum}"></div></div>`;

  $(".main").append(defaultPopup);

  popup.assignNumber(currentNum);
  popup.makePopup();
  return currentNum;
}
