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


}