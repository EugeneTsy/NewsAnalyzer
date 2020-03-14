import { COMMIT_CONTAINER } from "../constants/AboutDomElements.js";
import { githubApi } from "../modules/GithubApi.js";
import { CommitCard } from "./CommitCard.js";
import Glide from "@glidejs/glide";
import { Breakpoints, Controls } from "@glidejs/glide/dist/glide.modular.esm";
import { sliderProps } from "../constants/sliderProps.js";
import { errorPopup } from "../utils/ErrorPopup.js";

export class CommitCardList {
  constructor() {
    this.renderCommits();
  }

  renderCommits() {
    githubApi
      .getAllCommits()
      .then(commits => {
        commits.forEach(commit => {
          const commitCard = new CommitCard(commit).createCard();
          COMMIT_CONTAINER.appendChild(commitCard);
        });
      })

      .then(() => {
        const slider = new Glide(".glide", sliderProps).mount({
          Breakpoints,
          Controls
        });
      })
      .catch(err => {
        errorPopup.error = err;
        errorPopup.showError();
      });
  }
}

new CommitCardList();
