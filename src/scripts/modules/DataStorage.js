class DataStorage {

  setItem (key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  getItem (key) {
    return JSON.parse(sessionStorage.getItem(key))
  }
}

export const dataStorage = new DataStorage();