export default class Section{
  constructor({items, renderer}, config, handleCardClick, checkIfOwn, openRemoveCardConfirm, handleLikeServer){
    this.itemList = items
    this.render = renderer
    this._config = config
    this._container = document.querySelector(config.cardsSectionSelector)
    this._handleCardClick = handleCardClick
    this._checkIfOwn = checkIfOwn
    this._openRemoveCardConfirm = openRemoveCardConfirm
    this._handleLikeServer = handleLikeServer
    this._userId = ''
  }

  setUserId(UserId){
    this._userId = UserId
  }

  addItem(element) {
    this._container.prepend(element)
  }

  removeItem(element) {
   document.getElementById(element._id).remove()
  }

  renderItems(CardsArr) {
    CardsArr.reverse().forEach(item => {
      this.render(item)
      }
    )
  }
}