import { COMMIT_CONTAINER } from "../../constants/AboutDomElements.js";
import { githubApi } from "../../modules/API/GithubApi.js";
import { Breakpoints, Controls } from "@glidejs/glide/dist/glide.modular.esm";
import { errorPopup } from "../../utils/ErrorPopup.js";

export class CommitCardList {
  constructor(slider, card) {
    this.slider = slider;
    this.card = card;
  }

  renderCommits() {
    githubApi
      .getAllCommits()
      .then(commits => {
        commits.forEach(commit => {
          this.card.commit = commit;
          this.card.createCard();
          COMMIT_CONTAINER.appendChild(this.card.createCard());
        });
      })

      .then(() => {
        this.slider.mount({
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

