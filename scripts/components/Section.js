export default class Section{
  constructor({items, renderer}, config){
    this._itemList = items
    this.render = renderer
    this._config = config
    this._container = document.querySelector(config.cardsSectionSelector)
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._itemList.reverse().forEach(item => {
      this.render(item)
    });
  }
}