
export class NewsApi {
  constructor (sort, endPoint, pageSize, lang, period) {
    this._key = '06ff710b3a33453d91b1a04e2f52acaf';
    this.url = 'https://newsapi.org/v2/';
    this.endPoint = endPoint;
    this.sort = `sortBy=${sort}`;
    this.pageSize = `pageSize=${pageSize}`;
    this.language = `language=${lang}`;
    this.period = this._calculatingPeriod(period)
  }

  getResponseJson(res) {
    if (res.ok) {
      return res.json()
    } else return Promise.reject(reason);
  }
  
  getNews (phrase) {

  return fetch (
    this.url + 
    this.endPoint + '?' + 
    this.pageSize + '&' + 
    this.sort + '&' + 
    `q=${phrase}&` + 
    this.language + '&' + 
    `from=${this.period}`,
    
    {
    method: 'GET',
    headers: {
      Authorization: this._key,
    }
  })
  .then(res => this.getResponseJson(res))
}

  getAnalytics (phrase, dateFrom, dateTo) {

    return fetch (
      this.url + 
      this.endPoint + '?' + 
      `qInTitle=${phrase}&` + 
      this.language + '&' + 
      `from=${dateFrom}&`+
      `to=${dateTo}`,
      {
        method: 'GET',
        headers: {
          Authorization: this._key,
        }
    })
    .then(res => this.getResponseJson(res))
  }

  _calculatingPeriod (period) {
    const date = new Date()
    date.setDate(date.getDate() - period);
    
    return date.toISOString();
}
}
