import Card from '../components/Card.js'
import initialCards from '../utils/initialCards.js'
import config from '../utils/config.js'
import { checkStartWithSpace, handleCardClick } from '../utils/utilis.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'

const addCardPopup = new PopupWithForm(config.addCardPopupSelector)
const editProfilePopup = new PopupWithForm(config.editProfilePopupSelector)
export const bigPhotoPopup = new PopupWithImage(config.photoPopupSelector, config)

const addPlaceNameField = document.querySelector('.popup__field_type_new-card-title')
const addPlaceLinkField = document.querySelector('.popup__field_type_new-card-link')
const editProfileButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.navigation__add-place-button')
const editUserNameField = document.querySelector('.popup__field_type_user-name')
const editUserDescrField = document.querySelector('.popup__field_type_user-description')
const profileName = document.querySelector('.profile__name')
const profileDescr = document.querySelector('.profile__description')
const formList = Array.from(document.querySelectorAll('.popup__form'))
const addPlaceForm = addPlaceNameField.closest('.popup__form')
const editProfileForm = editUserNameField.closest('.popup__form')




//Подключение валидации к формам
const pageFormValidators = {}

function enableValidation(){
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement, checkStartWithSpace)
    const validatorName = formElement.name
    pageFormValidators[validatorName] = validator
    validator.enableValidation()    
  })
}

enableValidation()

// Создание секции с карточками
const cardsSection = new Section({
  items: initialCards,
  renderer: item => {
    const cardElement = new Card(item, cardsSection._config, cardsSection._handleCardClick).generateCard()
    cardsSection.addItem(cardElement)
  }
  },
  config,
  handleCardClick
)

// Добавление исходных карточек на страницу
cardsSection.renderItems()

// ***РЕАЛИЗАЦИЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ***

// Логика работы кнопки редактирования профиля

editProfileButton.addEventListener('click', ()=>{
  pageFormValidators[editProfileForm.name].resetValidation()
  editProfilePopup.open()
  editUserNameField.value = profileName.textContent
  editUserDescrField.value = profileDescr.textContent
}
)

// Сохранение новых данных пользователя при нажатии кнопки Сохранить
  editProfilePopup._popup.addEventListener('submit', (evt) => {
  profileName.textContent = editUserNameField.value
  profileDescr.textContent = editUserDescrField.value
  editProfilePopup.close()
  evt.preventDefault()
}
)

// ***ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК***

addCardButton.addEventListener('click', (evt) => {
  pageFormValidators[addPlaceForm.name].resetValidation()
  addPlaceForm.reset()
  addCardPopup.open()
}
)

addCardPopup._popup.addEventListener('submit', (evt)=>{
  const newCardItem = {name: addPlaceNameField.value,
                       link: addPlaceLinkField.value}

  cardsSection.render(newCardItem)
  addCardPopup.close()
  evt.preventDefault()
}
)
