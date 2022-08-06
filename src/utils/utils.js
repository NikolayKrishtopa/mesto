import { bigPhotoPopup, addingCardPopup, editingProfilePopup, userInfo, cardsSection, api, confirmPopup, editingAvatarPopup} from "../pages/index.js"

export function checkStartWithSpace (inputElement){
  inputElement.value.startsWith(' ') ? inputElement.value = inputElement.value.slice(1) : null
}

export function handleCardClick(title, link, alt){
  bigPhotoPopup.open(title, link, alt)
}

export const submitNewCard = evt => {
  addingCardPopup.renderLoading(true)
  const newCardItem = addingCardPopup.getInputValues()
  api.createNewCard(newCardItem)
    .then(cardElement => cardsSection.render(cardElement))
    .then(()=>addingCardPopup.close())
    .catch(err => alert(err))
    .finally(() => addingCardPopup.renderLoading(false))
  evt.preventDefault()
}

export function submitUserInfo(evt) {
    editingProfilePopup.renderLoading(true)
    api.setUserInfo(editingProfilePopup.getInputValues())
    .then(res=>userInfo.setUserInfo(res))
    .then(editingProfilePopup.close())
    .catch(err => alert(err))
    .finally(() => editingProfilePopup.renderLoading(false))
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
    editingAvatarPopup.open()
  }

  export function submitAvatar(){
    editingAvatarPopup.renderLoading(true)
    api.setAvatar(editingAvatarPopup.getInputValues().avatar)
      .then(res => userInfo.setUserInfo(res))
      .then(()=>editingAvatarPopup.close())
      .catch(err => alert(err))
      .finally(() => editingAvatarPopup.renderLoading(false))
  }

  export function handleLikeServer(cardElement, isLiked, card){
    return api.handleLikeServer(cardElement, isLiked)
    .then(res => {
      // card._cardElement.likes = res.likes
      card._cardElement = res
      // this.isLiked = this._checkOwnLike()  ***заменена более простой toggleLike для улучшения быстродействия***
      card._toggleLike()
      card._renderLikes()
      console.log(card.isLiked)
      console.log(card._cardElement.likes)
    })
      .catch(err => alert(err))
  }