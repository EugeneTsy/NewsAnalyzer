import { BaseComponent } from './BaseComponent.js';

const handlers = [
  {
    elem: document.querySelector('#commitCard').content.querySelector('.commit__link'),
    event: 'click',
    func: () => {alert('Hallo')}
  }
]

export class CommitCard extends BaseComponent {
  constructor(handlers, commitLink, date, img, name, mail, commit) {
    super(handlers);
    this.commitLink = commitLink;
    this.date = date;
    this.imgLink = img;
    this.name = name;
    this.mail = mail;
    this.commit = commit;
    this. create = this.createCard();
  }

  createCard () {
    //Здесь работаем с HTML-шаблоном
    const commitTemplate = document.querySelector('#commitCard').content;

    commitTemplate.querySelector('.commit__link').href = this.commitLink;
    commitTemplate.querySelector('.commit__date').textContent = this.date;
    commitTemplate.querySelector('.commit__photo').src = this.imgLink;
    commitTemplate.querySelector('.commit__name').textContent = this.name;
    commitTemplate.querySelector('.commit__mail').textContent = this.mail;
    commitTemplate.querySelector('.commit__text-content').textContent = this.commit;

    const cardElement = commitTemplate.cloneNode(true);
    return cardElement;
  }
}

//тестовое наполнение
for (let i = 1; i <= 10; i++) {
  const commitCard = new CommitCard(handlers, 'https://github.com/EugeneTsy/NewsAnalyzer/commits/level-1', '21342', "http://localhost:8080/images/Avatar@2x.png",  'Карточка ' + i, 'test text', 'test source').create;
  document.querySelector('.glide__slides').appendChild(commitCard);
}

