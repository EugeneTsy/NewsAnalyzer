import { NewsApi } from "./NewsApi";
const pageSize = 3;
const period = 7;
export const newsApi = new NewsApi('relevancy', 'everything', pageSize, 'ru', period);
