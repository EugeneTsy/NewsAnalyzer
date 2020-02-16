import { ASK_HEADING, NEWS_IN_WEEK, MENTIONS, CURRENT_MONTH, GRAPH_ROWS, } from "../constants/Constants.js"
import { timeMashine } from "./Date.js"

import { newsApi }  from "../index.js";
import { dataStorage } from "../modules/DataStorage.js"


export class Statistics {
  constructor (period) {
    this.phrase = dataStorage.getItem("phrase");
    this.total = dataStorage.getItem("totalResults");
    this.period = period;
    this.mentionsByWeek;

    this._setToHeading();
    this._showMentions();
  }

  _showMentions () {
    newsApi.getAnalytics(this.phrase, timeMashine.getDateNDaysAgo(this.period).toISOString(), timeMashine.date.toISOString())
    .then(res => {
      this.mentionsByWeek = res.totalResults;
      MENTIONS.textContent = this.mentionsByWeek;
      return res;
    })
    .then(res => {
      this._showStatistics ()
      return res;
    })
    .catch(err => console.log(err)
    )
  }

  _showStatistics () {
    

    CURRENT_MONTH.textContent = timeMashine.getMonthAsText();

    const dates = timeMashine.getDatesForPeriod(this.period).reverse();

    for (let i = this.period; i >= 0; i--) {
      
      //почему-то приходит первым номером «undefined», не успел задебажить
      if (dates[i]) {
      timeMashine.date = dates[i];
      const rowTitle = timeMashine.getNumOfWeekday();

      

      newsApi.getAnalytics(this.phrase, timeMashine.getDateNDaysAgo(1).toISOString(), timeMashine.date.toISOString())
      .then(res => {
              
      const rowTemplate = document.querySelector('#templateRow').content;

      rowTemplate.querySelector('.graph__date').textContent = rowTitle;
      rowTemplate.querySelector('.graph__value').textContent = res.totalResults;
      rowTemplate.querySelector('.graph__line').style.width = `${res.totalResults / this.mentionsByWeek * 100}%`;
      const row = rowTemplate.cloneNode(true);
      GRAPH_ROWS.appendChild(row);
      })
      .catch(err => console.log(err))

    }
    }
   
  }

  _setToHeading() {
    
    
    ASK_HEADING.textContent = this.phrase[0].toUpperCase() + this.phrase.slice(1); //Вставляем, делая с большой буквы
    NEWS_IN_WEEK.textContent = this.total;

  }
  
}


