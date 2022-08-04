export default class UserInfo{
  constructor(nameSelector, infoSelector, avatarSelector, avatarButtonSelector, handleEditAvatarForm){
    this._name = document.querySelector(nameSelector)
    this._about = document.querySelector(infoSelector) 
    this._avatar = document.querySelector(avatarSelector)
    this._editAvatarButton = document.querySelector(avatarButtonSelector)
    this._handleEditAvatarForm = handleEditAvatarForm
    this._setEventListeners()
  }

  _setEventListeners(){
    this._editAvatarButton.addEventListener('click', this._handleEditAvatarForm)
  }

  getUserInfo(){
    return {
        name: this._name.textContent,
        about: this._about.textContent,
        id: this._id
    }
  }

  setUserInfo(userData){
    return userData.then(data => {
      this._name.textContent = data.name
      this._about.textContent = data.about
      this._avatar.src = data.avatar
      this._avatar.alt = `изображение профиля ${data.name}`
      this._id = data._id
      this._userData = data
    }
    )
    .catch(err => alert(err))
}
}