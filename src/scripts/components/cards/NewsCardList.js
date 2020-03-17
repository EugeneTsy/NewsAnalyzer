import {
  SEARCHING_FORM,
  SHOW_MORE_BTN,
  NEWS_CARDS_CONTAINER,
  WAITING_BLOCK,
  NOTHING_BLOCK,
  CARDS_SECTION,
  LOADER
} from "../../constants/Constants.js";

import { BaseComponent } from "../BaseComponent.js";
import { dataStorage } from "../../modules/DataStorage.js";
import { newsApi, newsCard } from "../../index.js";
import { errorPopup } from "../../utils/ErrorPopup.js";



export class NewsCardList extends BaseComponent {
  constructor(handlers, container, phrase) {
    super(handlers);
    this.container = container;
    this.phrase = phrase;

    this._HANDLERS();

    this._page;
    this._articles = [];
    this._articlesPerPage = [];
  }

  renderNews(phrase, isLocal) {
    //Чистит список карточек перед повторной загрузкой
    while (NEWS_CARDS_CONTAINER.firstChild) {
      NEWS_CARDS_CONTAINER.removeChild(NEWS_CARDS_CONTAINER.firstChild);
    }
    NOTHING_BLOCK.classList.add("hidden");
    WAITING_BLOCK.classList.remove("hidden");

    //Это нужно, чтобы загрузить новости из локального хранилища при загрузке страницы
    if (isLocal) {
      CARDS_SECTION.classList.remove("hidden");
      WAITING_BLOCK.classList.add("hidden");

      SEARCHING_FORM.elements.searchInput.value = dataStorage.getItem("phrase");

      this._articlesPerPage = this._pageSeparate(
        dataStorage.getItem("articles")
      );
      this._page = dataStorage.getItem("page");

      return this.addCardsToList(dataStorage.getItem("renderedNews"));
    }

    //Этот запрос нужен, чтобы сохранить количество упоминаний в заголовках
    else
      newsApi
        .getNews(phrase, false)
        .then(res => {
          dataStorage.setData({
            mentionsInTitles: res.totalResults
          });
        })
        .catch(err => {
          errorPopup.error = err;
          errorPopup.showError();
        });

    //А этот — чтобы отобразить результаты
    return newsApi
      .getNews(phrase, true)
      .then(res => {
        this._page = 0;
        this._showReaction(res);

        this._articles = res.articles;

        //Сохраняю весь результат в хранилище
        dataStorage.setData({
          phrase: phrase,
          totalResults: res.totalResults,
          articles: this._articles,
          page: this._page
        });

        this._articlesPerPage = this._pageSeparate(this._articles);
        dataStorage.setData({
          renderedNews: this._articlesPerPage[this._page]
        });

        this.addCardsToList(this._articlesPerPage[this._page]);

        return res;
      })
      .catch(err => {
        errorPopup.error = err;
        errorPopup.showError();
      });
  }

  _pageSeparate(articles, pageSize = 3) {
    const result = [];
    let currentPageNumber = 0;

    for (let article of articles) {
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

  getMoreNews() {
    this._page++;
    LOADER.classList.remove("hidden");
    SHOW_MORE_BTN.classList.add("hidden");

    this.addCardsToList(this._articlesPerPage[this._page]);

    const savedData = dataStorage.getItem("renderedNews");

    const newData = savedData.concat(this._articlesPerPage[this._page]);

    dataStorage.setData({
      renderedNews: newData,
      page: this._page
    });
    LOADER.classList.add("hidden");
    SHOW_MORE_BTN.classList.remove("hidden");
  }

  addCardsToList(articles) {
    if (articles) {
      return articles.forEach(article => {
        newsCard.obj = article;
        NEWS_CARDS_CONTAINER.appendChild(newsCard.createCard());
      });
    } else return;
  }

  _showReaction(res) {
    //Этот метод управляет видимостью разных блоков в зависимости от результатов
    //Если новостей нет — показываем грустную лупу
    if (res.totalResults === 0) {
      NOTHING_BLOCK.classList.remove("hidden");
      WAITING_BLOCK.classList.add("hidden");
      CARDS_SECTION.classList.add("hidden");
    }

    //если новостей меньше 3 — скрываем кнопку «показать еще»
    else if (res.totalResults < 3) {
      CARDS_SECTION.classList.remove("hidden");
      WAITING_BLOCK.classList.add("hidden");
      SHOW_MORE_BTN.classList.add("hidden");
    }

    //В остальных случаях показываем
    else {
      CARDS_SECTION.classList.remove("hidden");
      WAITING_BLOCK.classList.add("hidden");
    }
  }

  _HANDLERS() {
    SHOW_MORE_BTN.addEventListener("click", () => this.getMoreNews());
  }
}
