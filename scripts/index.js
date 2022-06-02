const initialCards = [
  {
    name: 'Онежское озеро',
    link: 'https://images.unsplash.com/photo-1543699936-c901ddbf0c05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80',
    alt: 'Каменистый берег озера с высокими деревьями.'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1634745186518-db2e653372c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    alt: 'Вулкан в дымке на горизонте.'
  },
  {
    name: 'Ольхон',
    link: 'https://images.unsplash.com/photo-1548130516-2ca6aaeb84b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    alt: 'Озеро с голубой водой на фоне голубого ясного неба и каменистый берег.'
  },
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1631775866694-fe340840cc52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    alt: 'Ночной вид на Казанский кремль с отражением в воде.'
  },
  {
    name: 'Ростов-на-Дону',
    link: 'https://images.unsplash.com/photo-1625251447297-e98686b6c251?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    alt: 'Ночь, заснеженная узкая пустынная улица с старинными фонарями.'
  },
  {
    name: 'Светлогорск',
    link: 'https://images.unsplash.com/photo-1621707098150-3c0b7de2c3ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    alt: 'Разноцветные двухэтажные дома, стоящие друг к другу вплотную.'
  }
]; 

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
function openPopup (popup) {
  popup.classList.add('popup_active')
}
function closePopup (popup) {
  popup.classList.remove('popup_active')
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

// Закрытие любого всплывающего окна по кнопке (альтернативный вариант изучен и принят к сведению)
popupCloseButtons.forEach(e=>e.addEventListener('click', (evt)=>closePopup(evt.target.closest('.popup'))))

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