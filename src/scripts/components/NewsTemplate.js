class NewsTemplate {
  constructor(htmlTemplate) {
    this.tmpl = htmlTemplate;
    this._picture();
    this._date();
    this._heading();
    this._text();
    this._source();
  }

  _picture() {return this.tmpl.querySelector('.card__picture')}

  _date() {return this.tmpl.querySelector('.ccard__date')}

  _heading() {return this.tmpl.querySelector('.ccard__heading')}

  _text() {return this.tmpl.querySelector('.card__text-content')}

  _source() {return this.tmpl.querySelector('.card__source')}
}

export const newsCardTemplate = new NewsTemplate(document.querySelector('#templateCard').content);