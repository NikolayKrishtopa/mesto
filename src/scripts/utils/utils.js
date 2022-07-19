import { bigPhotoPopup, addCardPopup, editProfilePopup, userInfo, cardsSection } from "../../index.js"

export function checkStartWithSpace (inputElement){
  inputElement.value.startsWith(' ') ? inputElement.value = inputElement.value.slice(1) : null
}

export function handleCardClick(title, link, alt){
  bigPhotoPopup.open(title, link, alt)
}

export const submit = evt => {
  if (evt.target.closest('.popup_type_add-card')){
  const newCardItem = {name: addCardPopup._getInputValues()['new-card-title'],
                       link: addCardPopup._getInputValues()['new-card-link']}

  cardsSection.render(newCardItem)
  addCardPopup.close()
  evt.preventDefault()
  }

  else if (evt.target.closest('.popup_type_edit-profile')){
    userInfo.setUserInfo(editProfilePopup._getInputValues()['user-name'], editProfilePopup._getInputValues()['user-description'])
    editProfilePopup.close()
    evt.preventDefault()
  }
}

