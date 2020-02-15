import { SHOW_MORE_BTN, NEWS_CARDS_CONTAINER, WAITING_BLOCK, NOTHING_BLOCK, CARDS_SECTION, LOADER } from "../constants/Constants.js"

import { dataStorage } from "../modules/DataStorage.js"
import { searchInput }  from "../components/SearchInput.js";
import { newsApi }  from "../modules/NewsApi.js";
import { NewsCard } from "./NewsCard.js";
import { BaseComponent } from "./BaseComponent.js";


export class NewsCardList extends BaseComponent {
  
  constructor (handlers, container, phrase) {
    super(handlers);
    this.container = container;
    this.phrase = phrase;

    this._HANDLERS();

    this._page = 1;
  }

  renderNews (phrase) {
    while (NEWS_CARDS_CONTAINER.firstChild) {
      NEWS_CARDS_CONTAINER.removeChild(NEWS_CARDS_CONTAINER.firstChild)
    }
    
      NOTHING_BLOCK.classList.add('hidden');
      WAITING_BLOCK.classList.remove('hidden');

      return newsApi.getNews(phrase, this._page)
      .then(res => {
        this._showReaction(res)

      //Чистит список карточек перед повторной загрузкой

      this.addCardsToList(res.articles);
      return res;
      })

      .then(res => {
        //записываем фразу и общее количество упоминаний в хранилишче
          dataStorage.setItem("total", 
      {
        "phrase": phrase,
        "totalResults": res.totalResults,
      })
    })
      .catch(err => console.log(err))
  }


  getMoreNews () {
    this._page++;

    LOADER.classList.remove('hidden');
    SHOW_MORE_BTN.classList.add('hidden');

    newsApi.getNews(searchInput.form.elements.searchInput.value, this._page)
    .then(res => {
      this.addCardsToList(res.articles);
      
      LOADER.classList.add('hidden');
      SHOW_MORE_BTN.classList.remove('hidden');
      return res
    })
    .then(res => {
      //Это нужно чтобы если новости кончились — не показывать кнопку «показать еще»
      if (this._page > Math.round((res.totalResults / 3))) {
        SHOW_MORE_BTN.classList.add('hidden');
      } else return res
    })

    .catch(err => console.log(err))

  }

  addCardsToList (array) {
    return array.forEach(obj => {
      const card = new NewsCard(obj);
      NEWS_CARDS_CONTAINER.appendChild(card.createCard())
    })
  }


  _showReaction (res) {
    //Этот метод управляет видимостью разных блоков в зависимости от результатов
    //Если новостей нет — показываем грустную лупу
    if (res.totalResults === 0) {
      NOTHING_BLOCK.classList.remove('hidden');
      WAITING_BLOCK.classList.add('hidden');
    } 
    
    //если новостей меньше 3 — скрываем кнопку «показать еще»
    else if (res.totalResults < 3) {
      CARDS_SECTION.classList.remove('hidden');
      WAITING_BLOCK.classList.add('hidden');
      SHOW_MORE_BTN.classList.add('hidden');
    } 
    
    //В остальных случаях показываем 
    else {
      CARDS_SECTION.classList.remove('hidden');
      WAITING_BLOCK.classList.add('hidden');
  }
  }

  _HANDLERS () {
    SHOW_MORE_BTN.addEventListener('click', () => this.getMoreNews())
  }
}

export const cardList = new NewsCardList([], NEWS_CARDS_CONTAINER);
