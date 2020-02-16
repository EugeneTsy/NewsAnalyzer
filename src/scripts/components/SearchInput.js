import { BaseComponent } from "./BaseComponent.js";
import { newsApi }  from "../modules/NewsApi.js";
import { INPUT_ERROR, SUBMIT_BTN } from "../constants/Constants.js";
import { NewsCard } from "./NewsCard.js";
import { cardList } from "../index.js";

export class SearchInput extends BaseComponent {
  constructor(handlers, form) {
    super(handlers);
    this.form = form;
    this._isValid = false;

    this._HANDLERS();
  }

  validation() {
    const _value = this.form.elements.searchInput.value;

    this._isValid = false;
    if (_value.length === 0) {
      INPUT_ERROR.textContent = "Нужно что-то ввести";
      INPUT_ERROR.classList.toggle('searching__error_shown');
      SUBMIT_BTN.classList.toggle('searching-form__button_moved');
    } 
    else if (_value.length <= 2 && _value.length != 0) {
      INPUT_ERROR.textContent = "Введите больше двух символов";
      INPUT_ERROR.classList.add('searching__error_shown');
      SUBMIT_BTN.classList.add('searching-form__button_moved');
    } 
    else if (_value.length > 50) {
      INPUT_ERROR.textContent = `Можно максимум 50 символов. Удалите еще ${_value.length - 50}`;
      INPUT_ERROR.classList.add('searching__error_shown')
      SUBMIT_BTN.classList.add('searching-form__button_moved');
    } else  {
      INPUT_ERROR.classList.remove('searching__error_shown');
      SUBMIT_BTN.classList.remove('searching-form__button_moved');
      return this._isValid = true;
    }
  }

  _errorRender (error, message) {
    if (error) {
      INPUT_ERROR.classList.add('searching__error_shown');
      SUBMIT_BTN.classList.add('searching-form__button_moved');
      INPUT_ERROR.textContent = message;
    } else 
    INPUT_ERROR.textContent = '';
    INPUT_ERROR.classList.remove('searching__error_shown');
    SUBMIT_BTN.classList.remove('searching-form__button_moved');
  }
    
    
  submit() {
    event.preventDefault();
    this.validation();
    
    if (this._isValid) {
      this.form.searchInput.setAttribute("disabled", "disabled");
      this.form.submitBtn.setAttribute("disabled", "disabled");

      
      cardList.renderNews(this.form.elements.searchInput.value)
      .finally(() => {
        this.form.searchInput.disabled = false
        this.form.submitBtn.disabled = false
      })
      
    }
  }

  _HANDLERS () {
    this.form.elements.searchInput.addEventListener('input', () => this.validation())
    this.form.addEventListener('submit', () => this.submit())
  }
}


