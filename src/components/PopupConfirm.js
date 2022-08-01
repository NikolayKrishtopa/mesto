import Popup from "./Popup";

export default class PopupConfirm extends Popup{
  constructor(config){
    super(config)
    this._confirmButton = this._popup.querySelector('button')
  }

  open(cardElement){
    this._cardToRemove = cardElement
    super.open()
  }
}