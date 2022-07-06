import {Card} from './Card.js'
import {initialCards} from './initialCards.js'
import {hideInputError} from './validate.js'

const cardsSection = document.querySelector('.place-cards')
const editProfileButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.navigation__add-place-button')
const editProfilePopup = document.querySelector('.popup_type_edit-profile')
const addCardPopup = document.querySelector('.popup_type_add-card')
const editUserNameField = document.querySelector('.popup__field_type_user-name')
const editUserDescrField = document.querySelector('.popup__field_type_user-description')
const addPlaceNameField = addCardPopup.querySelector('.popup__field_type_new-card-title')
const addPlaceLinkField = addCardPopup.querySelector('.popup__field_type_new-card-link')
const profileName = document.querySelector('.profile__name')
const profileDescr = document.querySelector('.profile__description')
const allPopups = Array.from(document.querySelectorAll('.popup'))

const config = {
  cardTemplateSelector: '#place-card-template',
  cardTitleSelector: '.place-card__title',
  cardPictureSelector: 'place-card__photo',
  cardSelector: '.place-card',
  likeButtonSelector: 'place-card__like-button',
  removeButtonSelector: 'place-card__remove-button',
  photoPopupSelector: '.popup_type_picture-full-screen',
  popupSelector: 'popup',
  popupTitleSelector: '.popup__title'
}


// функции открытия и закрытия всплывающего окна

 function closeByEsc(evt){
if (evt.key === 'Escape') {
  const openedPopup = document.querySelector('.popup_active')
  closePopup(openedPopup)
}
 }

 function openPopup (popup) {
  popup.classList.add('popup_active')
  document.addEventListener('keydown', closeByEsc)
}

function closePopup (popup) {
  popup.classList.remove('popup_active')
  document.removeEventListener('keydown', closeByEsc)
}

// Добавление исходных карточек на страницу
initialCards.forEach(cardItem => {
  const card = new Card(cardItem, config)
  cardsSection.append(card.generateCard())
  
})


// ***РЕАЛИЗАЦИЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ***

// Логика работы кнопки редактирования профиля

editProfileButton.addEventListener('click', ()=>{
   //обнуление полей ошибок на случай закрытия формы без сохранения с активным полем ошибки
  //чтоб не было ошибки при повторном открытии
  const popupInputsList = editProfilePopup.querySelectorAll('.popup__field')
  popupInputsList.forEach(input => hideInputError(editProfilePopup, input,
    {inputErrorClass: 'popup__field_state_error', errorClass: 'popup__input-error_active'}))
  //основной функционал открытия окна редактирование профиля
  openPopup(editProfilePopup)
  editUserNameField.value = profileName.textContent
  editUserDescrField.value = profileDescr.textContent
}
)

allPopups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__close-button'))
      {
        closePopup(popup)
      }
  })
})

// Сохранение новых данных пользователя при нажатии кнопки Сохранить
  editProfilePopup.querySelector('.popup__form_type_edit-profile').addEventListener('submit', (evt) => {
  profileName.textContent = editUserNameField.value
  profileDescr.textContent = editUserDescrField.value
  closePopup(editProfilePopup)
  evt.preventDefault()
}
)

// ***ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК***

addCardButton.addEventListener('click', (evt) => {
  //обнуление полей ошибок на случай закрытия формы без сохранения с активным полем ошибки
  //чтоб не было ошибки при повторном открытии
  const popupInputsList = addCardPopup.querySelectorAll('.popup__field')
  popupInputsList.forEach(input => hideInputError(addCardPopup, input,
    {inputErrorClass: 'popup__field_state_error', errorClass: 'popup__input-error_active'}))
  //основной функционал открытия окна редактирование профиля
  addPlaceNameField.closest('.popup__form').reset()
  openPopup(addCardPopup)
}
)

addCardPopup.addEventListener('submit', (evt)=>{
  const newCardName = addPlaceNameField.value
  const newCardLink = addPlaceLinkField.value
  cardsSection.prepend(createCard({name: newCardName, link: newCardLink, alt: 'Описание не указано.'}))
  closePopup(addCardPopup)
  evt.preventDefault()
}
)
