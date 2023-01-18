const initialCards = [
  {
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
const closePopupButtonGallery = document.querySelector('#buttonGallery')
const closePopupAddCard = document.querySelector('#buttonCloseCard')
const closePopupProfileButton = document.querySelector('#buttonCloseProfile')
const profileButton = document.querySelector('.profile__button-edit');
//const savePopupButton = document.querySelector('.popup__button');
const profilePopup = document.querySelector('#profilePopup');

const profileForm = document.querySelector('.popup__form');
let profileTitle = document.querySelector('.profile__title');  // в верстке секции profile
let profileSubtitle = document.querySelector('.profile__subtitle'); // в верстке секции profile
const inputName = document.querySelector('#formName'); // инпут в попапе
const inputAbout = document.querySelector('#formSpecial'); // инпут в попапе
const popupBigImage = document.querySelector('#popup-gallery');
const popupBigImageZoom = document.querySelector('.popup__image')   // изображение в зуме
const popupBigImageName = document.querySelector('.popup__image-subtitle'); // надпись изображения
const addCardForm = document.querySelector('#addCardForm'); // исправил название
const addButton = document.querySelector('.profile__button-add'); // кнопка добавления карточек
const template = document.querySelector('#elements__item-template');

const inputTitle = document.querySelector('#formTitle');
const inputLink = document.querySelector('#formLink');

//открытие попап
function openPopup(event) {
    event.classList.add('popup_opened');
};
//закрытие попап
function closePopup(popElement) {
    popElement.classList.remove('popup_opened');
};
// обработчик отправки формы
function handleFormSubmit(evt) {   // handleFormSubmitProfile
    evt.preventDefault(); // отменяем стандартную отправку
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputAbout.value;
    closePopup(profilePopup);
};

profileButton.addEventListener('click', function() {
  openPopup(profilePopup);
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
})
//closePopupProfileButton.addEventListener('click', () => {
//  closePopup(profilePopup)
//});

profileForm.addEventListener('submit', handleFormSubmit);


addButton.addEventListener('click', function() {
  openPopup(addCardForm);
})
function handleFormSubmitCard(event) {
  event.preventDefault();   //
  const cardName = inputTitle.value;
  const cardLink = inputLink.value;
  renderCard(cardName, cardLink);
  closePopup(addCardForm);
  event.target.reset()
};
addCardForm.addEventListener('submit', handleFormSubmitCard);



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
    renderingBigCard(cardName, cardLink);
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



const renderingBigCard = (cardName, cardLink) => {
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
