import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import '../pages/index.css'; // добавьте импорт главного файла стилей
import {
  initialCards,
  template,
  addButton,
  profileButton,
  profilePopup,
  profileForm,
  popupBigImage,
  modalAddForm,
  modalAddPlaceForm,
  validationConfig
} from '../utils/constants.js';




const userInfo = new UserInfo({
  profileTitleSelector: '.profile__title',
  profileSubtitleSelector: '.profile__subtitle'
});

const editProfilePopup = new PopupWithForm({
  handleFormSubmit: (userData) => {
    userInfo.setUserInfo(userData);
    editProfilePopup.close();
  }
}, profilePopup);
editProfilePopup.setEventListeners();

profileButton.addEventListener('click', function () {
  editProfilePopup.open();
  editProfilePopup.setInputValues(userInfo.getUserInfo());
})

const popupAddCard = new PopupWithForm({
  handleFormSubmit: (placeData) => {
    const newCard = createCard(placeData);
    cardList.addItem(newCard);
    popupAddCard.close();
  }
}, modalAddForm);
popupAddCard.setEventListeners();



addButton.addEventListener('click', function () {
  popupAddCard.open();
})


const createCard = (item) => {
  const card = new Card (item.name, item.link, template, handleCardClick);
  const cardElement = card.getView();
  return cardElement;
}

const popupWithImage = new PopupWithImage(popupBigImage);
popupWithImage.setEventListeners();

const handleCardClick = (cardTitleElement, cardImageElement) => {
  popupWithImage.open(cardTitleElement, cardImageElement);
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item))
  }
}, '.elements');

cardList.renderItems();







const validationFormEditProfile = new FormValidator(validationConfig, profileForm);
validationFormEditProfile.enableValidation();

const validationFormAddCard = new FormValidator(validationConfig, modalAddPlaceForm);
validationFormAddCard.enableValidation();
