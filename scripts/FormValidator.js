export class FormValidator {
  constructor(config, formElement, disableButton, hideInputError, checkStartWithSpace){
    this._config = config
    this._formElement = formElement
    this._buttonElement = formElement.querySelector(config.submitButtonSelector)
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
    this._disableButton = disableButton
    this._hideInputError = hideInputError
    this._checkStartWithSpace = checkStartWithSpace
  }

_enableButton(){
  this._buttonElement.disabled = false
  this._buttonElement.classList.remove(this._config.inactiveButtonClass)
}

_hasInvalidInput(){
  return  this._inputList.some(inputEl => !inputEl.validity.valid)
}

_toggleButtonState(){
  this._hasInvalidInput(this._inputList) ? this._disableButton(this._buttonElement, this._config) : this._enableButton()
}

_showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`)
    inputElement.classList.add(this._config.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._config.errorClass)
  }

_checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {this._showInputError(inputElement, inputElement.validationMessage)}
    else {this._hideInputError(this._formElement, inputElement, this._config)}
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

enableValidation(){
      this._disableButton(this._buttonElement, this._config)
      this._formElement.addEventListener('submit', evt => {
        evt.preventDefault()
        this._disableButton(this._buttonElement, this._config)
      })
      this._setEventListeners()
    }

}
