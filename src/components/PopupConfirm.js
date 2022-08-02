import Popup from "./Popup";

export default class PopupConfirm extends Popup{
  constructor(popupSelector, config, removeCardElement){
    super(popupSelector)
    this._config = config
    this._confirmButton = this._popup.querySelector(this._config.confirmButtonSelector)
    this._cancelButton = this._popup.querySelector(this._config.cancelButtonSelector)
    this._removeCardElement = removeCardElement
  }

  open(cardElement){
    this._cardElement = cardElement
    super.open()
    // console.log(this._cardElement)
  }

  _handleCloseByClick = evt => {
    if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__close-button') || evt.target === this._cancelButton)
    {
      this.close()
    }
  }

  _submit = () => {
    this._removeCardElement(this._cardElement)
    this.close()
  }

  setEventListeners(){
    super.setEventListeners()
    this._confirmButton.addEventListener('click', this._submit)
  }

  removeEventListeners(){
    super.removeEventListeners()
    this._confirmButton.removeEventListener('click', this._submit)
  }

  }
