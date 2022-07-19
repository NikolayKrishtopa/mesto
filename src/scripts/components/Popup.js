export default class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector)
  }

open(){
  this._popup.classList.add('popup_active')
  this.setEventListeners()
}

close(){
  this._popup.classList.remove('popup_active')
  this.removeEventListeners()
}

_handleEscClose = evt => {
  if (evt.key === 'Escape') {
  this.close()
  }
}

_handleCloseByClick = evt => {
  if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__close-button'))
  {
    this.close()
  }
}

setEventListeners () {
  document.addEventListener('keydown', this._handleEscClose)
  this._popup.addEventListener('mousedown', this._handleCloseByClick)
}

removeEventListeners(){
    document.removeEventListener('keydown', this._handleCloseByClick)
    this._popup.removeEventListener('mousedown', this._handleEscClose)
  }
}