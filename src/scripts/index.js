import "../css/index.css";

import * as constants from "./constants/Constants.js";
import { NewsApi } from "./modules/NewsApi.js";
import "./components/NewsCard.js";
import { dataStorage } from "./modules/DataStorage.js";
import { SearchInput } from "./components/SearchInput.js";
import { NewsCardList } from "./components/NewsCardList.js";

const pageSize = 100;
const period = 7;

export const newsApi = new NewsApi("relevancy", pageSize, "ru", period);

export const searchInput = new SearchInput(false, document.forms.search);

export const cardList = new NewsCardList([], constants.NEWS_CARDS_CONTAINER);

if (dataStorage.getItem("articles")) {
  cardList.renderNews("", true);
}
