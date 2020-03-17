import { ERROR_POPUP } from "../constants/Constants.js";

class ErrorPopup {
  constructor(error) {
    this.error = error;
  }

  showError() {
    ERROR_POPUP.textContent = this.error;
    ERROR_POPUP.classList.add("error__popup_shown");
    setTimeout(() => ERROR_POPUP.classList.remove("error__popup_shown"), 6000);
  }
}

export const errorPopup = new ErrorPopup();
