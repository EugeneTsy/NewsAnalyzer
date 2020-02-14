
class NewsApi {
  constructor (sort, endPoint, pageSize, lang, period) {
    this._key = 'e3dcf54d028f419f9c6b74d20ed89315';
    this.url = 'https://newsapi.org/v2/';
    this.endPoint = endPoint + '?';
    this.sort = `sortBy=${sort}`;
    this.pageSize = `pageSize=${pageSize}`;
    this.language = `language=${lang}`;
    this.period = period;
    this.period = this._calculatingPeriod()
  }

  
  // `from=${_calcPeriod()}`

  getResponseJson(res) {
    if (res.ok) {
      return res.json()
    } else return Promise.reject(res.status);
  }
  
  getNews (word, page) {

  let pageRequire = "";
  if (page) {pageRequire = `page=${page}&`};
    

  return fetch(
    this.url + 
    this.endPoint + 
    `q=${word}&` + 
    this.sort + '&' + 
    this.pageSize + '&' + 
    pageRequire + 
    this.language + '&' + 
    `from=${this.period}`,
    
    {
    method: 'GET',
    headers: {
      Authorization: this._key
    },
  })
  .then(res => this.getResponseJson(res))
}

  _calculatingPeriod () {
    let date = new Date()
    date.setDate(date.getDate() - this.period);
    
    return date.toISOString();
}
}


export const newsApiPerPage = new NewsApi('relevancy', 'everything', 3, 'ru', 7);
export const newsApiAll = new NewsApi('relevancy', 'top-headlines', 100, 'ru', 7);
