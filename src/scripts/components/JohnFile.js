import { BaseComponent } from "./BaseComponent.js";
import { newsApi }  from "../modules/NewsApi.js"
import { INPUT_ERROR } from "../constants/Constants.js"

export class SearchInput extends BaseComponent {
  constructor(handlers, elem) {

    super(handlers, elem);
  }
}

class SearchForm extends BaseComponent {
  constructor(handlers, form) {
    super(handlers);
    const input = form.querySelector('input');
    this._isValid = false

    new SearchInput([
      {
        event: 'input',
        func: this.validation.bind(this),
      }
    ], input);
  }

  validation(event) {
    const _value = event.target.value;
  
    this._isValid = false;
    if (_value.length === 0) {
      INPUT_ERROR.classList.remove('searching__error_shown');
    } 
    else if (_value.length <= 2 && _value.length != 0) {
      INPUT_ERROR.textContent = "Введите больше двух символов";
      INPUT_ERROR.classList.add('searching__error_shown');
    } 
    else if (_value.length > 10) {
      INPUT_ERROR.textContent = `Можно максимум 10 символов. Удалите еще ${_value.length - 10}`;
      INPUT_ERROR.classList.add('searching__error_shown')
    } else  {
      INPUT_ERROR.classList.remove('searching__error_shown');
      return this._isValid = true;
    }
  }
}

const submit = () => {
  event.preventDefault();
  this.validation();
  
  if (this._isValid) {
    newsApi.getNews(this.form.elements.searchInput.value)
    .then(res => console.log(res)
    )
  }
}

const form = document.querySelector('form');

new SearchForm([], form);