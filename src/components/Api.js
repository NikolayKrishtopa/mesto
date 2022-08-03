export default class Api{
  constructor(config){
    this._baseUrl = config.apiData.baseUrl,
    this._headers = config.apiData.headers
  }

  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
      .then(res => res.json())
  }

  getInititalCards(){
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
      .then(res => res.json())
  }

  setUserInfo(userInfo){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
  }

  createNewCard(cardElement){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardElement)
    })
      .then(res => res.json())
  }

  removeCard(cardElement){
    return fetch(`${this._baseUrl}/cards/${cardElement._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => res.json())
  }

  setAvatar(avatarLink){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: avatarLink})
    })
      .then(res => res.json())
  }

  handeLikeServer(isLiked){
    const httpMethod = isLiked ? 'DELETE' : 'PUT'
    return fetch(`${this._baseUrl}/cards/${cardElement._id}/likes`, {
      method: httpMethod,
      headers: this._headers,
    })
      .then(res => res.json())
  }

  }
