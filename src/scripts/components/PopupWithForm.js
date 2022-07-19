import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submit, config){
    super(popupSelector)
    this._submit = submit
    this._config = config
    this.form = this._popup.querySelector(config.formSelector)
    }

    close(){
      super.close()
      this.form.reset()
    }

    _getInputValues(){
      const inputs = this.form.querySelectorAll(this._config.inputSelector)
      const inputList = {}
      inputs.forEach( e => inputList[e.name]=e.value)
      return inputList
    }
    
    setEventListeners(){
      super.setEventListeners()
      this._popup.addEventListener('submit', this._submit)
    }
} 