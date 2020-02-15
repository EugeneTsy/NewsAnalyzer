
class NewsApi {
  constructor (sort, endPoint, pageSize, lang, period) {
    this._key = '4decb7a7a68241a687e7c0785950370c';
    this.url = 'https://newsapi.org/v2/';
    this.endPoint = endPoint + '?';
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
  
  getNews (phrase, page) {

  let pageRequire = "";
  if (page) {pageRequire = `page=${page}&`};
    
  return fetch (
    this.url + 
    this.endPoint + 
    `q=${phrase}&` + 
    this.sort + '&' + 
    this.pageSize + '&' + 
    pageRequire + 
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
      this.endPoint + 
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
    let date = new Date()
    date.setDate(date.getDate() - period);
    
    return date.toISOString();
}
}


export const newsApi = new NewsApi('relevancy', 'everything', 3, 'ru', 7);
