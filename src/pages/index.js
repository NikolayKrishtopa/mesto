import Card from '../components/Card.js'
import config from '../utils/config.js'
import { checkStartWithSpace, handleCardClick, submitNewCard, submitUserInfo, checkIfOwn, 
         openRemoveCardConfirm, removeCardElement, handleEditAvatarForm, submitAvatar } from '../utils/utils.js'
import FormValidator from '../components/FormValidator'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js' 
import './index.css'
import PopupConfirm from '../components/PopupConfirm.js'

export const addCardPopup = new PopupWithForm(config.addCardPopupSelector, submitNewCard, config)
export const editAvatarPopup = new PopupWithForm(config.editAvatarPopupSelector, submitAvatar, config)
export const editProfilePopup = new PopupWithForm(config.editProfilePopupSelector, submitUserInfo, config)
export const bigPhotoPopup = new PopupWithImage(config.photoPopupSelector, config)
export const userInfo = new UserInfo(config.userNameSelector, config.userInfoSelector, config.avatarSelector, config.editAvatarButtonSelector, handleEditAvatarForm)
export const confirmPopup = new PopupConfirm(config.confirmPopupSelector, config, removeCardElement)

export const api = new Api(config)
const editProfileButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.navigation__add-place-button')
const editUserNameField = document.querySelector('.popup__field_type_user-name')
const editUserDescrField = document.querySelector('.popup__field_type_user-description')
const formList = Array.from(document.querySelectorAll('.popup__form'))

// Установка изначального имени пользователя
userInfo.setUserInfo(api.getUserInfo())

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
export const cardsSection = new Section({
  items: api.getInititalCards(),
  renderer: item => cardsSection.addItem(new Card(item, cardsSection._config, cardsSection._handleCardClick, cardsSection._checkIfOwn, cardsSection._openRemoveCardConfirm).generateCard())
  },
  config,
  handleCardClick,
  checkIfOwn,
  openRemoveCardConfirm
)

// Добавление исходных карточек на страницу
cardsSection.renderItems()

//Обработчик клика кнопки редактирования профиля
editProfileButton.addEventListener('click', ()=>{
  pageFormValidators[editProfilePopup.form.name].resetValidation()
  editProfilePopup.open()
  editUserNameField.value = userInfo.getUserInfo().name
  editUserDescrField.value = userInfo.getUserInfo().about
}
)

//Обработчик клика кнопки добавления карточки
addCardButton.addEventListener('click', (evt) => {
  pageFormValidators[addCardPopup.form.name].resetValidation()
  addCardPopup.open()
}
)