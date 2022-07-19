import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submit, config){
    super(popupSelector)
    this._submit = submit
    this._config = config
    this._form = this._popup.querySelector(config.formSelector)
    }

    close(){
      super.close()
      this._form.reset()
    }

    _getInputValues(){
      const inputs = this._form.querySelectorAll(this._config.inputSelector)
      const inputList = {}
      inputs.forEach( e => inputList[e.name]=e.value)
      return inputList
    }
    
    setEventListeners(){
      super.setEventListeners()
      this._popup.addEventListener('submit', this._submit)
    }
} 