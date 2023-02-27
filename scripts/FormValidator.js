export class FormValidator {
  constructor(validationConfig, form) {
    this._formName = form;
    this._inputSelector = validationConfig.inputSelector;
    this._inputList = [...this._formName.querySelectorAll(this._inputSelector)];
    this._submitButtonSelector = this._formName.querySelector(validationConfig.submitButtonSelector);
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
  }

  _setEventListeners() {
    this._toggleButton();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
    this._formName.addEventListener('reset', () => {this._submitButtonSelector.disabled = true});
  }

  _toggleButton() {
    this._hasInvalidInput(this._inputList)
      ? this._submitButtonSelector.disabled = true
      : this._submitButtonSelector.disabled = false
  }

  _checkInputValidity(input) {
    !input.validity.valid
      ? this._showError(input, input.validationMessage)
      : this._hideError(input)
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _hideError(input) {
    const errorElement = this._formName.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _showError(input, errorText) {
    const errorElement = this._formName.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = errorText;
    errorElement.classList.add(this._errorClass);
  }

  resetValidationsErrors = () => {
    this._inputList.forEach((input) => {
      if (input.classList.contains(this._inputErrorClass)) {
        this._hideError(input);
      }
    })
  }

  handleButtonCheckValidity = () => {
    this._toggleButton();
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
