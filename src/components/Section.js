export default class Section{
  constructor(render, config){
    this.render = render
    this._config = config
    this._container = document.querySelector(config.cardsSectionSelector)
  }

  setUserId(UserId){
    this._userId = UserId
  }

  addItem(element) {
    this._container.prepend(element)
  }
 
  renderItems(CardsArr) {
    CardsArr.reverse().forEach(item => {
      this.render(item)
      }
    )
  }
}