const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Зеленые горы на фоне неба.'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Зимний пейзаж: озеро с заснеженными берегами, на заднем фоне деревья.'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Серые однотипные панельные дома до горизонта.'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Пустынный пейзаж тундры, вулкан вдалеке.'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Лиственные деревья, рельсы, уходящие вдаль на фоне неба.'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Заснеженный берег байкала, отвесная крутая скала.'
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
function showHideContent (obj, cls) {obj.classList.toggle(cls)}

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
  showHideContent(addCardPopup, 'popup_active')
}
)

addCardPopup.addEventListener('submit', (evt)=>{
  let newCardName = addCardPopup.querySelector('.popup__field_type_new-card-title').value
  let newCardLink = addCardPopup.querySelector('.popup__field_type_new-card-link').value
  addNewCard({name: newCardName, link: newCardLink, alt: 'Описание не указано.'}, false)
  showHideContent(addCardPopup, 'popup_active')
  evt.preventDefault()
})

// Реализация работы кнопкок на карточках
cardsSection.addEventListener('click', (evt) => {
  let tgt = evt.target.closest('button')
  console.log(tgt)
  tgt.classList.contains('place-card__like-button') ? evt.target.classList.toggle('place-card__like-button_active') 
  : 
  tgt.classList.contains('place-card__remove-button') ? tgt.closest('.place-card').remove()
  :
  null
})