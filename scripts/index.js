let editProfileButton = document.querySelector('.profile__edit-button')
let popupCloseButton = document.querySelector('.popup__close-button')
let popupSubmitButton = document.querySelector('.popup__submit-button')

let popup = document.querySelector('.popup')
let userNameField = document.querySelector('.popup__field_type_user-name')
let userDescrField = document.querySelector('.popup__field_type_user-description')

editProfileButton.addEventListener('click', ()=>{
  popup.classList.add('popup_active')
  userNameField.value = document.querySelector('.profile__name').textContent
  userDescrField.value = document.querySelector('.profile__description').textContent
}
)

popupCloseButton.addEventListener ('click', () => {
  popup.classList.remove('popup_active')
}
)

popupSubmitButton.addEventListener('click', () => {
  document.querySelector('.profile__name').textContent = userNameField.value
  document.querySelector('.profile__description').textContent = userDescrField.value
  popup.classList.remove('popup_active')
}
)