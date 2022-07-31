export default class Section{
  constructor({items, renderer}, config, handleCardClick){
    this._itemList = items
    this.render = renderer
    this._config = config
    this._container = document.querySelector(config.cardsSectionSelector)
    this._handleCardClick = handleCardClick
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._itemList.then(res => {
      res.reverse().forEach(item => {
      this.render(item)
      })
    })
  }
}