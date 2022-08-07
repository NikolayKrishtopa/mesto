import { bigPhotoPopup, addingCardPopup, editingProfilePopup, userInfo, cardsSection, api, confirmPopup, editingAvatarPopup} from "../pages/index.js"
import Card from "../components/Card.js"
import config from "./config.js"

export function checkStartWithSpace (inputElement){
  inputElement.value.startsWith(' ') ? inputElement.value = inputElement.value.slice(1) : null
}

export function handleCardClick(title, link, alt){
  bigPhotoPopup.open(title, link, alt)
}

export function createNewCard(carditem, config, userId){
return new Card(carditem, config, handleCardClick, checkIfOwn, 
  openRemoveCardConfirm, handleLikeServer, userId).generateCard()
}

export function submitNewCard(newCardItem){
  addingCardPopup.renderLoading(true)
  api.createNewCard(newCardItem)
    .then(cardElement => cardsSection.addItem(createNewCard(cardElement, config, userInfo.getUserInfo().id)))
    .then(()=>addingCardPopup.close())
    .catch(err => alert(err))
    .finally(() => addingCardPopup.renderLoading(false))
}

export function submitUserInfo(userData) {
    editingProfilePopup.renderLoading(true)
    api.setUserInfo(userData)
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

  export function removeCardElement(card){
    confirmPopup.renderLoading(true)
    api.removeCard(card.cardElement)
      .then(()=>{
        card.removeCard()
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
      card.updateLikesArr(res.likes)
      // this.isLiked = this._checkOwnLike()  ***заменена более простой toggleLike для улучшения быстродействия***
      card.toggleLike()
      card.renderLikes()
    })
      .catch(err => alert(err))
  }