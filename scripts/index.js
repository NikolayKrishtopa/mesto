let editProfileButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupCloseButton = popup.querySelector('.popup__close-button')
let userNameField = popup.querySelector('.popup__field_type_user-name')
let userDescrField = popup.querySelector('.popup__field_type_user-description')

const showContent = (obj, cls) => obj.classList.add(cls)
const hideContent = (obj, cls) => obj.classList.remove(cls)

editProfileButton.addEventListener('click', ()=>{
  showContent(popup, 'popup_active')
  userNameField.value = document.querySelector('.profile__name').textContent
  userDescrField.value = document.querySelector('.profile__description').textContent
}
)

popupCloseButton.addEventListener ('click', () => hideContent(popup, 'popup_active'))

popup.querySelector('.popup__edit-profile-form').addEventListener('submit', (evt) => {
  document.querySelector('.profile__name').textContent = userNameField.value
  document.querySelector('.profile__description').textContent = userDescrField.value
  hideContent(popup, 'popup_active')
  evt.preventDefault()
}
)