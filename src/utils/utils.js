import { bigPhotoPopup, addCardPopup, editProfilePopup, userInfo, cardsSection, api } from "../pages/index.js"

export function checkStartWithSpace (inputElement){
  inputElement.value.startsWith(' ') ? inputElement.value = inputElement.value.slice(1) : null
}

export function handleCardClick(title, link, alt){
  bigPhotoPopup.open(title, link, alt)
}

export const submitNewCard = evt => {
  const newCardItem = addCardPopup.getInputValues()
  api.createNewCard(newCardItem).then(cardElement => cardsSection.render(cardElement))
  addCardPopup.close()
  evt.preventDefault()
}

export const submitUserInfo = evt => {
    userInfo.setUserInfo(api.setUserInfo(editProfilePopup.getInputValues()))
    editProfilePopup.close()
    evt.preventDefault()
  }

  export function checkIfOwn(card){
    return userInfo.getUserInfo().name === card.owner.name && userInfo.getUserInfo().about === card.owner.about
  }