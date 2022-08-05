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
    .then(()=>addCardPopup.close())
    .catch(err => alert(err))
    .finally(() => addCardPopup.renderLoading(false))
  evt.preventDefault()
}

export function submitUserInfo(evt) {
    editProfilePopup.renderLoading(true)
    api.setUserInfo(editProfilePopup.getInputValues())
    .then(res=>userInfo.setUserInfo(res))
    .then(editProfilePopup.close())
    .catch(err => alert(err))
    .finally(() => editProfilePopup.renderLoading(false))
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
      })
      .catch(err => alert(err))
      .finally(()=>confirmPopup.renderLoading(false))
  }

  export function handleEditAvatarForm(){
    editAvatarPopup.open()
  }

  export function submitAvatar(){
    editAvatarPopup.renderLoading(true)
    api.setAvatar(editAvatarPopup.getInputValues().avatar)
      .then(res => userInfo.setUserInfo(res))
      .then(()=>editAvatarPopup.close())
      .catch(err => alert(err))
      .finally(() => editAvatarPopup.renderLoading(false))
  }

  export function handleLikeServer(cardElement, isLiked, card){
    return api.handleLikeServer(cardElement, isLiked)
    .then(res => {
      card._cardElement = res
      // this.isLiked = this._checkOwnLike()  ***заменена более простой toggleLike для улучшения быстродействия***
      card._toggleLike()
      card._renderLikes()
    })
      .catch(err => alert(err))
  }