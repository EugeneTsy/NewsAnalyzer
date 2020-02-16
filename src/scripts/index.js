import "../css/index.css";

import * as constants from "./constants/Constants.js";
import { newsApi } from "./modules/NewsApi.js";
import "./components/NewsCard.js"
import { dataStorage } from "./modules/DataStorage.js"
import { SearchInput } from "./components/SearchInput.js";
import { NewsCardList } from "./components/NewsCardList.js";




export const searchInput = new SearchInput(false, document.forms.search);

export const cardList = new NewsCardList([], constants.NEWS_CARDS_CONTAINER);

if (dataStorage.getItem("articles")) {
  cardList.renderNews("", true);
} 
