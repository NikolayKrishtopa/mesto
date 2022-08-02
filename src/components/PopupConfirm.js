import Popup from "./Popup";

export default class PopupConfirm extends Popup{
  constructor(popupSelector, config){
    super(popupSelector)
    this._config = config
    this._confirmButton = this._popup.querySelector(this._config.confirmButtonSelector)
    this._cancelButton = this._popup.querySelector(this._config.cancelButtonSelector)
  }

  open(cardElement){
    this._cardToRemove = cardElement
    super.open()
    console.log(this._cardToRemove)
  }

  _handleCloseByClick = evt => {
    if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__close-button') || evt.target === this._cancelButton)
    {
      this.close()
    }
  }
  }
