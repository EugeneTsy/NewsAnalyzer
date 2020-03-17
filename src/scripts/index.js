import "../css/index.css";

import { SEARCHING_FORM, NEWS_CARDS_CONTAINER } from "./constants/Constants.js";
import { NewsApi } from "./modules/API/NewsApi.js";
import "./components/card/NewsCard.js";
import { dataStorage } from "./modules/DataStorage.js";
import { SearchInput } from "./components/SearchInput.js";
import { NewsCardList } from "./components/cards/NewsCardList.js";
import { NewsCard } from "./components/card/NewsCard.js";

const pageSize = 100;
const period = 7;

export const newsApi = new NewsApi("relevancy", pageSize, "ru", period);

export const searchInput = new SearchInput(false, SEARCHING_FORM);

export const newsCard = new NewsCard();

export const cardList = new NewsCardList([], NEWS_CARDS_CONTAINER);

if (dataStorage.getItem("articles")) {
  cardList.renderNews("", true);
}
