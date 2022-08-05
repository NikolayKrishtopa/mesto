import Popup from "./Popup";

export default class PopupConfirm extends Popup{
  constructor(popupSelector, config, removeCardElement){
    super(popupSelector)
    this._config = config
    this._confirmButton = this._popup.querySelector(this._config.confirmButtonSelector)
    this._cancelButton = this._popup.querySelector(this._config.cancelButtonSelector)
    this._confirmButtonInitialText = this._confirmButton.textContent
    this._cancelButtonInitialText = this._cancelButton.textContent
    this._removeCardElement = removeCardElement
  }

  open(cardElement){
    this._cardElement = cardElement
    super.open()
    // console.log(this._cardElement)
  }

  renderLoading(isLoading){
    if (isLoading){
      this._confirmButton.textContent = 'Сохранение...'
      this._cancelButton.textContent = 'Сохранение...' 
      } 
    else {
      this._confirmButton.textContent = this._confirmButtonInitialText
      this._cancelButton.textContent = this._cancelButtonInitialText
    }
  }

  _handleCloseByClick = evt => {
    if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__close-button') || evt.target === this._cancelButton)
    {
      this.close()
    }
  }

  _submit = (evt) => {
    if (evt.key==='Enter' || evt.pointerType)
    {this._removeCardElement(this._cardElement)
    this.close()}
  }

  setEventListeners(){
    super.setEventListeners()
    this._confirmButton.addEventListener('click', this._submit)
    document.addEventListener('keydown', this._submit)
  }

  removeEventListeners(){
    super.removeEventListeners()
    this._confirmButton.removeEventListener('click', this._submit)
    document.removeEventListener('keydown', this._submit)
  }

  }
