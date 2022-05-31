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

let cardTemplate = document.querySelector('#place-card-template').content
let cardsSection = document.querySelector('.place-cards')


// функция добавления новой карточки
function addNewCard(card, addToEnd=true) {
  let cardTemplateClone = cardTemplate.cloneNode(true)
  cardTemplateClone.querySelector('.place-card__photo').src = card.link
  cardTemplateClone.querySelector('.place-card__photo').alt = card.alt ? card.alt : 'Описание не указано.'
  cardTemplateClone.querySelector('.place-card__title').textContent = card.name
  if (addToEnd) {cardsSection.append(cardTemplateClone)}
  else {cardsSection.prepend(cardTemplateClone)}
}

// функция открытия-закрытия любого всплывающего окна
function showHideContent (obj, cls) {
  obj.classList.toggle(cls)
}

// Добавление исходных карточек на страницу
initialCards.forEach(card => addNewCard(card))



// ***РЕАЛИЗАЦИЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ***

let editProfileButton = document.querySelector('.profile__edit-button')
let addCardButton = document.querySelector('.navigation__add-place-button')
let editProfilePopup = document.querySelector('.popup_type_edit-profile')
let addCardPopup = document.querySelector('.popup_type_add-card')
let popupCloseButton = document.querySelectorAll('.popup__close-button')
let editUserNameField = document.querySelector('.popup__field_type_user-name')
let editUserDescrField = document.querySelector('.popup__field_type_user-description')
let addPlaceNameField = addCardPopup.querySelector('.popup__field_type_new-card-title')
let addPlaceLinkField = addCardPopup.querySelector('.popup__field_type_new-card-link')
let fullScreenPhotoPopup = document.querySelector('.popup_type_picture-full-screen')
let fullScreenPhoto = fullScreenPhotoPopup.querySelector('.popup__photo')
let fullScreenPhotoTitle = fullScreenPhotoPopup.querySelector('.popup__title_type_photo')

// Логика работы кнопки редактирования профиля

editProfileButton.addEventListener('click', ()=>{
  showHideContent(editProfilePopup, 'popup_active')
  editUserNameField.value = document.querySelector('.profile__name').textContent
  editUserDescrField.value = document.querySelector('.profile__description').textContent
}
)

// Закрытие любого всплывающего окна по кнопке
popupCloseButton.forEach(e=>e.addEventListener('click', (evt)=>showHideContent(evt.target.closest('.popup'),'popup_active')))

// Сохранение новых данных пользователя при нажатии кнопки Сохранить
  editProfilePopup.querySelector('.popup__form_type_edit-profile').addEventListener('submit', (evt) => {
  document.querySelector('.profile__name').textContent = editUserNameField.value
  document.querySelector('.profile__description').textContent = editUserDescrField.value
  showHideContent(editProfilePopup, 'popup_active')
  evt.preventDefault()
}
)

// ***ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК***

addCardButton.addEventListener('click', (evt) => {
  addPlaceNameField.value = ''
  addPlaceLinkField.value = ''
  showHideContent(addCardPopup, 'popup_active')
}
)

addCardPopup.addEventListener('submit', (evt)=>{
  let newCardName = addPlaceNameField.value
  let newCardLink = addPlaceLinkField.value
  addNewCard({name: newCardName, link: newCardLink, alt: 'Описание не указано.'}, false)
  showHideContent(addCardPopup, 'popup_active')
  evt.preventDefault()
})

// Реализация работы кнопкок на карточках

cardsSection.addEventListener('click', (evt) => {
  let tgt = evt.target
  console.log(tgt.classList.contains('place-card__photo'))
  if (!tgt.classList){return}
  else if (tgt.classList.contains('place-card__photo')){
      showHideContent(fullScreenPhotoPopup, 'popup_active')
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