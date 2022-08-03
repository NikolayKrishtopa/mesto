export default class Section{
  constructor({items, renderer}, config, handleCardClick, checkIfOwn, openRemoveCardConfirm, handleLikeServer){
    this._itemList = items
    this.render = renderer
    this._config = config
    this._container = document.querySelector(config.cardsSectionSelector)
    this._handleCardClick = handleCardClick
    this._checkIfOwn = checkIfOwn
    this._openRemoveCardConfirm = openRemoveCardConfirm
    this._handleLikeServer = handleLikeServer
  }

  addItem(element) {
    this._container.prepend(element)
  }

  removeItem(element) {
   document.getElementById(element._id).remove()
  }

  renderItems() {
    this._itemList.then(res => {
      res.reverse().forEach(item => {
      this.render(item)
      })
    })
  }
}