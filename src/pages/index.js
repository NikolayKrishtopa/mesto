import config from '../utils/config.js'
import { checkStartWithSpace, submitNewCard, submitUserInfo, removeCardElement, 
         handleEditAvatarForm, submitAvatar, createNewCard } from '../utils/utils.js'
import FormValidator from '../components/FormValidator'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js' 
import './index.css'
import PopupConfirm from '../components/PopupConfirm.js'
import Popup from '../components/Popup.js'

export const addingCardPopup = new PopupWithForm(config.addingCardPopupSelector, submitNewCard, config)
export const editingAvatarPopup = new PopupWithForm(config.editAvatarPopupSelector, submitAvatar, config)
export const editingProfilePopup = new PopupWithForm(config.editProfilePopupSelector, submitUserInfo, config)
export const bigPhotoPopup = new PopupWithImage(config.photoPopupSelector, config)
export const userInfo = new UserInfo(config.userNameSelector, config.userInfoSelector, config.avatarSelector, 
                                     config.editAvatarButtonSelector, handleEditAvatarForm)
export const confirmPopup = new PopupConfirm(config.confirmPopupSelector, config, removeCardElement)
export const api = new Api(config)

const editingProfileButton = document.querySelector(config.editProfileButtonSelector)
const addingCardButton = document.querySelector(config.addCardButtonSelector)
const editingUserNameField = document.querySelector(config.editUserNameInputSelector)
const editingUserDescrField = document.querySelector(config.editUserDescrInputSelector)
const formList = Array.from(document.querySelectorAll(config.formSelector))
const editingAvatarButton = document.querySelector(config.editAvatarButtonSelector)

//логика плавной загрузки страницы
const page = document.querySelector(config.pageSelector)
const loadingPopup = new Popup(config.loadingPopupSelector)
function renderPageLoading(isLoading){
  if (isLoading){
    page.classList.remove(config.pageActiveSelector)
    loadingPopup.open()
  } 
  else {
    page.classList.add(config.pageActiveSelector)
    loadingPopup.close()
  }
}

//Активация слушателей событий на попапах
addingCardPopup.setEventListeners()
editingProfilePopup.setEventListeners()
editingAvatarPopup.setEventListeners()
confirmPopup.setEventListeners()
bigPhotoPopup.setEventListeners()

//Подключение валидации к формам
const pageFormValidators = {}

function enableValidation(){
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement, checkStartWithSpace)
    const validatorName = formElement.getAttribute('name')
    pageFormValidators[validatorName] = validator
    validator.enableValidation()    
  })
}
enableValidation()

// Создание секции с карточками
export const cardsSection = new Section(
  item => cardsSection.addItem(createNewCard(item, config, userInfo.getUserInfo().id)),
  config
)

//Добавление исходных карточек и данных пользователя на страницу 
renderPageLoading(true)
Promise.all([api.getUserInfo(),
api.getInititalCards()])
  .then(res => {
  userInfo.setUserInfo(res[0])
  cardsSection.renderItems(res[1]) 
  })
  .then(()=>renderPageLoading(false))
  .catch(err => {
    alert(err)
    renderPageLoading(false)
  })

//Обработчик клика кнопки редактирования аватара
editingAvatarButton.addEventListener('click', ()=>{
  userInfo.handleEditAvatarForm()
  pageFormValidators[editingAvatarPopup.form.getAttribute('name')].resetValidation()
})

//Обработчик клика кнопки редактирования профиля
editingProfileButton.addEventListener('click', ()=>{
  editingProfilePopup.open()
  const {name, about} = userInfo.getUserInfo()
  editingUserNameField.value = name, 
  editingUserDescrField.value = about
  pageFormValidators[editingProfilePopup.form.getAttribute('name')].resetValidation()
}
)

//Обработчик клика кнопки добавления карточки
addingCardButton.addEventListener('click', (evt) => {
  pageFormValidators[addingCardPopup.form.getAttribute('name')].resetValidation()
  addingCardPopup.open()
}
)