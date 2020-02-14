export class BaseComponent {
  constructor (handlers, elem) {
    this.elem = elem;
    this._setHandlers(handlers);
  }

  _setHandlers (handlers) {
    if (handlers) {
    console.log(handlers);
      handlers.forEach(({ event, func }) => {
        this.elem.addEventListener(event, func);
      });
    }
  }
}

