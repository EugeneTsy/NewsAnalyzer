export class TtimeMashine {
  constructor(date) {
    this.currentDate = new Date();
    this.date = date || this.currentDate;
  }

  getISODate() {
    return (this.date = this.date.toISOString());
  }

  getNormalTime() {
    const time = new Date(this.date);

    const year = time.getFullYear();
    const month = time.getMonth();
    const day = time.getDate();

    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря"
    ];

    return `${day} ${months[month]}, ${year}`;
  }

  getNumOfWeekday() {
    const weekdays = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

    const numOfWeekday = new Date(this.date).getDay();

    const result = this.date.getDate() + ", " + weekdays[numOfWeekday];
    return result;
  }

  getMonthAsText() {
    const months = [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь"
    ];
    return months[new Date(this.date).getMonth()];
  }

  getDateNDaysAgo(nDaysAgo) {
    const date = new Date(this.date);

    date.setDate(date.getDate() - nDaysAgo);
    return new Date(date);
  }

  getDatesForPeriod(period) {
    const dates = [];

    for (let i = period - 1; i >= 0; i--) {
      dates.push(this.getDateNDaysAgo(i));
    }

    return dates;
  }
}

export const timeMashine = new TtimeMashine();
