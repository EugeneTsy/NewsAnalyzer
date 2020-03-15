import "../../node_modules/@glidejs/glide/dist/css/glide.core.css";
import "../../node_modules/@glidejs/glide/dist/css/glide.theme.css";
import "../css/about-project.css";
import "./modules/API/GithubApi.js";
import "./components/cards/CommitCardList.js";
import { CommitCardList } from './components/cards/CommitCardList.js'
import { sliderProps } from "./constants/sliderProps.js"
import { CommitCard } from './components/card/CommitCard.js'
import Glide from "@glidejs/glide";

const slider = new Glide(".glide", sliderProps);

const commitCard = new CommitCard();

const commitCardList = new CommitCardList(slider, commitCard);
commitCardList.renderCommits()