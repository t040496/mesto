const closePopupButton = document.querySelector('.popup__close-icon');
const profileButton = document.querySelector('.profile__button-edit');
//const savePopupButton = document.querySelector('.popup__button');
const popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
const inputName = document.querySelector('#formName');
const inputAbout = document.querySelector('#formSpecial');
//открытие попап
function openPopup(event) {
    popup.classList.add('popup_opened');
    inputName.value = profileTitle.textContent;
    inputAbout.value = profileSubtitle.textContent;
};

//закрытие попап
function closePopup() {
    popup.classList.remove('popup_opened');
};
// обработчик отправки формы
function handleFormSubmit(evt) {
    evt.preventDefault(); // отменяем стандартную отправку
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputAbout.value;
    closePopup();
};


profileButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
form.addEventListener('submit', handleFormSubmit);




