function enableButton(buttonElement, pageSelectors){
  buttonElement.disabled = false
  buttonElement.classList.remove(pageSelectors.inactiveButtonClass)
}

function disableButton(buttonElement, pageSelectors){
  buttonElement.disabled = true
  buttonElement.classList.add(pageSelectors.inactiveButtonClass)
}

function hasInvalidInput(inputList){
  return inputList.some(inputEl => !inputEl.validity.valid)
}

function toggleButtonState(inputList, buttonElement, pageSelectors){
  hasInvalidInput(inputList) ? disableButton(buttonElement, pageSelectors) : enableButton(buttonElement, pageSelectors)
}

function showInputError(formElement, inputElement, errorMessage, pageSelectors) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`)
    inputElement.classList.add(pageSelectors.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(pageSelectors.errorClass)
  }

export function hideInputError(formElement, inputElement, pageSelectors) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`)
    inputElement.classList.remove(pageSelectors.inputErrorClass)
    errorElement.textContent = ''
    errorElement.classList.remove(pageSelectors.errorClass)
  }

  function checkInputValidity(formElement, inputElement, pageSelectors){
    if (!inputElement.validity.valid) {showInputError(formElement, inputElement, inputElement.validationMessage, pageSelectors)}
    else {hideInputError(formElement, inputElement, pageSelectors)}
  }

  function setEventListeners(formElement, buttonElement, pageSelectors){
    const inputList = Array.from(formElement.querySelectorAll(pageSelectors.inputSelector))
    inputList.forEach(inputElement =>
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, pageSelectors)
        toggleButtonState(inputList, buttonElement, pageSelectors)
      }
      )
    )
  }

  function enableValidation(pageSelectors){
    const formList = Array.from(document.querySelectorAll(pageSelectors.formSelector))
    formList.forEach(formElement => {
      const buttonElement = formElement.querySelector(pageSelectors.submitButtonSelector)
      disableButton(buttonElement, pageSelectors)
      formElement.addEventListener('submit', evt => {
        evt.preventDefault()
        disableButton(buttonElement, pageSelectors)
      })
      setEventListeners(formElement, buttonElement, pageSelectors)
    }
    )
  }

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__field_state_error',
  errorClass: 'popup__input-error_active'
})

