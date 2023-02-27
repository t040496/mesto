class Card {
  constructor(name, link, template, renderBigCard) {
    //данные, которые пришли в констр-р, сохр-ем в свойства
    this._name = name;
    this._link = link;
    this._renderBigCard = renderBigCard;
    this._template = template;
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
  }

  _deleteCard() {
     console.log(this._newCard)
    this._newCard.remove();
    this._newCard = null;

  }

  _likeCard(button) {
    button.classList.toggle('elements__like_active')
  }
  _getCardImage() {

    const cardImage = this._newCard.querySelector('.elements__image');

    return cardImage;
  }
  _setEventListeners() {
    const elements__button = this._newCard.querySelector('.elements__button');
    elements__button.addEventListener('click', () => { this._deleteCard() })

    const buttonLike = this._newCard.querySelector('.elements__like');
    buttonLike.addEventListener('click', () => { this._likeCard(buttonLike) })

    this._cardImage.addEventListener('click', () => {
      this._renderBigCard(this._name, this._link)
    });
  }

  getView() {
    this._newCard = this._getTemplate();
    this._cardImage = this._getCardImage();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}

export default Card;

