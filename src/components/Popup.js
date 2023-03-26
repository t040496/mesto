export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  setEventListeners() {
    const popupCloseButtonElement = this._popup.querySelector('.popup__close-icon');
    popupCloseButtonElement.addEventListener('click', () => {this.close()});
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }

  open() {
    document.addEventListener('keyup', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    console.log('close');
    document.removeEventListener('keyup', this._handleEscClose);

    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

}
