export default class Card {
  constructor(card, config, handleCardClick){
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
  }
  
  _handleLike = (tgt) => {
    if (this.isLiked) {
    this.isLiked = false
    tgt.classList.remove(`${this._config.likeButtonSelector}_active`)
    }
    else {
    this.isLiked = true
    tgt.classList.add(`${this._config.likeButtonSelector}_active`)
  }
  console.log(this._likes)
  }

  _getTemplate(){
    const cardElement = document
      .querySelector(this._config.cardTemplateSelector)
      .content.querySelector(this._config.cardSelector)
      .cloneNode(true)

    return cardElement
  }

  _setEventListeners(){
    this._element.addEventListener('click', (evt) => {
      const tgt = evt.target
      if (tgt === this._image) {this._handleCardClick(this._title, this._imageLink, this._alt)}
      else if (!tgt.closest('button')){return}
        else if (tgt.closest('button').classList.contains(this._config.likeButtonSelector)){
          this._handleLike(tgt)
        }
        else if (tgt.closest('button').classList.contains(this._config.removeButtonSelector)){
          tgt.closest(this._config.cardSelector).remove()
        }
      }
    )
  }

  generateCard(){
    this._element.querySelector(this._config.cardTitleSelector).textContent = this._title
    this._element.querySelector(this._config.cardPictureSelector).src = this._imageLink
    this._element.querySelector(this._config.cardPictureSelector).alt = this._alt
    this._likeCounter.textContent = this._likes
    this._setEventListeners()
    return this._element
  }

}
