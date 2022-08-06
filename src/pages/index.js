import Card from '../components/Card.js'
import config from '../utils/config.js'
import { checkStartWithSpace, handleCardClick, submitNewCard, submitUserInfo, checkIfOwn, 
         openRemoveCardConfirm, removeCardElement, handleEditAvatarForm, submitAvatar, handleLikeServer } from '../utils/utils.js'
import FormValidator from '../components/FormValidator'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js' 
import './index.css'
import PopupConfirm from '../components/PopupConfirm.js'

export const addingCardPopup = new PopupWithForm(config.addingCardPopupSelector, submitNewCard, config)
export const editingAvatarPopup = new PopupWithForm(config.editAvatarPopupSelector, submitAvatar, config)
export const editingProfilePopup = new PopupWithForm(config.editProfilePopupSelector, submitUserInfo, config)
export const bigPhotoPopup = new PopupWithImage(config.photoPopupSelector, config)
export const userInfo = new UserInfo(config.userNameSelector, config.userInfoSelector, config.avatarSelector, config.editAvatarButtonSelector, handleEditAvatarForm)
export const confirmPopup = new PopupConfirm(config.confirmPopupSelector, config, removeCardElement)
export const api = new Api(config)

const editingProfileButton = document.querySelector('.profile__edit-button')
const addingCardButton = document.querySelector('.navigation__add-place-button')
const editingUserNameField = document.querySelector('.popup__field_type_user-name')
const editingUserDescrField = document.querySelector('.popup__field_type_user-description')
const formList = Array.from(document.querySelectorAll('.popup__form'))

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
  items: [],
  renderer: item => cardsSection.addItem(new Card(item, cardsSection._config, cardsSection._handleCardClick, cardsSection._checkIfOwn, 
    cardsSection._openRemoveCardConfirm, cardsSection._handleLikeServer, cardsSection._userId).generateCard())
  },
  config,
  handleCardClick,
  checkIfOwn,
  openRemoveCardConfirm,
  handleLikeServer,
)

//Добавление исходных карточек и данных пользователя на страницу 
Promise.all([api.getUserInfo(),
api.getInititalCards()])
  .then(res => {
  userInfo.setUserInfo(res[0])
  cardsSection.setUserId(userInfo.getUserInfo().id)
  cardsSection.renderItems(res[1]) 
  })
  .catch(err => alert(err))

//Обработчик клика кнопки редактирования профиля
editingProfileButton.addEventListener('click', ()=>{
  pageFormValidators[editingProfilePopup.form.name].resetValidation()
  editingProfilePopup.open()
  editingUserNameField.value = userInfo.getUserInfo().name
  editingUserDescrField.value = userInfo.getUserInfo().about
}
)

//Обработчик клика кнопки добавления карточки
addingCardButton.addEventListener('click', (evt) => {
  pageFormValidators[addingCardPopup.form.name].resetValidation()
  addingCardPopup.open()
}
)