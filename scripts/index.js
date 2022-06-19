const cardTemplate = document.querySelector('#place-card-template').content
const cardsSection = document.querySelector('.place-cards')
const editProfileButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.navigation__add-place-button')
const editProfilePopup = document.querySelector('.popup_type_edit-profile')
const addCardPopup = document.querySelector('.popup_type_add-card')
const popupCloseButtons = document.querySelectorAll('.popup__close-button')
const editUserNameField = document.querySelector('.popup__field_type_user-name')
const editUserDescrField = document.querySelector('.popup__field_type_user-description')
const addPlaceNameField = addCardPopup.querySelector('.popup__field_type_new-card-title')
const addPlaceLinkField = addCardPopup.querySelector('.popup__field_type_new-card-link')
const fullScreenPhotoPopup = document.querySelector('.popup_type_picture-full-screen')
const fullScreenPhoto = fullScreenPhotoPopup.querySelector('.popup__photo')
const fullScreenPhotoTitle = fullScreenPhotoPopup.querySelector('.popup__title_type_photo')
const profileName = document.querySelector('.profile__name')
const profileDescr = document.querySelector('.profile__description')
const allPopups = Array.from(document.querySelectorAll('.popup'))


// функция создания новой карточки
function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true).querySelector('.place-card')
  cardElement.querySelector('.place-card__photo').src = card.link
  cardElement.querySelector('.place-card__photo').alt = card.alt ? card.alt : 'Описание не указано.'
  cardElement.querySelector('.place-card__title').textContent = card.name
  cardElement.addEventListener('click', (evt) => {
    const tgt = evt.target
    if (tgt.classList.contains('place-card__photo')){
        openPopup(fullScreenPhotoPopup)
        fullScreenPhoto.src = tgt.src
        fullScreenPhoto.alt = tgt.alt
        fullScreenPhotoTitle.textContent = tgt.closest('.place-card').querySelector('.place-card__title').textContent
    } 
    else if (!tgt.closest('button')){return}
    else if (tgt.closest('button').classList.contains('place-card__like-button')){
      tgt.classList.toggle('place-card__like-button_active')
    } 
    else if (tgt.closest('button').classList.contains('place-card__remove-button')){
    tgt.closest('.place-card').remove()
    } 
    }
    )
  return cardElement
}

// функции открытия и закрытия всплывающего окна

function closePopup (popup) {
  //обнуление полей ошибок на случай закрытия формы без сохранения с активным полем ошибки 
  //чтоб не было ошибки при повторном открытии
  const popupInputsList = popup.querySelectorAll('.popup__field')
  popupInputsList.forEach(input => hideInputError(popup, input, 
    {inputErrorClass: 'popup__field_state_error', errorClass: 'popup__input-error_active'}))
  //Основной функционал по открытию окна
  popup.classList.remove('popup_active')
  document.removeEventListener('keydown', evt => {
    if (evt.key === "Escape") {
      closePopup(popup)
    }
  }
  ) 
}

function openPopup (popup) {
  popup.classList.add('popup_active')
  document.addEventListener('keydown', evt => {
    if (evt.key === "Escape") {
      closePopup(popup)
    }
  }
  )
}

// Добавление исходных карточек на страницу
initialCards.forEach(card => cardsSection.append(createCard(card)))


// ***РЕАЛИЗАЦИЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ***

// Логика работы кнопки редактирования профиля

editProfileButton.addEventListener('click', ()=>{
  openPopup(editProfilePopup)
  editUserNameField.value = profileName.textContent
  editUserDescrField.value = profileDescr.textContent
}
)

// Закрытие любого всплывающего окна по кнопке
popupCloseButtons.forEach(e=>e.addEventListener('click', (evt)=>closePopup(evt.target.closest('.popup'))))

// Закрытие любого всплывающего окна по клику на overlay
allPopups.forEach(e => {
  e.addEventListener ('mousedown', evt => {
    if (evt.target === e) {closePopup(e)}
  }
  )
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