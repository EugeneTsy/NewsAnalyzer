import { SEARCHING_FORM, SHOW_MORE_BTN, NEWS_CARDS_CONTAINER, WAITING_BLOCK, NOTHING_BLOCK, CARDS_SECTION, LOADER } from "../constants/Constants.js"

import { BaseComponent } from "./BaseComponent.js";
import { dataStorage } from "../modules/DataStorage.js";
import { searchInput }  from "../index.js";
import { newsApi } from "../index.js";
import { NewsCard } from "./NewsCard.js";
import { data } from "flickity";

export class NewsCardList extends BaseComponent {
  
  constructor (handlers, container, phrase) {
    super(handlers);
    this.container = container;
    this.phrase = phrase;

    this._HANDLERS();

    this._page = 0;
    this._articles = [];
    this._articlesPerPage = [];
  }






  alternateRender (phrase, isLocal) {
    
      //Чистит список карточек перед повторной загрузкой
      while (NEWS_CARDS_CONTAINER.firstChild) {
        NEWS_CARDS_CONTAINER.removeChild(NEWS_CARDS_CONTAINER.firstChild)
      }
      
        NOTHING_BLOCK.classList.add('hidden');
        WAITING_BLOCK.classList.remove('hidden');

        
          //Это нужно, чтобы загрузить новости из локального хранилща при загрузке страницы
      if (isLocal) {
        CARDS_SECTION.classList.remove('hidden');
        WAITING_BLOCK.classList.add('hidden');
      
        SEARCHING_FORM.elements.searchInput.value = dataStorage.getItem("phrase");
        return this.addCardsToList(dataStorage.getItem("renderedNews"));
    } 

    return newsApi.getNews(phrase)
    .then(res => {
      this._showReaction(res)

      this._articles = res.articles;
      
      //Сохраняю весь результат в хранилище
      dataStorage.setData(
        {
        "phrase": phrase,
        "totalResults": res.totalResults,
        "articles": this._articles,
        })


        this._articlesPerPage = this._pageSeparate(this._articles);
        dataStorage.setData({"renderedNews": this._articlesPerPage[this._page]});
        
        this.addCardsToList(this._articlesPerPage[this._page]);

        return res;
      })
    
  }



  _pageSeparate(articles, pageSize = 3) {
    const result = [];
    let currentPageNumber = 0;

    for(let article of articles) {
      const currentPage = result[currentPageNumber];

      if (currentPage && currentPage.length < pageSize) {
        currentPage.push(article);
      } else {
        if (result.length > 0) {
          currentPageNumber += 1;
        }
        result[currentPageNumber] = [article];
      } 
    }

    return result;
  }





  renderNews (phrase, isLocal) {
    //Чистит список карточек перед повторной загрузкой
    while (NEWS_CARDS_CONTAINER.firstChild) {
      NEWS_CARDS_CONTAINER.removeChild(NEWS_CARDS_CONTAINER.firstChild)
    }
    
      NOTHING_BLOCK.classList.add('hidden');
      WAITING_BLOCK.classList.remove('hidden');

      
      //Это нужно, чтобы загрузить новости из локального хранилща при загрузке страницы
      if (isLocal) {
        CARDS_SECTION.classList.remove('hidden');
        WAITING_BLOCK.classList.add('hidden');
      
        SEARCHING_FORM.elements.searchInput.value = dataStorage.getItem("phrase");
        return this.addCardsToList(dataStorage.getItem("articles"));
    } else

      //А если в локале ничего нет, то запросить
      return newsApi.getNews(phrase)
      .then(res => {
        this._showReaction(res)

        this.addCardsToList(res.articles);
        return res;
      })

      .then(res => {
        //записываем фразу и общее количество упоминаний в хранилишче

          dataStorage.setData(
            {
            "phrase": phrase,
            "totalResults": res.totalResults,
            "articles": res.articles,
            })
    })
      .catch(err => console.log(err))
  }


  addMoreNews() {
    this._page++;

    LOADER.classList.remove('hidden');
    SHOW_MORE_BTN.classList.add('hidden');

    if (this._articlesPerPage[this._page]) {
      this.addCardsToList(this._articlesPerPage[this._page]);
    } else
    
    console.log(this._page, this._articles);
    this.addCardsToList(this._articles[this._page]);
    LOADER.classList.add('hidden');
    SHOW_MORE_BTN.classList.remove('hidden');


    const savedData = dataStorage.getItem("renderedNews");
    const newData = savedData.concat(this._articlesPerPage[this._page]);
    console.log('here');
    
    dataStorage.setData({"renderedNews": newData})
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

      const savedArticles = dataStorage.getItem("articles").concat(res.articles);
      dataStorage.setData({"articles": savedArticles})
      console.log(savedArticles);
      
      

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

  addCardsToList (articles) {
    return articles.forEach(article => {
      const card = new NewsCard(article);
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
    SHOW_MORE_BTN.addEventListener('click', () => this.addMoreNews())
  }
}
