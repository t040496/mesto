const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__form-item_error_visible'
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
const profilePopup = document.querySelector('#profilePopup');

const profileForm = document.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title'); // в верстке секции profile
const profileSubtitle = document.querySelector('.profile__subtitle'); // в верстке секции profile
const inputName = document.querySelector('#formName'); // инпут в попапе
const inputAbout = document.querySelector('#formSpecial'); // инпут в попапе
const popupBigImage = document.querySelector('#popup-gallery');
const popupBigImageZoom = document.querySelector('.popup__image') // изображение в зуме
const popupBigImageName = document.querySelector('.popup__image-subtitle'); // надпись изображения
const addCardForm = document.querySelector('#addCardForm'); // исправил название
const addButton = document.querySelector('.profile__button-add'); // кнопка добавления карточек
const template = document.querySelector('#elements__item-template');
const inputTitle = document.querySelector('#formTitle');
const inputLink = document.querySelector('#formLink');
const popups = document.querySelectorAll('.popup');
const submitButtonPopup = document.querySelector('.popup__button')

const handleEscPopup = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

//открытие попап
function openPopup(event) {

  event.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscPopup);
};
//закрытие попап
function closePopup(popElement) {
  popElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscPopup);
};
// обработчик отправки формы
function handleFormSubmitProfile(evt) { //было раньше: handleFormSubmit
  evt.preventDefault(); // отменяем стандартную отправку
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  closePopup(profilePopup);
};



profileButton.addEventListener('click', function () {
  openPopup(profilePopup);
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
})
//closePopupProfileButton.addEventListener('click', () => {
//  closePopup(profilePopup)
//});

profileForm.addEventListener('submit', handleFormSubmitProfile);


addButton.addEventListener('click', function () {
  openPopup(addCardForm);
})

function handleFormCardSubmit(event) { // было раньше handleFormSubmitCard
  event.preventDefault(); //
  const cardName = inputTitle.value;
  const cardLink = inputLink.value;
  renderCard(cardName, cardLink);
  closePopup(addCardForm);
  event.target.reset()
};
addCardForm.addEventListener('submit', handleFormCardSubmit);


//создаем карточку
const createCard = (cardName, cardLink) => {
  const card = template.content.querySelector('.elements__item').cloneNode(true);
  const image = card.querySelector('.elements__image');
  image.src = cardLink;
  card.querySelector('.elements__title').textContent = cardName;
  card.alt = cardName;
  const elements__button = card.querySelector('.elements__button')
  elements__button.addEventListener('click', () => {
    card.remove();
  });
  const buttonLike = card.querySelector('.elements__like')
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('elements__like_active')
  })
  image.addEventListener('click', () => {
    renderBigCard(cardName, cardLink);
  });

  return card;
}
//функция добавления карточек
const renderCard = (cardName, cardLink) => {
  elements.prepend(createCard(cardName, cardLink))
}
//пройтись по массиву, взять элементы, вставить; element - каждый элемент массива initialCards
initialCards.forEach((element) => {
  renderCard(element.name, element.link);
});
// Закрытие попап с добавлением карточек
//closePopupAddCard.addEventListener('click', function() {
//  closePopup(addCardForm)
//})



const renderBigCard = (cardName, cardLink) => {
  popupBigImageZoom.src = cardLink;
  popupBigImageZoom.alt = cardName;
  popupBigImageName.textContent = cardName;
  openPopup(popupBigImage);
}
//ЗАКРЫТИЕ галереи
//closePopupButtonGallery.addEventListener('click', function() {
//  closePopup(popupBigImage)
//})

//способ универсально навесить обработчики крестиков
// находим все крестики проекта по универсальному селектору
closePopupButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});




enableValidation(validationConfig);

//оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains("popup__close-icon")) {
      closePopup(popup);
    }
  })
});
