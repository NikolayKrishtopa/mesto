import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector, config){
    super(popupSelector)
    this._image = this._popup.querySelector(config.popupPhotoSelector)
    this._title = this._popup.querySelector(config.popupTitleSelector)
    }
    open(title, link, alt){
      super.open()
      this._title.textContent = title
      this._image.src = link
      this._image.alt = alt
    }
}