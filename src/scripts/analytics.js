
import '../css/analytics-page.css';
import { Statistics } from "./components/Statistics.js"

const daysInPeriod = 7;

const statistics = new Statistics(daysInPeriod);
statistics.setToTop();
statistics.showStatistics();

