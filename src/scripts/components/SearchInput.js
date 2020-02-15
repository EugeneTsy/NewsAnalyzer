import { BaseComponent } from "./BaseComponent.js";
import { newsApi }  from "../modules/NewsApi.js";
import { INPUT_ERROR, NEWS_CARDS_CONTAINER, WAITING_BLOCK, CARDS_SECTION } from "../constants/Constants.js";
import { NewsCard } from "./NewsCard.js";
import { cardList } from "./NewsCardList.js";

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
      INPUT_ERROR.classList.remove('searching__error_shown');
    } 
    else if (_value.length <= 2 && _value.length != 0) {
      INPUT_ERROR.textContent = "Введите больше двух символов";
      INPUT_ERROR.classList.add('searching__error_shown');
    } 
    else if (_value.length > 50) {
      INPUT_ERROR.textContent = `Можно максимум 50 символов. Удалите еще ${_value.length - 50}`;
      INPUT_ERROR.classList.add('searching__error_shown')
    } else  {
      INPUT_ERROR.classList.remove('searching__error_shown');
      return this._isValid = true;
    }
  }
    
    
  submit() {
    event.preventDefault();
    this.validation();
    
    if (this._isValid) {
      this.form.searchInput.setAttribute("disabled", "disabled");
      this.form.submitBtn.setAttribute("disabled", "disabled");

      
      cardList.renderNews(this.form.elements.searchInput.value)
      .then(() => {
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






export const searchInput = new SearchInput(
//   [
//   {
//     elem: input.form.elements.searchInput,
//     event: 'input',
//     func: input.validation(),
//   }
// ],
 false, document.forms.search);