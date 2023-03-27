import { Popup } from './Popup.js';


export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._submitFormButtonElement = this._formElement.querySelector('.popup__button');
    this._submitFormButtonText = this._submitFormButtonElement.textContent;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }

  handleFormSubmit(func) {
    this._handleFormSubmit = func;
  }

  renderLoading(isLoading, loadingText='Удаление...') {
    if (isLoading) {
      this._submitFormButtonElement.textContent = loadingText;
    } else {
      this._submitFormButtonElement.textContent = this._submitFormButtonText;
    }
  }
}
