import { cardsSection } from "../pages";
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

  open(card){
    this._card = card
    super.open()
  }

  renderLoading(isLoading){
    if (isLoading){
      this._confirmButton.textContent = 'Сохранение...'
      } 
    else {
      this._confirmButton.textContent = this._confirmButtonInitialText
    }
  }

  setEventListeners(){
    super.setEventListeners()
    this._confirmButton.addEventListener('click', () => {
      this._removeCardElement(this._card)
      this.close()
    })
    this._cancelButton.addEventListener('click', ()=>this.close())
  }
  }
