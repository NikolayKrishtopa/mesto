export default class Card {
  constructor(card, config, handleCardClick, checkIfOwn, openRemoveCardConfirm, handleLikeServer, userId){
    this.cardElement = card
    this.owner = card.owner
    this._config = config
    this._imageLink = card.link
    this._element = this._getTemplate()
    this._image = this._element.querySelector(this._config.cardPictureSelector)
    this._title = card.name
    this._alt = card.alt ? card.alt : 'Описание не указано'
    this._handleCardClick = handleCardClick
    this._userId = userId
    this.isLiked = this._checkOwnLike()
    this._likeCounter = this._element.querySelector(this._config.likeCounterSelector)
    this._likeButton = this._element.querySelector(`.${this._config.likeButtonSelector}`)
    this._removeButton = this._element.querySelector(this._config.removeButtonSelector)
    this._checkIfOwn = checkIfOwn
    this.isOwn = this._checkIfOwn(this.cardElement)
    this._openRemoveCardConfirm = openRemoveCardConfirm
    this._handleLikeServer = handleLikeServer    
  }
  
  renderLikes(){
    if (this.isLiked) {
      this._likeButton.classList.add(`${this._config.likeButtonSelector}_active`)
      this._likeCounter.textContent = this.cardElement.likes.length
      }
      else {
      this._likeButton.classList.remove(`${this._config.likeButtonSelector}_active`)
      this._likeCounter.textContent = this.cardElement.likes.length
    }
  }

  _checkOwnLike(){
    return this.cardElement.likes.filter(e => e._id === this._userId).length !==0
  }

  toggleLike(){
    this.isLiked = !this.isLiked
  }
  
  _handleLike = () => {
    this._handleLikeServer(this.cardElement, this.isLiked, this)
  }

  updateLikesArr(newLikesArr){
    this.cardElement.likes = newLikesArr
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
    this._likeButton.addEventListener('click', this._handleLike)
    this._removeButton.addEventListener('click', () => this._openRemoveCardConfirm(this))
  }

  removeCard(){
    this._element.remove()
  }

  generateCard(){
    this._element.querySelector(this._config.cardTitleSelector).textContent = this._title
    this._element.id = this.cardElement._id
    this._element.querySelector(this._config.cardPictureSelector).src = this._imageLink
    this._element.querySelector(this._config.cardPictureSelector).alt = this._alt
    this.renderLikes()
    this._setEventListeners()
    if (!this.isOwn) {this._removeButton.remove()} 
    return this._element
  }

}
