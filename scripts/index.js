import {Card} from './Card.js'
import {initialCards} from './initialCards.js'
import {config} from './config.js'
import {openPopup, closePopup, disableButton, hideInputError, checkStartWithSpace} from './utilites.js'
import {FormValidator} from './FormValidator.js'

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
const formList = Array.from(document.querySelectorAll('.popup__form'))

//Подключение валидации к формам

formList.forEach(formElement => new FormValidator(config, formElement, disableButton, hideInputError, checkStartWithSpace).enableValidation())

// Добавление исходных карточек на страницу
initialCards.forEach(cardItem => {
  const card = new Card(cardItem, config, openPopup)
  cardsSection.append(card.generateCard())
})


// ***РЕАЛИЗАЦИЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ***

// Логика работы кнопки редактирования профиля

editProfileButton.addEventListener('click', ()=>{
  //  обнуление полей ошибок на случай закрытия формы без сохранения с активным полем ошибки
  // чтоб не было ошибки при повторном открытии
  const popupInputsList = editProfilePopup.querySelectorAll('.popup__field')
  popupInputsList.forEach(input => hideInputError(editProfilePopup, input, config))
  // основной функционал открытия окна редактирование профиля
  openPopup(editProfilePopup, config)
  editUserNameField.value = profileName.textContent
  editUserDescrField.value = profileDescr.textContent
}
)

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
  popupInputsList.forEach(input => hideInputError(addCardPopup, input, config))
  //основной функционал открытия окна редактирование профиля
  addPlaceNameField.closest('.popup__form').reset()
  openPopup(addCardPopup, config)
}
)

addCardPopup.addEventListener('submit', (evt)=>{
  const newCardItem = {name: addPlaceNameField.value,
                       link: addPlaceLinkField.value}
  
  const newCard = new Card(newCardItem, config, openPopup)

  cardsSection.prepend(newCard.generateCard())
  closePopup(addCardPopup)
  evt.preventDefault()
}
)
