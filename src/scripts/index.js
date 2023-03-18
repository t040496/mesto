import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const validationConfig = {
  formSelector: '.popup__form', //блок форм
  inputSelector: '.popup__form-item', // поля инпут
  submitButtonSelector: '.popup__button', //кнопка
  inactiveButtonClass: 'popup__button_invalid', //кнопка в неактивном состоянии
  inputErrorClass: 'popup__form-item_type_error', // ищем строки с инпутом в состоянии ошибки
  errorClass: 'popup__form-item_error_visible' //делаем строки span с тектом ошибок видимыми
};
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector('.elements');
const closePopupButtons = document.querySelectorAll('.popup__close-icon');
const closePopupProfileButton = document.querySelector('#buttonCloseProfile')
const profileButton = document.querySelector('.profile__button-edit');
//const savePopupButton = document.querySelector('.popup__button');
const profilePopup = '#profilePopup';

const profileForm = document.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title'); // в верстке секции profile
const profileSubtitle = document.querySelector('.profile__subtitle'); // в верстке секции profile
const inputName = document.querySelector('#formName'); // инпут в попапе
const inputAbout = document.querySelector('#formSpecial'); // инпут в попапе
const popupBigImage = '#popup-gallery';
const popupBigImageZoom = document.querySelector('.popup__image') // изображение в зуме
const popupBigImageName = document.querySelector('.popup__image-subtitle'); // надпись изображения
const addCardPopupSelector = '#addCardForm'// исправил название
const addCardPopupElement = document.querySelector(addCardPopupSelector)
const addButton = document.querySelector('.profile__button-add'); // кнопка добавления карточек
const template = '#elements__item-template';
const inputTitle = document.querySelector('#formTitle');
const inputLink = document.querySelector('#formLink');
const popups = document.querySelectorAll('.popup');
const submitButtonPopup = document.querySelector('.popup__button')

const userInfo = new UserInfo({
  profileTitleSelector: '.profile__title',
  profileSubtitleSelector: '.profile__subtitle'
});

// function openPopup(event) {

//   event.classList.add('popup_opened');
//   document.addEventListener('keyup', handleEscPopup);
// };

// function closePopup(popElement) {
//   popElement.classList.remove('popup_opened');
//   document.removeEventListener('keyup', handleEscPopup);
// };
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
}, addCardPopupSelector);
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
    const card = new Card (item.name, item.link, '#elements__item-template', handleCardClick);
    const cardElement = card.getView();
    cardList.addItem(cardElement);
  }
}, '.elements');

cardList.renderItems();







const validationFormEditProfile = new FormValidator(validationConfig, profileForm);
validationFormEditProfile.enableValidation();

const validationFormAddCard = new FormValidator(validationConfig, addCardPopupElement);
validationFormAddCard.enableValidation();
