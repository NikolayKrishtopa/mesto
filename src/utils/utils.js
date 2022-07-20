import { bigPhotoPopup, addCardPopup, editProfilePopup, userInfo, cardsSection } from "../pages/index.js"

export function checkStartWithSpace (inputElement){
  inputElement.value.startsWith(' ') ? inputElement.value = inputElement.value.slice(1) : null
}

export function handleCardClick(title, link, alt){
  bigPhotoPopup.open(title, link, alt)
}

export const submitNewCard = evt => {
  const newCardItem = {name: addCardPopup.getInputValues()['new-card-title'],
                       link: addCardPopup.getInputValues()['new-card-link']}

  cardsSection.render(newCardItem)
  addCardPopup.close()
  evt.preventDefault()
}

export const submitUserInfo = evt => {
    userInfo.setUserInfo(editProfilePopup.getInputValues()['user-name'], editProfilePopup.getInputValues()['user-description'])
    editProfilePopup.close()
    evt.preventDefault()
  }
