import { newsApiPerPage, newsApiAll }  from "../modules/NewsApi.js";
import { dataStorage } from "../modules/DataStorage.js"

class Statistics {
  constructor () {
    this.test()
  }

  test() {
    console.log(dataStorage.setItem("phrase"));
    
  }
}

// new Statistics()