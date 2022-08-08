export default class Section{
  constructor(render, config){
    this.render = render
    this._config = config
    this._container = document.querySelector(config.cardsSectionSelector)
  }

  addItem(element) {
    this._container.prepend(element)
  }
 
  renderItems(cardsArr) {
    cardsArr.reverse().forEach(item => {
      this.render(item)
      }
    )
  }
}