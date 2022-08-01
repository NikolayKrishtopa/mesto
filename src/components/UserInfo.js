export default class UserInfo{
  constructor(nameSelector, infoSelector, avatarSelector){
    this._name = document.querySelector(nameSelector)
    this._about = document.querySelector(infoSelector) 
    this._avatar = document.querySelector(avatarSelector)
  }
  getUserInfo(){
    return {
        name: this._name.textContent,
        about: this._about.textContent
    }
  }

  setUserInfo(userData){
    userData.then(data => {
      this._name.textContent = data.name
      this._about.textContent = data.about
      this._avatar.src = data.avatar
      this._avatar.alt = `изображение профиля ${data.name}`
  }
  )
}
}