import { BaseComponent } from "./BaseComponent.js";
import {
  commitTemplate,
  commitLink,
  commitDate,
  commitAvatar,
  commitName,
  commitMail,
  commitMessage
} from "../constants/AboutDomElements";
import { timeMashine } from "./Date.js";

export class CommitCard extends BaseComponent {
  constructor(commit) {
    super();
    this.commit = commit;
    this.createCard();
  }

  createCard() {
    commitLink.href = this.commit.html_url;

    timeMashine.date = this.commit.commit.author.date;
    commitDate.textContent = timeMashine.getNormalTime();

    commitAvatar.src = this.commit.author.avatar_url;
    commitName.textContent = this.commit.commit.author.name;
    commitMail.textContent = this.commit.commit.author.email;
    commitMessage.textContent = this.commit.commit.message;

    const cardElement = commitTemplate.cloneNode(true);
    return cardElement;
  }
}
