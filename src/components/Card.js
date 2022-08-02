export default class Card {
  constructor(card, config, handleCardClick, checkIfOwn, openRemoveCardConfirm){
    this._cardElement = card
    this.owner = card.owner
    this._config = config
    this._imageLink = card.link
    this._element = this._getTemplate()
    this._image = this._element.querySelector(this._config.cardPictureSelector)
    this._title = card.name
    this._alt = card.alt ? card.alt : 'Описание не указано'
    this._handleCardClick = handleCardClick
    this.isLiked = false
    this._likeCounter = this._element.querySelector(this._config.likeCounterSelector)
    this._likes = card.likes.length
    this._likeButton = this._element.querySelector(`.${this._config.likeButtonSelector}`)
    this._removeButton = this._element.querySelector(this._config.removeButtonSelector)
    this._checkIfOwn = checkIfOwn
    this.isOwn = this._checkIfOwn(this._cardElement)
    this._openRemoveCardConfirm = openRemoveCardConfirm
  }
  
  _handleLike = () => {
    if (this.isLiked) {
    this.isLiked = false
    this._likeButton.classList.remove(`${this._config.likeButtonSelector}_active`)
    }
    else {
    this.isLiked = true
    this._likeButton.classList.add(`${this._config.likeButtonSelector}_active`)
  }
  }

  _getTemplate(){
    const cardElement = document
      .querySelector(this._config.cardTemplateSelector)
      .content.querySelector(this._config.cardSelector)
      .cloneNode(true)
    return cardElement
  }

  _setEventListeners(){
    this._image.addEventListener('click', () => this._handleCardClick(this._title, this._imageLink, this._alt))
    this._likeButton.addEventListener('click', () => this._handleLike())
    this._removeButton.addEventListener('click', () => this._openRemoveCardConfirm(this._cardElement))
  }

  generateCard(){
    this._element.querySelector(this._config.cardTitleSelector).textContent = this._title
    this._element.querySelector(this._config.cardPictureSelector).src = this._imageLink
    this._element.querySelector(this._config.cardPictureSelector).alt = this._alt
    this._likeCounter.textContent = this._likes
    this._setEventListeners()
    if (!this.isOwn) {this._removeButton.remove()} 
    return this._element
  }

}
