export default class FormValidator {
  constructor(config, formElement, checkStartWithSpace){
    this._config = config
    this._formElement = formElement
    this._buttonElement = formElement.querySelector(config.submitButtonSelector)
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
    this._checkStartWithSpace = checkStartWithSpace
  }

_disableButton(){
  this._buttonElement.disabled = true
  this._buttonElement.classList.add(this._config.inactiveButtonClass)
}

_enableButton(){
  this._buttonElement.disabled = false
  this._buttonElement.classList.remove(this._config.inactiveButtonClass)
}

_hasInvalidInput(){
  return  this._inputList.some(inputEl => !inputEl.validity.valid)
}

_toggleButtonState(){
  this._hasInvalidInput(this._inputList) ? this._disableButton() : this._enableButton()
}

_showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`)
    inputElement.classList.add(this._config.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._config.errorClass)
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`)
    inputElement.classList.remove(this._config.inputErrorClass)
    errorElement.textContent = ''
    errorElement.classList.remove(this._config.errorClass)
  }

_checkInputValidity(inputElement){
  if (!inputElement.validity.valid) {this._showInputError(inputElement, inputElement.validationMessage)}
  else {this._hideInputError(inputElement)}
  }

_setEventListeners(){
    this._inputList.forEach(inputElement =>
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
        this._checkStartWithSpace(inputElement)
      }
      )
    )
  }

resetValidation(){
  this._disableButton()
  this._inputList.forEach(inputElement => this._hideInputError(inputElement))
}

enableValidation(){
      this._setEventListeners()
    }
}
