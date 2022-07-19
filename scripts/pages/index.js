import Card from '../components/Card.js'
import initialCards from '../utils/initialCards.js'
import config from '../utils/config.js'
import { checkStartWithSpace, handleCardClick, submit } from '../utils/utils.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'

export const addCardPopup = new PopupWithForm(config.addCardPopupSelector, submit, config)
export const editProfilePopup = new PopupWithForm(config.editProfilePopupSelector, submit, config)
export const bigPhotoPopup = new PopupWithImage(config.photoPopupSelector, config)
export const userInfo = new UserInfo(config.userNameSelector, config.userInfoSelector)


const editProfileButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.navigation__add-place-button')
const editUserNameField = document.querySelector('.popup__field_type_user-name')
const editUserDescrField = document.querySelector('.popup__field_type_user-description')
const formList = Array.from(document.querySelectorAll('.popup__form'))


document.querySelector('.profile__avatar').addEventListener('click', ()=>{console.log(editProfilePopup._getInputValues());})

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
  items: initialCards,
  renderer: item => cardsSection.addItem(new Card(item, cardsSection._config, cardsSection._handleCardClick).generateCard())
  },
  config,
  handleCardClick
)

// Добавление исходных карточек на страницу
cardsSection.renderItems()

//Обработчик клика кнопки редактирования профиля
editProfileButton.addEventListener('click', ()=>{
  pageFormValidators[editProfilePopup.form.name].resetValidation()
  editProfilePopup.open()
  editUserNameField.value = userInfo.getUserInfo().name
  editUserDescrField.value = userInfo.getUserInfo().info
}
)

//Обработчик клика кнопки добавления карточки
addCardButton.addEventListener('click', (evt) => {
  pageFormValidators[addCardPopup.form.name].resetValidation()
  addCardPopup.open()
}
)