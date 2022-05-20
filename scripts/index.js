let editProfileButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupCloseButton = popup.querySelector('.popup__close-button')
let popupSubmitButton = popup.querySelector('.popup__submit-button')
let userNameField = popup.querySelector('.popup__field_type_user-name')
let userDescrField = popup.querySelector('.popup__field_type_user-description')

editProfileButton.addEventListener('click', ()=>{
  popup.classList.add('popup_active')
  userNameField.value = document.querySelector('.profile__name').textContent
  userDescrField.value = document.querySelector('.profile__description').textContent
}
)

popupCloseButton.addEventListener ('click', () => {
  popup.classList.remove('popup_active')
  event.preventDefault()
}
)

popupSubmitButton.addEventListener('click', (event) => {
  document.querySelector('.profile__name').textContent = userNameField.value
  document.querySelector('.profile__description').textContent = userDescrField.value
  popup.classList.remove('popup_active')
  event.preventDefault()
}
)