// CLASS IMPORT
import { Popup } from './Popup.js';

// POPUP WITH IMAGE CLASS
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  // OPEN POPUP METHOD
  open(cardName, cardLink) {
    const popupBigImageZoom = this._popup.querySelector('.popup__image') // изображение в зуме
    const popupBigImageName = this._popup.querySelector('.popup__image-subtitle'); // надпись изображения
    popupBigImageZoom.src = cardLink;
    popupBigImageZoom.alt = cardName;
    popupBigImageName.textContent = cardName;
    super.open();
  }
}
