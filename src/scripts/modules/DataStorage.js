class DataStorage {
  setData(data) {
    for (let key in data) {
      localStorage.setItem(key, JSON.stringify(data[key]))
    }
  }

  getItem (key) {
    if (key) {
      return JSON.parse(localStorage.getItem(key))
    } else return console.log(`В LocalStorage по ключу ${key} ничего нет`);
    
  }
}

export const dataStorage = new DataStorage();