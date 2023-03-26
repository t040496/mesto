
import { Popup } from './Popup.js';


export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image') // изображение в зуме
    this._popupCaption = this._popup.querySelector('.popup__image-subtitle'); // надпись изображения
  }

  open(cardName, cardLink) {

    this._popupImage.src = cardLink;
    this._popupImage.alt = cardName;
    this._popupCaption.textContent = cardName;
    super.open();
  }
}
