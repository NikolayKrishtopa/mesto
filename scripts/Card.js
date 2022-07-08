export class Card {
  constructor(card, config, openPopup){
    this._image = card.link
    this._title = card.name
    this._alt = card.alt ? card.alt : 'Описание не указано'
    this._config = config
    this._popup = document.querySelector(this._config.photoPopupSelector)
    this._openPopup = openPopup 
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
        if (tgt.classList.contains(this._config.cardPictureSelector)){
          this._openPopup(this._popup, this._config)
          this._popupImage = this._popup.querySelector('.popup__photo')
          this._popupTitle = this._popup.querySelector(this._config.popupTitleSelector)
          this._popupImage.src = tgt.src
          this._popupImage.alt = tgt.alt
          this._popupTitle.textContent = tgt.closest(this._config.cardSelector).querySelector(this._config.cardTitleSelector).textContent
        }
        else if (!tgt.closest('button')){return}
        else if (tgt.closest('button').classList.contains(this._config.likeButtonSelector)){
          tgt.classList.toggle(`${this._config.likeButtonSelector}_active`)
        }
        else if (tgt.closest('button').classList.contains(this._config.removeButtonSelector)){
          tgt.closest(this._config.cardSelector).remove()
        }
      }
    )
  }

  generateCard(){
    this._element = this._getTemplate()
    this._element.querySelector(this._config.cardTitleSelector).textContent = this._title
    this._element.querySelector(`.${this._config.cardPictureSelector}`).src = this._image
    this._element.querySelector(`.${this._config.cardPictureSelector}`).alt = this._alt
    this._setEventListeners()
    return this._element
  }

}
