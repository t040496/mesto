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
  validationConfig,
  deleteCardPopupSelector,
  editProfilePhotoPopupSelector,
  editProfilePhotoButton,
  editProfilePhotoForm
} from '../utils/constants.js';
import {api} from '../components/Api.js'
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';

const cardList =  new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item))
  }
}, '.elements');


const deleteCardPopup = new PopupWithConfirm(deleteCardPopupSelector);
deleteCardPopup.setEventListeners();

const handleDeleteClick = (card) => {
  deleteCardPopup.open();
  deleteCardPopup.handleFormSubmit(() => {
    deleteCardPopup.renderLoading(true);
    api.deleteCard(card.getCardId())
      .then(() => {
        card.deleteCard();
      })
      .then(() => deleteCardPopup.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => deleteCardPopup.renderLoading(false))
  })
}

const handleCardLike = (card) => {
  console.log(card.likes)
  if (card.likes.find((user) => user._id === userInfo.getUserId())) {
    console.log('delete')
    api.deleteCardLike(card.getCardId())
      .then((cardData) => {
        card.updateLikeCounter(cardData)
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    console.log('set')
    api.setCardLike(card.getCardId())
      .then((cardData) => {
        card.updateLikeCounter(cardData)
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

const userInfo = new UserInfo({
  profileTitleSelector: '.profile__title',
  profileSubtitleSelector: '.profile__subtitle',
  profilePictureSelector: '.profile__image'
});

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
.then((data) => {
  console.log(data)
  userInfo.setUserInfo(data[0])
  cardList.renderItems(data[1]);
})
.catch((err)=>{ //попадаем сюда если один из промисов завершаться ошибкой

  console.log(err);

})

const editProfilePopup = new PopupWithForm({
  handleFormSubmit: (userData) => {
    editProfilePopup.renderLoading(true);
    api.sendUserInfo(userData)
    .then((data) => {
      userInfo.setUserInfo(data);
      editProfilePopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    })
  }
}, profilePopup);
editProfilePopup.setEventListeners();

profileButton.addEventListener('click', function () {
  editProfilePopup.open();
  editProfilePopup.setInputValues(userInfo.getUserInfo());
})

const editProfilePhotoPopup = new PopupWithForm({
  handleFormSubmit: (avatarData) => {
    editProfilePhotoPopup.renderLoading(true);
    api.setUserAvatar(avatarData)
      .then((newAvatarData) => {
        userInfo.setUserInfo(newAvatarData);
        editProfilePhotoPopup.close()
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        editProfilePhotoPopup.renderLoading(false)
      })
  }
}, editProfilePhotoPopupSelector);
editProfilePhotoPopup.setEventListeners();



const popupAddCard = new PopupWithForm({
  handleFormSubmit: (placeData) => {
    popupAddCard.renderLoading(true);
    api.sendNewCardInfo(placeData)
    .then((data) => {
      const newCard = createCard(data);
      cardList.addItem(newCard);
      popupAddCard.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupAddCard.renderLoading(false);
    })

  }
}, modalAddForm);
popupAddCard.setEventListeners();



addButton.addEventListener('click', function () {
  popupAddCard.open();
})

editProfilePhotoButton.addEventListener('click', function () {
  editProfilePhotoPopup.open();
})

const createCard = (item) => {
  const card = new Card (item, template, handleCardClick, handleDeleteClick, handleCardLike, userInfo.getUserId());
  const cardElement = card.getView();
  return cardElement;
}

const popupWithImage = new PopupWithImage(popupBigImage);
popupWithImage.setEventListeners();

const handleCardClick = (cardTitleElement, cardImageElement) => {
  popupWithImage.open(cardTitleElement, cardImageElement);
}

const validationFormEditProfile = new FormValidator(validationConfig, profileForm);
validationFormEditProfile.enableValidation();

const validationFormAddCard = new FormValidator(validationConfig, modalAddPlaceForm);
validationFormAddCard.enableValidation();

const validationFormEditProfilePhoto = new FormValidator(validationConfig, editProfilePhotoForm);
validationFormEditProfilePhoto.enableValidation();
