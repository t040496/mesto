
import { Popup } from './Popup.js';


export class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
    this._submitFormButtonElement = this._formElement.querySelector('.popup__button');
    this._inputList = this._formElement.querySelectorAll('.popup__form-item');
    this._submitFormButtonText = this._submitFormButtonElement.textContent;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  _getInputValues() {

    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    this._formElement.reset();
    super.close();
  }
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {

      this._submitFormButtonElement.textContent = loadingText;
    } else {
      this._submitFormButtonElement.textContent = this._submitFormButtonText;
    }
  }
}
