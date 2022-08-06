export default class UserInfo{
  constructor(nameSelector, infoSelector, avatarSelector, avatarButtonSelector, handleEditAvatarForm){
    this._name = document.querySelector(nameSelector)
    this._about = document.querySelector(infoSelector) 
    this._avatar = document.querySelector(avatarSelector)
    this.handleEditAvatarForm = handleEditAvatarForm
  }

  getUserInfo(){
    return {
        name: this._name.textContent,
        about: this._about.textContent,
        id: this._id
    }
  }

  setUserInfo(userData){
      this._name.textContent = userData.name
      this._about.textContent = userData.about
      this._avatar.src = userData.avatar
      this._avatar.alt = `изображение профиля ${userData.name}`
      this._userData = userData
      this._id = userData._id
    }
}