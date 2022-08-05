import Api from "../components/Api.js"
import { bigPhotoPopup, addCardPopup, editProfilePopup, userInfo, cardsSection, api, confirmPopup, editAvatarPopup} from "../pages/index.js"

export function checkStartWithSpace (inputElement){
  inputElement.value.startsWith(' ') ? inputElement.value = inputElement.value.slice(1) : null
}

export function handleCardClick(title, link, alt){
  bigPhotoPopup.open(title, link, alt)
}

export const submitNewCard = evt => {
  addCardPopup.renderLoading(true)
  const newCardItem = addCardPopup.getInputValues()
  api.createNewCard(newCardItem)
    .then(cardElement => cardsSection.render(cardElement))
    .then(()=>
    {
      addCardPopup.close()
      addCardPopup.renderLoading(false)
    })
    .catch(err => alert(err))
  evt.preventDefault()
}

export const submitUserInfo = evt => {
    userInfo.setUserInfo(api.setUserInfo(editProfilePopup.getInputValues()))
    editProfilePopup.close()
    evt.preventDefault()
  }

  export function checkIfOwn(card){
    return userInfo.getUserInfo().id === card.owner._id
  }

  export function openRemoveCardConfirm(cardElement){
    confirmPopup.open(cardElement)
  }

  export function removeCardElement(cardElement){
    confirmPopup.renderLoading(true)
    api.removeCard(cardElement)
      .then(()=>{
        cardsSection.removeItem(cardElement)
        confirmPopup.renderLoading(false)
      })
      .catch(err => alert(err))
  }

  export function handleEditAvatarForm(){
    editAvatarPopup.open()
  }

  export function submitAvatar(){
    editAvatarPopup.renderLoading(true)
    userInfo.setUserInfo(api.setAvatar(editAvatarPopup.getInputValues().avatar)).
      then(()=>{
        editAvatarPopup.close()
        editAvatarPopup.renderLoading(false)
      })
      .catch(err => alert(err))
  }

  export function handleLikeServer(cardElement, isLiked){
    return api.handleLikeServer(cardElement, isLiked)
  }