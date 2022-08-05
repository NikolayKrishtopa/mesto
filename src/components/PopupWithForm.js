import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submit, config){
    super(popupSelector)
    this._submit = submit
    this._config = config
    this.form = this._popup.querySelector(config.formSelector)
    this._inputList= Array.from(this.form.querySelectorAll(this._config.inputSelector))
    this._submitButton = this._popup.querySelector(this._config.submitButtonSelector)
    this._submitButtonInitialText = this._submitButton.textContent
    }

    renderLoading(isLoading){
      isLoading ? this._submitButton.textContent = 'Сохранение...' : this._submitButton.textContent = this._submitButtonInitialText
    }

    close(){
      super.close()
      this.form.reset()
    }

    getInputValues(){
      const inputValues = {}
      this._inputList.forEach(input => inputValues[input.name] = input.value)
      return inputValues
    }
    
    setEventListeners(){
      super.setEventListeners()
      this._popup.addEventListener('submit', this._submit)
    }

    removeEventListeners(){
      super.removeEventListeners()
      this._popup.removeEventListener('submit', this._submit)
    }
} 