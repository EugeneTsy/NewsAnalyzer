import {
  ASK_HEADING,
  NEWS_IN_WEEK,
  MENTIONS,
  CURRENT_MONTH,
  GRAPH_ROWS
} from "../constants/Constants.js";
import { timeMashine } from "./Date.js";

// import { newsApi }  from "../index.js";
import { dataStorage } from "../modules/DataStorage.js";

export class Statistics {
  constructor(period) {
    this.phrase = dataStorage.getItem("phrase");
    this.total = dataStorage.getItem("totalResults");
    this.mentionsByWeek = dataStorage.getItem("mentionsInTitles");
    this.articles = dataStorage.getItem("articles");
    this.period = period;

  }

  _countArticles(date) {
    let countOfArticles = 0;

    //Ищет в массиве статей по дате и возврвщает количество найденных
    this.articles.filter(item => {
      if (item.publishedAt.includes(date)) {
        countOfArticles++;
      }
    });

    return countOfArticles;
  }

  showStatistics() {
    CURRENT_MONTH.textContent = timeMashine.getMonthAsText(); //Возвращает дату в формате «01, янв»
    const dates = timeMashine.getDatesForPeriod(this.period).reverse(); // Возвращает массив дат за период от сегодня

    for (let i = this.period; i >= 0; i--) {
      if (dates[i]) {
        timeMashine.date = dates[i];
        const rowTitle = timeMashine.getNumOfWeekday();

        const date = timeMashine.getISODate().slice(0, 10);

        const count = this._countArticles(date);

        //
        //

        const rowTemplate = document.querySelector("#templateRow").content;

        rowTemplate.querySelector(".graph__value").textContent = count;
        rowTemplate.querySelector(".graph__date").textContent = rowTitle;
        rowTemplate.querySelector(".graph__line").style.width = `${count + 1}%`;

        //Изменяет цвет линии, если упоминаний не было
        if (count === 0) {
          rowTemplate
            .querySelector(".graph__line")
            .classList.add("graph__line_empty");
        } else
          rowTemplate
            .querySelector(".graph__line")
            .classList.remove("graph__line_empty");

        const row = rowTemplate.cloneNode(true);
        GRAPH_ROWS.appendChild(row);
      }
    }
  }

  setToTop() {
    ASK_HEADING.textContent =
      this.phrase[0].toUpperCase() + this.phrase.slice(1); //Вставляем, делая с большой буквы
    NEWS_IN_WEEK.textContent = this.total;
    MENTIONS.textContent = this.mentionsByWeek;
  }
}
