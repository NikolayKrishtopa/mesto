export default class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector)
  }

open(){
  this._popup.classList.add('popup_active')
  document.addEventListener('keydown', this._handleEscClose)
}

close(){
  this._popup.classList.remove('popup_active')
  document.removeEventListener('keydown', this._handleEscClose)
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
  this._popup.addEventListener('mousedown', this._handleCloseByClick)
}

// removeEventListeners(){
//   this._popup.removeEventListener('mousedown', this._handleCloseByClick)
//   }
}