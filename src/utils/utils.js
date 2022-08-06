import { bigPhotoPopup, addingCardPopup, editingProfilePopup, userInfo, cardsSection, api, confirmPopup, editingAvatarPopup} from "../pages/index.js"

export function checkStartWithSpace (inputElement){
  inputElement.value.startsWith(' ') ? inputElement.value = inputElement.value.slice(1) : null
}

export function handleCardClick(title, link, alt){
  bigPhotoPopup.open(title, link, alt)
}

export function submitNewCard(newCardItem){
  addingCardPopup.renderLoading(true)
  api.createNewCard(newCardItem)
    .then(cardElement => cardsSection.render(cardElement))
    .then(()=>addingCardPopup.close())
    .catch(err => alert(err))
    .finally(() => addingCardPopup.renderLoading(false))
}

export function submitUserInfo(userInfo) {
    editingProfilePopup.renderLoading(true)
    api.setUserInfo(userInfo)
    .then(res=>userInfo.setUserInfo(res))
    .then(editingProfilePopup.close())
    .catch(err => alert(err))
    .finally(() => editingProfilePopup.renderLoading(false))
  }

  export function checkIfOwn(card){
    return userInfo.getUserInfo().id === card.owner._id
  }

  export function openRemoveCardConfirm(cardElement, domElement){
    confirmPopup.open(cardElement, domElement)
  }

  export function removeCardElement(cardElement, domElement){
    confirmPopup.renderLoading(true)
    api.removeCard(cardElement)
      .then(()=>{
        domElement.remove()
      })
      .catch(err => alert(err))
      .finally(()=>confirmPopup.renderLoading(false))
  }

  export function handleEditAvatarForm(){
    editingAvatarPopup.open()
  }

  export function submitAvatar(avatarObj){
    editingAvatarPopup.renderLoading(true)
    api.setAvatar(avatarObj.avatar)
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