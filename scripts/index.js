const closePopupButton = document.querySelector('.popup__close-icon');
const profileButton = document.querySelector('.profile__button-edit');
//const savePopupButton = document.querySelector('.popup__button');
const popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form');
//Находим поля формы в DOM
let inputName = document.querySelector('#formName');
let inputAbout = document.querySelector('#formSpecial');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
//открытие попап
function openPopup(event) {
    event.preventDefault();
    popup.classList.add('popup__opened');
    const profileTitleTextContent = profileTitle.textContent;
    const profileSubtitleTextContent = profileSubtitle.textContent;
    inputName.value = profileTitleTextContent;
    inputAbout.value = profileSubtitleTextContent;
};

//закрытие попап
function closePopup() {
    popup.classList.remove('popup__opened');
};
// обработчик отправки формы
function handleFormSubmit(evt) {
    evt.preventDefault(); // отменяем стандартную отправку
    const rawFormData = new FormData(evt.target);
    const formData = [...rawFormData.entries()];
    profileTitle.textContent = formData[0][1];
    profileSubtitle.textContent = formData[1][1];
    closePopup();
};


profileButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
form.addEventListener('submit', handleFormSubmit);




