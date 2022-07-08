function closeByEsc(evt){
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_active')
      closePopup(openedPopup)
    }
     }

function closePopup (popup) {
        popup.classList.remove('popup_active')
        document.removeEventListener('keydown', closeByEsc)
        popup.removeEventListener('mousedown', closeByOverlay)
      }

function closeByOverlay(evt) {
        const openedPopup = document.querySelector('.popup_active')
        if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__close-button'))
        {
          closePopup(openedPopup)
        }
    }

function openPopup (popup, config) {
      popup.classList.add(`${config.popupSelector}_active`)
      document.addEventListener('keydown', closeByEsc)
      popup.addEventListener('mousedown', closeByOverlay)
    }

function disableButton(buttonElement, config){
      buttonElement.disabled = true
      buttonElement.classList.add(config.inactiveButtonClass)
    }

function hideInputError (formElement, inputElement, config) {
      const errorElement = formElement.querySelector(`.${inputElement.name}-error`)
      inputElement.classList.remove(config.inputErrorClass)
      errorElement.textContent = ''
      errorElement.classList.remove(config.errorClass)
    }

function checkStartWithSpace (inputElement){
  inputElement.value.startsWith(' ') ? inputElement.value = inputElement.value.slice(1) : null
}

    export {closeByEsc, closePopup, openPopup, disableButton, hideInputError, checkStartWithSpace}