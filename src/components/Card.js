class Card {
  constructor({name, link, likes, owner, _id}, template, handleCardClick, handleCardDelete, handleCardLike, userId) {
    //данные, которые пришли в констр-р, сохр-ем в свойства
    this._name = name;
    this._link = link;
    this._likeCount = likes.length || 0;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    this._template = template;
    this._userId = userId;
    this._cardId = _id;
    this._cardOwnerId = owner._id
    this._likes = likes;
  }

  _getTemplate() {
    const card = document.querySelector(this._template).content.querySelector('.elements__item').cloneNode(true);
    return card;
  }

  _setData() {

    this._cardImage.src = this._link;
    const titleElement = this._newCard.querySelector('.elements__title');
    titleElement.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardLikes.textContent = this._likeCount;
    console.log(this._cardId, this._userId)
    if (this._cardOwnerId !== this._userId){
      this._deleteButton.remove();
    }
    if (this._likes.find((user) => user._id === this._userId)) this._likeCard();
  }



  _likeCard = () => {
    this._buttonLike.classList.toggle('elements__like_active')
  }
  _getCardImage() {

    const cardImage = this._newCard.querySelector('.elements__image');

    return cardImage;
  }
  _getLikeCounter(){
    const likeCounter = this._newCard.querySelector('.elements__like-counter')
    return likeCounter
  }
  _getDeleteButton(){
    const deleteButton = this._newCard.querySelector('.elements__button')
    return deleteButton
  }

  _getLikeButton(){

    const likeButton = this._newCard.querySelector('.elements__like');
    return likeButton;
  }
  _setEventListeners() {

    this._deleteButton.addEventListener('click', () => { this._handleCardDelete(this) })


    this._buttonLike.addEventListener('click', () => { this._handleCardLike(this) })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });

  }

  getView() {
    this._newCard = this._getTemplate();
    this._cardImage = this._getCardImage();
    this._cardLikes = this._getLikeCounter();
    this._deleteButton = this._getDeleteButton();
    this._buttonLike = this._getLikeButton();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }

  deleteCard() {
    this._newCard.remove();
    this._newCard = null;

  }

  updateLikeCounter(card) {
    const likeCount = card.likes.length;
    this._cardLikes.textContent = likeCount;
    this._likes = card.likes;
    this._likeCard();
  }

  getCardId(){
    return this._cardId;
  }

  get likes(){
    return this._likes;
  }
}

export default Card;

