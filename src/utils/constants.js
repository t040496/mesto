export const validationConfig = {
  formSelector: '.popup__form', //блок форм
  inputSelector: '.popup__form-item', // поля инпут
  submitButtonSelector: '.popup__button', //кнопка
  inactiveButtonClass: 'popup__button_invalid', //кнопка в неактивном состоянии
  inputErrorClass: 'popup__form-item_type_error', // ищем строки с инпутом в состоянии ошибки
  errorClass: 'popup__form-item_error_visible' //делаем строки span с тектом ошибок видимыми
};
export const initialCards = [{
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


export const profileButton = document.querySelector('.profile__button-edit');
export const profilePopup = '#profilePopup';
export const popupBigImage = '#popup-gallery';
export const modalAddForm = '#addCardForm'// исправил название
export const modalAddPlaceForm = document.querySelector(modalAddForm)
export const addButton = document.querySelector('.profile__button-add'); // кнопка добавления карточек
export const editProfilePhotoButton = document.querySelector('.profile__edit-photo'); // кнопка добавления карточек
export const template = '#elements__item-template';
export const profileForm = document.querySelector('.popup__form');
export const deleteCardPopupSelector = '#deleteCardPopup'

export const editProfilePhotoPopupSelector = '#editProfilePhoto';
export const editProfilePhotoForm = document.querySelector('#editProfilePhotoForm');
