export default class Api{
  constructor(config){
    this._baseUrl = config.apiData.baseUrl,
    this._headers = config.apiData.headers
  }

  _getResponseData = (res, message) => {
    if (res.ok){return res.json()}
    else {return Promise.reject(`ошибка ${res.status} при ${message}`)}
  }

  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
    .then(res => this._getResponseData(res, 'загрузке данных профиля с сервера'))
  }

  getInititalCards(){
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
    .then(res => this._getResponseData(res, 'загрузке постов с сервера'))
  }

  setUserInfo(userInfo){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userInfo)
    })
    .then(res => this._getResponseData(res, 'отправке данных пользователя на сервер'))
  }

  createNewCard(cardElement){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardElement)
    })
    .then(res => this._getResponseData(res, 'создании нового поста'))
  }

  removeCard(cardElement){
    return fetch(`${this._baseUrl}/cards/${cardElement._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._getResponseData(res, 'удалении поста'))
  }

  setAvatar(avatarLink){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: avatarLink})
    })
    .then(res => this._getResponseData(res, 'отправке изображения пользователя на сервер'))
  }

  handleLikeServer(cardElement, isLiked){
    const httpMethod = isLiked ? 'DELETE' : 'PUT'
    return fetch(`${this._baseUrl}/cards/${cardElement._id}/likes`, {
      method: httpMethod,
      headers: this._headers,
    })
    .then(res => this._getResponseData(res, 'загрузке данных с сервера'))
  }
}